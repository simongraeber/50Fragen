package com.fragen.quiz.controller;

import com.fragen.quiz.dto.CreateQuestionRequest;
import com.fragen.quiz.model.QuizQuestion;
import com.fragen.quiz.service.QuizQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/quizzes/{quizId}/questions")
public class QuizQuestionController {

    @Autowired
    private QuizQuestionService questionService;

    @GetMapping
    public List<QuizQuestion> getQuestions(@PathVariable UUID quizId,
                                           @RequestHeader("X-User-ID") String userId) {
        return questionService.getQuestionsByQuizId(quizId, userId);
    }

    @GetMapping("/{questionId}")
    public QuizQuestion getQuestion(@PathVariable UUID quizId,
                                    @PathVariable UUID questionId,
                                    @RequestHeader("X-User-ID") String userId) {
        return questionService.getQuestionById(quizId, questionId, userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuizQuestion createQuestion(@PathVariable UUID quizId,
                                       @RequestHeader("X-User-ID") String userId,
                                       @Valid @RequestBody CreateQuestionRequest request) {
        return questionService.createQuestion(quizId, request, userId);
    }

    @PutMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public QuizQuestion updateQuestion(@PathVariable UUID quizId,
                                       @PathVariable UUID questionId,
                                       @RequestHeader("X-User-ID") String userId,
                                       @Valid @RequestBody CreateQuestionRequest request) {
        return questionService.updateQuestion(questionId, request, userId);
    }

    @DeleteMapping("/{questionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuestion(@PathVariable UUID questionId,
                               @RequestHeader("X-User-ID") String userId) {
        questionService.deleteQuestion(questionId, userId);
    }
}
