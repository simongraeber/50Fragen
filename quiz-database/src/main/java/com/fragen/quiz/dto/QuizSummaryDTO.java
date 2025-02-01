package com.fragen.quiz.dto;
import java.time.LocalDateTime; import java.util.UUID;

public class QuizSummaryDTO {
    private UUID id;
    private String name;
    private LocalDateTime lastModified;

    public QuizSummaryDTO() { }

    public QuizSummaryDTO(UUID id, String name, LocalDateTime lastModified) {
        this.id = id;
        this.name = name;
        this.lastModified = lastModified;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }
}