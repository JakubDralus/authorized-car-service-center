package com.example.modules.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
    @Transactional
    @Modifying
    @Query( "UPDATE ServiceModel s " +
            "SET s.photoBigKey = :photoBigKey, s.photoSmallKey = :photoSmallKey " +
            "WHERE s.serviceId = :serviceId")
    void updatePhotosById(Long serviceId,String photoBigKey, String photoSmallKey);
}
