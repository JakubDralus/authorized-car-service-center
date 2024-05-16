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
public class ServiceDTO {
    private Long serviceId;
    private Integer estimatedRepairTime;
    private String name;
    private String type;
    private Double cost;
    private Boolean isAvailable;
    private Boolean isFeatured;
    private String photoBigKey;
    private String photoSmallKey;
}
