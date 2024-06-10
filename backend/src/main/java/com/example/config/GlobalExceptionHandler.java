package com.example.config;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {

    // temporary solution for not displaying exceptions on 'prod' profile
//    @ExceptionHandler(ResponseStatusException.class)
//    public ResponseEntity<Object> handleResponseStatusException(ResponseStatusException ex, WebRequest request) {
//        return new ResponseEntity<>(ex.getReason(), ex.getStatusCode());
//    }
    
    
    // can't resolve exceptions during filtering so this don't work
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Object> handleExpiredJwtException(ResponseStatusException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getReason(), ex.getStatusCode());
//        return new ResponseEntity<>(ErrorResponse.builder(ex,ex.getStatusCode(),ex.getDetailMessageCode()).build(), ex.getStatusCode());
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleDefaultException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}