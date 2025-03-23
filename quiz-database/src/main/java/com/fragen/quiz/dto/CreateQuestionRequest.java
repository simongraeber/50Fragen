package com.fragen.quiz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class CreateQuestionRequest {

    @NotBlank
    private String question;

    @NotBlank
    private String answer;

    @NotNull
    private String type;  // Use "buzzerquestion" or "estimationquestion"

    public CreateQuestionRequest() { }

    private List<QuizQuestionExtensionDTO> extensions;

    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }
    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public List<QuizQuestionExtensionDTO> getExtensions() {
        return extensions;
    }

    public void setExtensions(List<QuizQuestionExtensionDTO> extensions) {
        this.extensions = extensions;
    }
}
