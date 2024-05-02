package com.example.shared;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/**
 * Generic response template for clean JSON response structure.
 * @param <T> parameter of the data you want to return
 */
@Data
@SuperBuilder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT) // excludes empty fields
public class ApiResponse<T> {

    @Builder.Default
    private LocalDateTime timeStamp = LocalDateTime.now();
    
    @Builder.Default
    private int status = HttpStatus.OK.value();
    
    @Builder.Default
    private boolean success = true;
    
    private String message;
    
    private T data;
}
