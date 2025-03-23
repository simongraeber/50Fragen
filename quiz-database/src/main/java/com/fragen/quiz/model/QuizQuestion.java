package com.fragen.quiz.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.UUID;
import java.util.ArrayList;
import java.util.List;
import com.fragen.quiz.model.QuizQuestionExtension;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String answer;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private QuizQuestionType type;

    @Column(nullable = false)
    private int questionOrder;

    @OneToMany(mappedBy = "quizQuestion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuizQuestionExtension> extensions = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    @JsonBackReference
    private Quiz quiz;

    public QuizQuestion() {
    }

    public QuizQuestion(String question, String answer, QuizQuestionType type, Quiz quiz) {
        this.question = question;
        this.answer = answer;
        this.type = type;
        this.quiz = quiz;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public QuizQuestionType getType() {
        return type;
    }

    public void setType(QuizQuestionType type) {
        this.type = type;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public int getQuestionOrder() {
        return questionOrder;
    }

    public void setQuestionOrder(int questionOrder) {
        this.questionOrder = questionOrder;
    }

    public void setExtensions(List<QuizQuestionExtension> extensions) {
        this.extensions = extensions;
    }

    public List<QuizQuestionExtension> getExtensions() {
        return extensions;
    }

    public void removeExtension(QuizQuestionExtension extension) {
        extensions.remove(extension);
        extension.setQuizQuestion(null);
    }

    public void addExtension(QuizQuestionExtension extension) {
        extensions.add(extension);
        extension.setQuizQuestion(this);
    }
}