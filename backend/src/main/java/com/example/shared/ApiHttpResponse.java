package com.example.shared;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.Map;

@Data
@SuperBuilder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT) // excludes empty fields
public class ApiHttpResponse {
    protected String timeStamp;
    protected String message;
    protected Map<?, ?> data;
    protected Object object;
}
