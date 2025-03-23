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
@RequestMapping("/")
public class TestController {
    @GetMapping
    public String test() {
        return "Hello World!";
    }
}