package com.example.modules.address;

import com.example.modules.address.web.AddressDTO;
import com.example.shared.IMapper;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper implements IMapper<Address, AddressDTO> {
    @Override
    public AddressDTO toDto(Address address) {
        return AddressDTO.builder()
                .addressId(address.getAddressId())
                .street(address.getStreet())
                .city(address.getCity())
                .postalCode(address.getPostalCode())
                .country(address.getCountry())
                .build();
    }
    
    @Override
    public void toEntity(AddressDTO addressDTO, Address address) {
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setCountry(addressDTO.getCountry());
    }
}
