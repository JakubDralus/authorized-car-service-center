package com.example.modules.review.web;

import com.example.modules.user.web.UserDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class ReviewDTO {
    private Long reviewId;
    private String title;
    private String description;
    public Short rate;
    private LocalDateTime createdAt;
    private UserDTO user;
}