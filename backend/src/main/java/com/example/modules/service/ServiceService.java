package com.example.modules.service;

import com.example.modules.aws.S3Buckets;
import com.example.modules.aws.S3Service;
import com.example.modules.service.web.ServiceBigPhotoDTO;
import com.example.modules.service.web.ServiceDTO;
import com.example.modules.service.web.ServiceSmallPhotoDTO;
import com.example.modules.service.web.ServiceTicketDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.utils.StringUtils;

import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceService implements CrudService<ServiceDTO> {
    
    private final ServiceRepository serviceRepository;
    private final ModelMapper modelMapper;
    private final ServiceMapper serviceMapper;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    public List<ServiceDTO> getAll() {
        return serviceRepository.findAll()
                .stream()
                .map(service -> modelMapper.map(service, ServiceDTO.class))
                .toList();
    }

    @Override
    public ServiceDTO get(Long id){
        ServiceModel service = serviceRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No service with id: " + id));
        return serviceMapper.toDto(service);
    }

    @Override
    @Transactional
    public ServiceDTO create(ServiceDTO serviceDTO) {
        ServiceModel service = new ServiceModel();
        serviceMapper.toEntity(serviceDTO, service);
        service = serviceRepository.save(service);
        return modelMapper.map(service, ServiceDTO.class);
    }

    @Override
    @Transactional
    public ServiceDTO update(ServiceDTO serviceDTO) {
        ServiceModel service = serviceRepository.findById(serviceDTO.getServiceId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No service with id: " + serviceDTO.getServiceId()));
        serviceMapper.toEntity(serviceDTO, service);
        service = serviceRepository.save(service);
        return modelMapper.map(service, ServiceDTO.class);
    }

    @Override
    public void delete(Long id) {
        ServiceModel service = serviceRepository.findById(id).orElse(null);
        if (service != null) {
            s3Service.deleteObject(s3Buckets.getServicesBucket(), service.getPhotoBigKey());
            s3Service.deleteObject(s3Buckets.getServicesBucket(), service.getPhotoSmallKey());
            serviceRepository.deleteById(id);
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No service with id: " + id);
        }
    }
    
    // photos order is: [big, small]
    public void uploadPhotosToS3(Long serviceId, MultipartFile ...files) {
        if (files.length != 2) {
            throw new InvalidParameterException("expected 2 photos");
        }
        ServiceModel service = serviceRepository.findById(serviceId).orElseThrow(
                () -> new NoSuchElementException("service with id [%s] not found".formatted(serviceId))
        );
        // if there is photo already try to delete the previous ones
        String photoBigKey = service.getPhotoBigKey();
        if (photoBigKey != null) s3Service.deleteObject(s3Buckets.getServicesBucket(), photoBigKey);
        String photoSmallKey = service.getPhotoSmallKey();
        if (photoSmallKey != null) s3Service.deleteObject(s3Buckets.getServicesBucket(), photoSmallKey);
        
        String servicePhotoId1 = UUID.randomUUID().toString();
        String servicePhotoId2 = UUID.randomUUID().toString();
        String photoBigUrl   = "service-photos-%s/big-%s".formatted(serviceId, servicePhotoId1);
        String photoSmallUrl = "service-photos-%s/small-%s".formatted(serviceId, servicePhotoId2);
        try {
            s3Service.putObject(
                    s3Buckets.getServicesBucket(),
                    photoBigUrl,
                    files[0].getBytes(),
                    files[0].getContentType()
            );
            s3Service.putObject(
                    s3Buckets.getServicesBucket(),
                    photoSmallUrl,
                    files[1].getBytes(),
                    files[1].getContentType()
            );
        }
        catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "failed to upload profile image", e);
        }
        
        serviceRepository.updatePhotosById(serviceId, photoBigUrl, photoSmallUrl);
    }
    
    /**
     * Retrieves one of the {@link ServiceModel} photos that are stored as raw files in AWS S3 bucket.
     * Their keys are stored in the database.
     * @param serviceId id of the service of which photos are to be returned from
     * @param size either 'big' or 'small'
     * @return the photo as byte array
     */
    public byte[] getPhoto(Long serviceId, String size) {
        if (!size.equals("big") && !size.equals("small"))
            throw new InvalidParameterException("wrong parameter: 'size'");
        
        ServiceModel service = serviceRepository.findById(serviceId).orElseThrow(
                () -> new NoSuchElementException("service with id [%s] not found".formatted(serviceId))
        );
        
        if (StringUtils.isBlank(service.getPhotoBigKey()) || StringUtils.isBlank(service.getPhotoSmallKey())) {
            throw new NoSuchElementException("photo not found for customer with id: %s".formatted(serviceId));
        }
        
        return s3Service.getObject(
                s3Buckets.getServicesBucket(),
                size.equals("big") ? service.getPhotoBigKey() : service.getPhotoSmallKey()
        );
    }

    public byte[] getPhotoFromS3(String key) {
        return s3Service.getObject(
                s3Buckets.getServicesBucket(),
                key
        );
    }
    
    /**
     * Retrieves both of the {@link ServiceModel} photos that are stored as raw files in AWS S3 bucket.
     * Their keys are stored in the database.
     * @param serviceId id of the service of which photos are to be returned from
     * @return an immutable list of 2 raw photos: [big, small]
     */
    public List<byte[]> get2Photos(Long serviceId) {
        ServiceModel service = serviceRepository.findById(serviceId).orElseThrow(
                () -> new NoSuchElementException("service with id [%s] not found".formatted(serviceId))
        );
        
        if (StringUtils.isBlank(service.getPhotoBigKey()) || StringUtils.isBlank(service.getPhotoSmallKey())) {
            throw new NoSuchElementException("photo not found for customer with id: %s".formatted(serviceId));
        }
        
        byte[] servicePhotoBg = s3Service.getObject(s3Buckets.getServicesBucket(), service.getPhotoBigKey());
        byte[] servicePhotoSm = s3Service.getObject(s3Buckets.getServicesBucket(), service.getPhotoSmallKey());
        
        return List.of(servicePhotoBg, servicePhotoSm);
    }

    public ServiceBigPhotoDTO getWithBigPhoto(Long id) {
        ServiceModel service = serviceRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No service with id: " + id));

        return serviceMapper.toBigDto(service, getPhotoFromS3(service.getPhotoBigKey()));
    }

    public List<ServiceSmallPhotoDTO> getAllAvailableWithSmallPhoto() {
        return serviceRepository.findAllAvailable()
                .stream()
                .map(service -> serviceMapper.toSmallDto(service, getPhotoFromS3(service.getPhotoSmallKey())))
                .toList();
    }


    public List<ServiceSmallPhotoDTO> getAllFeaturedWithSmallPhoto() {
        return serviceRepository.findAllFeatured()
                .stream()
                .map(service -> serviceMapper.toSmallDto(service, getPhotoFromS3(service.getPhotoSmallKey())))
                .toList();
    }

    public List<ServiceTicketDTO> getAllAvailableToTicket() {
        return  serviceRepository.findAllAvailable()
                .stream()
                .map(serviceMapper::toTicketDto)
                .toList();
    }
}
