package com.fragen.quiz.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class UpdateQuizRequest {

    @NotBlank
    private String name;

    // This optional field allows the FE to pass a new order for the questions.
    private List<QuizQuestionOrderDTO> questions;

    public UpdateQuizRequest() { }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public List<QuizQuestionOrderDTO> getQuestions() {
        return questions;
    }
    public void setQuestions(List<QuizQuestionOrderDTO> questions) {
        this.questions = questions;
    }
}