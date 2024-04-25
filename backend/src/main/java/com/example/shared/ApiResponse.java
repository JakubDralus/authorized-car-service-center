package com.example.shared;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class ApiResponse<T> {
    private LocalDateTime timeStamp;
    @Builder.Default private HttpStatusCode status = HttpStatus.OK;
    @Builder.Default private boolean success = true;
    private String message;
    private T data;
}
