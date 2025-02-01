package com.fragen.quiz.service;

import com.fragen.quiz.dto.CreateQuestionRequest;
import com.fragen.quiz.model.Quiz;
import com.fragen.quiz.model.QuizQuestion;
import com.fragen.quiz.model.QuizQuestionType;
import com.fragen.quiz.repository.QuizQuestionRepository;
import com.fragen.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class QuizQuestionService {

    @Autowired
    private QuizQuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    public List<QuizQuestion> getQuestionsByQuizId(UUID quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    public QuizQuestion createQuestion(UUID quizId, CreateQuestionRequest request) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));

        QuizQuestionType type;
        try {
            type = QuizQuestionType.valueOf(request.getType());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid question type");
        }

        QuizQuestion question = new QuizQuestion(request.getQuestion(), request.getAnswer(), type, quiz);
        return questionRepository.save(question);
    }

    public void deleteQuestion(UUID questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found");
        }
        questionRepository.deleteById(questionId);
    }

    public QuizQuestion updateQuestion(UUID questionId, CreateQuestionRequest request) {
        QuizQuestion existingQuestion = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));

        existingQuestion.setQuestion(request.getQuestion());
        existingQuestion.setAnswer(request.getAnswer());
        try {
            existingQuestion.setType(QuizQuestionType.valueOf(request.getType()));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid question type");
        }

        return questionRepository.save(existingQuestion);
    }
}
