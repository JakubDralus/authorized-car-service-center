package com.example.modules.address.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class AddressDTO {
    private Long addressId;
    private String street;
    private String city;
    private String postalCode;
    private String country;
}
