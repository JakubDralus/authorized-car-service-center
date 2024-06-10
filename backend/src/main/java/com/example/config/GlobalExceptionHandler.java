package com.example.config;

import com.example.shared.ApiError;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {

    // solution for not displaying exceptions on 'prod' profile
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiError> handleResponseStatusException(ResponseStatusException ex, HttpServletRequest request) {
        HttpStatus httpStatus = HttpStatus.valueOf(ex.getStatusCode().value());
        ApiError apiError = ApiError.builder()
                .status(httpStatus.value())
                .error(httpStatus.getReasonPhrase())
                .message(ex.getReason())
                .path(request.getRequestURI())
                .build();
        
        return new ResponseEntity<>(apiError, httpStatus);
    }
    
    
    // can't resolve exceptions during filtering so this doesn't work
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Object> handleExpiredJwtException(ResponseStatusException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getReason(), ex.getStatusCode());
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleDefaultException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}