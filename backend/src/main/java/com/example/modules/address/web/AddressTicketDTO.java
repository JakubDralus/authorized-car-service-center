package com.example.modules.address.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class AddressTicketDTO {
    private String country;
    private String city;
    private String street;
    private String postalCode;
}
