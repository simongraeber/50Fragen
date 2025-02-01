package com.fragen.quiz.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateQuizRequest {

    @NotBlank
    private String name;

    public CreateQuizRequest() { }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
