package com.example.modules.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE ServiceModel s SET s.photoUrl = :photoUrl WHERE s.serviceId = :serviceId")
    void updatePhotoUrlById(Long serviceId, String photoUrl);
}
