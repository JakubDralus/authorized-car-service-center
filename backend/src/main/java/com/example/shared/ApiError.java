package com.example.shared;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Response template for returning errors in JSON format.
 */
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class ApiError {
    
    @Builder.Default
    private LocalDateTime timeStamp = LocalDateTime.now();
    
    private int status;
    private String error;
    private String message;
    private String path;
}