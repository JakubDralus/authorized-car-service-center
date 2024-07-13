package com.example.modules.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
    @Transactional
    @Modifying
    @Query( "UPDATE ServiceModel s " +
            "SET s.photoBigKey = :photoBigKey, s.photoSmallKey = :photoSmallKey " +
            "WHERE s.serviceId = :serviceId")
    void updatePhotosById(Long serviceId,String photoBigKey, String photoSmallKey);
    
    @Query("SELECT s FROM ServiceModel s WHERE s.isAvailable = true AND s.isFeatured = true")
    List<ServiceModel> findAllAvailable();

    @Query("SELECT s FROM ServiceModel s WHERE s.isFeatured = true")
    List<ServiceModel> findAllFeatured();
}
