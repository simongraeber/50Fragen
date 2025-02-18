import { Server } from "socket.io";
import { server } from "./index";
import { quizStates, getQuizState, getCurrentQuizState } from "./state"

// Create a namespace explicitly for '/quiz-session'
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  path: "/quiz-session/socket.io"
}).of("/quiz-session");

const ownerSockets: { [quizID: string]: string[] } = {};
// responsible for cleaning up the quiz state after a certain time
const cleanupTimers: { [quizID: string]: NodeJS.Timeout } = {};

io.on("connection", (socket) => {

  // the connected user
  const user = {
    id: socket.handshake.headers["x-user-id"] as string,
    name: socket.handshake.headers["x-user-name"] as string,
    image: socket.handshake.headers["x-user-image"] as string,
  };

  const canEdit = (quizID: string) => {
    return quizStates[quizID].ownerID === user.id;
  }

  socket.on("joinGame", async (quizID: string) => {
    socket.join(quizID);

    if (cleanupTimers[quizID]) {
      clearTimeout(cleanupTimers[quizID]);
      delete cleanupTimers[quizID];
    }

    if (!quizStates[quizID]) {
      try {
        quizStates[quizID] = await getCurrentQuizState(quizID);
      } catch (error) {
        console.error("Error getting quiz state", error);
        return;
      }
    }
    if (quizStates[quizID].ownerID === user.id) {
      ownerSockets[quizID] = ownerSockets[quizID] || [];
      ownerSockets[quizID].push(socket.id);
    }

    io.in(quizID)
      .except(ownerSockets[quizID] || [])
      .emit("quizState", getQuizState(quizID, false));
    io.to(ownerSockets[quizID] || []).emit("quizState", getQuizState(quizID, true));
    console.log(`Quiz ${quizID} joined by user ${user.id}`);
  });

  socket.on("buzz", (data: { quizID: string;}) => {
    const { quizID } = data;

    const quiz = quizStates[quizID];
    if (!quiz) {
      return;
    }
    if (!quiz.active) {
      return;
    }

    // Set quiz to inactive and notify the room.
    quiz.active = false;
    io.to(quizID).emit("buzz", { userId: user.id, quizId: quizID });
    io.to(quizID).emit("switchedToActiveOrInactive", { active: false, quizId: quizID });
  });

  socket.on("setGameActive", (quizID: string) => {
    if (!quizStates[quizID]) {
      return;
    }
    if (!canEdit(quizID)) {
      console.log("User not allowed to set game active. User: ", user);
      return;
    }
    quizStates[quizID].active = true;
    io.to(quizID).emit("switchedToActiveOrInactive", { active: true, quizId: quizID });
  });

  socket.on("setGameInactive", (quizID: string) => {
    if (!quizStates[quizID]) {
      return;
    }
    if (!canEdit(quizID)) {
      return;
    }
    quizStates[quizID].active = false;
    io.to(quizID).emit("switchedToActiveOrInactive", { active: false, quizId: quizID });
  });

  const updateUserScore = (data: { quizID: string; userID: string; score: number }) => {
    const { quizID, userID, score } = data;

    if (!quizStates[quizID]) {
      return;
    }

    const quiz = quizStates[quizID];
    // Look for the user in the participantsScores array.
    const participantIndex = quiz.participantsScores.findIndex(
      (participant) => participant.user.id === userID
    );

    if (participantIndex !== -1) {
      // Update score for the existing user.
      quiz.participantsScores[participantIndex].score = score;
    } else {
      // User not found: add a new entry with a default name and an empty image.
      quiz.participantsScores.push({
        user: {
          id: userID,
          name: `User ${userID}`, // Adjust or fetch the actual name as needed.
          image: "", // Set a default image URL or leave empty.
        },
        score: score,
      });
    }

    // Emit the updated score to all clients in the quiz room.
    io.to(quizID).emit("userScoreUpdated", { quizID, userID, score });
  }

  socket.on("updateUserScore", (data: { quizID: string; userID: string; score: number }) => {
    updateUserScore(data)
  });

  socket.on("updateUserScores", async (data: { quizID: string; userID: string; score: number }[]) => {
    for (const item of data) {
      console.log("update Points", item);
      updateUserScore(item);
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  });

  socket.on("showQuestion", (data: { quizID: string; question: string }) => {
    const { quizID, question } = data;
    if (!quizStates[quizID]) {
      return;
    }
    if (!canEdit(quizID)) {
      return;
    }
    quizStates[quizID].currentQuestion = question;

    io.to(quizID).emit("questionShown", { quizID, question });
  });

  socket.on("newQuestion", (data: { quizID: string; questionType: string }) => {
    const { quizID, questionType } = data;
    if (!quizStates[quizID]) {
      return
    }
    if (!canEdit(quizID)) {
      return;
    }
    quizStates[quizID].currentQuestionType = questionType;
    quizStates[quizID].currentQuestion = "";
    quizStates[quizID].textAnswersForOwnerOnly = [];
    quizStates[quizID].textAnswers = [];
    io.to(quizID).emit("newQuestion", { quizID, questionType });
  });

  socket.on("newTextAnswer", (data: { quizID: string; answer: string })=> {
      const { quizID, answer } = data;
      if (!quizStates[quizID]) {
        return;
      }
      if (!quizStates[quizID].active) {
        return;
      }
      const currentAnswers = quizStates[quizID].textAnswersForOwnerOnly || [];

      const existingAnswerIndex = currentAnswers.findIndex(a => a.userID === user.id);
      if (existingAnswerIndex !== -1) {
        currentAnswers[existingAnswerIndex].text = answer;
      } else {
        currentAnswers.push({ userID: user.id, text: answer });
      }
      quizStates[quizID].textAnswersForOwnerOnly = currentAnswers;
      io.to(
        ownerSockets[quizID] || []
      ).emit("newTextAnswers", { quizID, currentAnswers});
    });

  socket.on("showTextAnswers", (quizID: string) => {
    if (!quizStates[quizID]) {
      return;
    }
    if (!canEdit(quizID)) {
      return;
    }
    const currentAnswers = quizStates[quizID].textAnswersForOwnerOnly || [];
    io.to(quizID).except(ownerSockets[quizID] || []).emit("newTextAnswers", { quizID, currentAnswers });

  });

  socket.on("disconnect", () => {
    Object.keys(ownerSockets).forEach((quizID) => {
      ownerSockets[quizID] = ownerSockets[quizID].filter((s) => s !== socket.id);
    });
    console.log(`User disconnected: ${socket.id}`);

    for (const quizID in quizStates) {
      const room = io.adapter.rooms.get(quizID);
      if (!room || room.size === 0) {
        if (!cleanupTimers[quizID]) {
          cleanupTimers[quizID] = setTimeout(() => {
            const currentRoom = io.adapter.rooms.get(quizID);
            if (!currentRoom || currentRoom.size === 0) {
              delete quizStates[quizID];
              console.log(`Cleaned up quiz session ${quizID} due to inactivity.`);
            }
            // Remove the timer reference, regardless of cleanup
            delete cleanupTimers[quizID];
          }, 30 * 60 * 1000); // 30 minutes in milliseconds
        }
      }
    }
  });
});