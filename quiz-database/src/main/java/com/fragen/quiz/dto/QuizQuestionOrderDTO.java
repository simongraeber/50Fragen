package com.fragen.quiz.dto;

import java.util.UUID;

public class QuizQuestionOrderDTO {
    private UUID id;
    private int questionOrder;

    public QuizQuestionOrderDTO() { }

    public QuizQuestionOrderDTO(UUID id, int questionOrder) {
        this.id = id;
        this.questionOrder = questionOrder;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getQuestionOrder() {
        return questionOrder;
    }

    public void setQuestionOrder(int questionOrder) {
        this.questionOrder = questionOrder;
    }
}