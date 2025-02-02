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

    public Quiz getQuiz(UUID id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz createQuiz(CreateQuizRequest request) {
        Quiz quiz = new Quiz(request.getName());
        quiz.setLastModified(LocalDateTime.now());
        return quizRepository.save(quiz);
    }

    public Quiz updateQuiz(UUID id, UpdateQuizRequest request) {
        Quiz quiz = getQuiz(id);
        quiz.setName(request.getName());
        quiz.setLastModified(LocalDateTime.now());

        // If the request includes questions, update the order based on the FE array’s order (its index).
        if (request.getQuestions() != null) {
            // Get the list from the request.
            List<QuizQuestionOrderDTO> orderDTOs = request.getQuestions();
            for (int i = 0; i < orderDTOs.size(); i++) {
                final int newOrder = i;  // assign the current index to a final variable for the lambda
                QuizQuestionOrderDTO dto = orderDTOs.get(i);
                // Find the matching QuizQuestion in the quiz and update its order
                quiz.getQuestions().stream()
                        .filter(q -> q.getId().equals(dto.getId()))
                        .findFirst()
                        .ifPresent(q -> q.setQuestionOrder(newOrder));
            }
        }

        return quizRepository.save(quiz);
    }

    public void deleteQuiz(UUID id) {
        Quiz quiz = getQuiz(id);
        quizRepository.delete(quiz);
    }
}