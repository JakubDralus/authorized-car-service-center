package com.example.modules.address.web;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddressDTO {
    private Long address_id;
    private String street;
    private String city;
    private String postalCode;
    private String country;
}
