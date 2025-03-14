package com.fragen.quiz.model;

import jakarta.persistence.*;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "extension_type", discriminatorType = DiscriminatorType.STRING)
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "extensionType",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = com.fragen.quiz.model.QuestionExtensions.AttachedImageExtension.class, name = "attachedImage")
        // Add other extension subtypes here as needed.
})
public abstract class QuizQuestionExtension {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_question_id", nullable = false)
    @JsonBackReference
    private QuizQuestion quizQuestion;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public QuizQuestion getQuizQuestion() {
        return quizQuestion;
    }
    public void setQuizQuestion(QuizQuestion quizQuestion) {
        this.quizQuestion = quizQuestion;
    }
}