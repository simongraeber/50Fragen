package com.fragen.quiz.service;

import com.fragen.quiz.dto.CreateQuizRequest;
import com.fragen.quiz.dto.UpdateQuizRequest;
import com.fragen.quiz.dto.QuizQuestionOrderDTO;
import com.fragen.quiz.model.Quiz;
import com.fragen.quiz.model.QuizQuestion;
import com.fragen.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public List<Quiz> getAllQuizzes(String userId) {
        return quizRepository.findByUserId(userId);
    }

    // Retrieve a single quiz ensuring the user matches.
    public Quiz getQuiz(UUID id, String userId) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));
        if (!quiz.getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to access this quiz");
        }
        return quiz;
    }

    // When creating a quiz, assign the userId from the header.
    public Quiz createQuiz(CreateQuizRequest request, String userId) {
        Quiz quiz = new Quiz(request.getName(), userId);
        quiz.setLastModified(LocalDateTime.now());
        return quizRepository.save(quiz);
    }

    // Update a quiz only if the authenticated user owns it.
    public Quiz updateQuiz(UUID id, UpdateQuizRequest request, String userId) {
        Quiz quiz = getQuiz(id, userId);
        quiz.setName(request.getName());
        quiz.setLastModified(LocalDateTime.now());

        // If the request includes questions, update the order based on the FE array’s order (its index).
        if (request.getQuestions() != null) {
            List<QuizQuestionOrderDTO> orderDTOs = request.getQuestions();
            for (int i = 0; i < orderDTOs.size(); i++) {
                final int newOrder = i;
                QuizQuestionOrderDTO dto = orderDTOs.get(i);
                quiz.getQuestions().stream()
                        .filter(q -> q.getId().equals(dto.getId()))
                        .findFirst()
                        .ifPresent(q -> q.setQuestionOrder(newOrder));
            }
        }

        return quizRepository.save(quiz);
    }

    // Delete a quiz only if the owner matches.
    public void deleteQuiz(UUID id, String userId) {
        Quiz quiz = getQuiz(id, userId);
        quizRepository.delete(quiz);
    }
}