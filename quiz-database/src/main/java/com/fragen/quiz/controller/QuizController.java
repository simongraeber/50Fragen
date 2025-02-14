package com.fragen.quiz.controller;

import com.fragen.quiz.dto.CreateQuizRequest;
import com.fragen.quiz.dto.UpdateQuizRequest;
import com.fragen.quiz.model.Quiz;
import com.fragen.quiz.service.QuizService;
import com.fragen.quiz.dto.QuizSummaryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public List<QuizSummaryDTO> getAllQuizzes(@RequestHeader("X-User-ID") String userId) {
        List<Quiz> quizzes = quizService.getAllQuizzes(userId);
        return quizzes.stream()
                .map(quiz -> new QuizSummaryDTO(quiz.getId(), quiz.getName(), quiz.getLastModified()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Quiz getQuiz(@PathVariable UUID id, @RequestHeader("X-User-ID") String userId) {
        return quizService.getQuiz(id, userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Quiz createQuiz(@RequestHeader("X-User-ID") String userId,
                           @Valid @RequestBody CreateQuizRequest request) {
        // log the userid of the requesting user
        System.out.println("User ID: " + userId);
        return quizService.createQuiz(request, userId);
    }

    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable UUID id,
                           @RequestHeader("X-User-ID") String userId,
                           @Valid @RequestBody UpdateQuizRequest request) {
        return quizService.updateQuiz(id, request, userId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuiz(@PathVariable UUID id,
                           @RequestHeader("X-User-ID") String userId) {
        quizService.deleteQuiz(id, userId);
    }
}
