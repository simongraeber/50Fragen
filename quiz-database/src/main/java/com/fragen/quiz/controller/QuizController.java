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
    public List<QuizSummaryDTO> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return quizzes.stream()
                .map(quiz -> new QuizSummaryDTO(quiz.getId(), quiz.getName(), quiz.getLastModified()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Quiz getQuiz(@PathVariable UUID id) {
        return quizService.getQuiz(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Quiz createQuiz(@Valid @RequestBody CreateQuizRequest request) {
        return quizService.createQuiz(request);
    }

    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable UUID id, @Valid @RequestBody UpdateQuizRequest request) {
        return quizService.updateQuiz(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuiz(@PathVariable UUID id) {
        quizService.deleteQuiz(id);
    }
}
