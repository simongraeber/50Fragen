package com.fragen.quiz.model.QuestionExtensions;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import com.fragen.quiz.model.QuizQuestion;
import com.fragen.quiz.model.QuizQuestionExtension;

@Entity
@Table(name = "attached_image_extensions")
@DiscriminatorValue("attachedImage")
public class AttachedImageExtension extends QuizQuestionExtension {

    @Column(nullable = false)
    private String imageUrl;

    public AttachedImageExtension() { }

    public AttachedImageExtension(String imageUrl, QuizQuestion question) {
        this.imageUrl = imageUrl;
        setQuizQuestion(question);
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getExtensionType() {
        return "attachedImage";
    }
}