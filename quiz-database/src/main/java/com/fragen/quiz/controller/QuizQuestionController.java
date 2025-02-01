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
    public List<QuizQuestion> getQuestions(@PathVariable UUID quizId) {
        return questionService.getQuestionsByQuizId(quizId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuizQuestion createQuestion(@PathVariable UUID quizId, @Valid @RequestBody CreateQuestionRequest request) {
        return questionService.createQuestion(quizId, request);
    }

    @PutMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public QuizQuestion updateQuestion(@PathVariable UUID quizId,
                                       @PathVariable UUID questionId,
                                       @Valid @RequestBody CreateQuestionRequest request) {
        // Optionally, you can add a check to ensure the question belongs to the specified quizId
        return questionService.updateQuestion(questionId, request);
    }

    @DeleteMapping("/{questionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuestion(@PathVariable UUID questionId) {
        questionService.deleteQuestion(questionId);
    }
}
