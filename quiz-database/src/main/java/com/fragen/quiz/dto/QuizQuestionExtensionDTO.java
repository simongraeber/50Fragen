package com.fragen.quiz.dto;

public class QuizQuestionExtensionDTO {
    // This field acts as a discriminator (e.g. "attachedImage").
    private String extensionType;

    // For the attached image extension, store its image URL.
    private String imageUrl;

    public QuizQuestionExtensionDTO() { }

    public String getExtensionType() {
        return extensionType;
    }
    public void setExtensionType(String extensionType) {
        this.extensionType = extensionType;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}