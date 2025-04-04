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
import com.fragen.quiz.model.QuestionExtensions.AttachedImageExtension;

@Service
public class QuizQuestionService {

    @Autowired
    private QuizQuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    public List<QuizQuestion> getQuestionsByQuizId(UUID quizId, String userId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));
        if (!quiz.getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to access this quiz");
        }
        return questionRepository.findByQuizIdOrderByQuestionOrderAsc(quizId);
    }

    public QuizQuestion getQuestionById(UUID quizId, UUID questionId, String userId) {
        QuizQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));
        if (!question.getQuiz().getId().equals(quizId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found");
        }
        if (!question.getQuiz().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to access this question");
        }
        return question;
    }

    public QuizQuestion createQuestion(UUID quizId, CreateQuestionRequest request, String userId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found"));

        if (!quiz.getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to modify this quiz");
        }

        QuizQuestionType type;
        try {
            type = QuizQuestionType.valueOf(request.getType());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid question type");
        }

        QuizQuestion question = new QuizQuestion(request.getQuestion(), request.getAnswer(), type, quiz);

        List<QuizQuestion> existingQuestions = questionRepository.findByQuizIdOrderByQuestionOrderAsc(quizId);
        question.setQuestionOrder(existingQuestions.size());

        if (request.getExtensions() != null) {
            request.getExtensions().forEach(extensionDTO -> {
                if ("attachedImage".equals(extensionDTO.getExtensionType())) {
                    AttachedImageExtension ext = new AttachedImageExtension();
                    ext.setImageUrl(extensionDTO.getImageUrl());
                    question.addExtension(ext);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Unsupported extension type: " + extensionDTO.getExtensionType());
                }
            });
        }
        return questionRepository.save(question);
    }

    public void deleteQuestion(UUID questionId, String userId) {
        QuizQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));
        if (!question.getQuiz().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to delete this question");
        }
        questionRepository.deleteById(questionId);
    }

    public QuizQuestion updateQuestion(UUID questionId, CreateQuestionRequest request, String userId) {
        QuizQuestion existingQuestion = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));
        if (!existingQuestion.getQuiz().getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to update this question");
        }
        existingQuestion.setQuestion(request.getQuestion());
        existingQuestion.setAnswer(request.getAnswer());
        try {
            existingQuestion.setType(QuizQuestionType.valueOf(request.getType()));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid question type");
        }

        if (request.getExtensions() != null) {
            existingQuestion.getExtensions().clear();
            request.getExtensions().forEach(extensionDTO -> {
                if ("attachedImage".equals(extensionDTO.getExtensionType())) {
                    AttachedImageExtension ext = new AttachedImageExtension();
                    ext.setImageUrl(extensionDTO.getImageUrl());
                    existingQuestion.addExtension(ext);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Unsupported extension type: " + extensionDTO.getExtensionType());
                }
            });
        }

        return questionRepository.save(existingQuestion);
    }
}