package com.example.modules.review.web;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class ReviewReadDTO {
    private Long reviewId;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private long userId;
}