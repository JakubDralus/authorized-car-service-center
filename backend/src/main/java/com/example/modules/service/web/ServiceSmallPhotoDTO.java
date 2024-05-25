package com.example.modules.service.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class ServiceSmallPhotoDTO {
    private Long serviceId;
    private Integer estimatedRepairTime;
    private String name;
    private String description;
    private String type;
    private Double cost;
    private Boolean isAvailable;
    private Boolean isFeatured;
    private byte[] smallPhoto;
}
