package com.fragen.quiz.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateQuizRequest {

    @NotBlank
    private String name;

    public UpdateQuizRequest() { }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
