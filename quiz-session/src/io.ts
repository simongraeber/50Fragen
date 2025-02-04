import { Server } from "socket.io";
import { server } from "./index";
import { quizStates, getDefaultQuizState } from "./state";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinGame", (quizID: string) => {
    socket.join(quizID);
    console.log(`Socket ${socket.id} joined quiz ${quizID}`);

    // Initialize quiz state if not already present.
    if (!quizStates[quizID]) {
      quizStates[quizID] = getDefaultQuizState(quizID);
      console.log(`Created new quiz state for quiz ${quizID}`);
    }

    socket.emit("quizState", quizStates[quizID]);
  });

  socket.on("buzz", (data: { quizID: string; userID: string }) => {
    const { quizID, userID } = data;
    console.log(`Received buzz from user ${userID} in quiz ${quizID}`);

    const quiz = quizStates[quizID];
    if (!quiz) {
      console.log(`Quiz state not found for quiz ID: ${quizID}`);
      return;
    }
    if (!quiz.active) {
      console.log(`Quiz ${quizID} is not active. Ignoring buzz from user ${userID}`);
      return;
    }

    // Set quiz to inactive and notify the room.
    quiz.active = false;
    io.to(quizID).emit("buzz", { userId: userID, quizId: quizID });
  });

  socket.on("setGameActive", (quizID: string) => {
    console.log(`Setting quiz ${quizID} to active`);
    if (!quizStates[quizID]) {
      quizStates[quizID] = getDefaultQuizState(quizID);
    }
    quizStates[quizID].active = true;
    io.to(quizID).emit("switchedToActiveOrInactive", { active: true, quizId: quizID });
  });

  socket.on("setGameInactive", (quizID: string) => {
    console.log(`Setting quiz ${quizID} to inactive`);
    if (!quizStates[quizID]) {
      quizStates[quizID] = getDefaultQuizState(quizID);
    }
    quizStates[quizID].active = false;
    io.to(quizID).emit("switchedToActiveOrInactive", { active: false, quizId: quizID });
  });

  socket.on("updateUserScore", (data: { quizID: string; userID: string; score: number }) => {
    const { quizID, userID, score } = data;
    console.log(`Updating score for user ${userID} in quiz ${quizID} to ${score}`);

    // Ensure the quiz state exists.
    if (!quizStates[quizID]) {
      quizStates[quizID] = getDefaultQuizState(quizID);
      console.log(`Quiz state not found for quiz ${quizID}. Initialized new quiz state.`);
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
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // Optionally, clean up the quiz state if needed.
  });
});