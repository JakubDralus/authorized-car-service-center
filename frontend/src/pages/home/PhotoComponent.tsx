import React, { useState, useEffect } from 'react';

interface PhotoResponse {
  big?: string;
  small?: string;
}

const PhotoComponent: React.FC<{ serviceId: number }> = ({ serviceId }) => {
  const [photos, setPhotos] = useState<PhotoResponse>({});
  
  const [photoUrlbig, setPhotoUrlbig] = useState<string>('');
  const [photoUrlsmall, setPhotoUrlsmall] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // const fetchPhotos = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:8081/api/v1/services/${serviceId}/photos`);
    //     const photos: PhotoResponse = await response.json();
    //     setPhotos(photos);
    //     setIsLoading(false); // Set loading state to false after photos are fetched
    //     console.log("fetched both")
    //   } 
    //   catch (error) {
    //     console.error('Error fetching photos:', error);
    //   }
    // };

    const fetchPhotoSmall = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/v1/services/${serviceId}/photo-small`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPhotoUrlsmall(url);
        setIsLoading(false); // Set loading state to false after photo is fetched
        console.log("fetched small")
      } 
      catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    const fetchPhotoBig = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/v1/services/${serviceId}/photo-big`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPhotoUrlbig(url);
        setIsLoading(false); // Set loading state to false after photo is fetched
        console.log("fetched big")
      } 
      catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    // fetchPhotos();
    fetchPhotoSmall();
    fetchPhotoBig();
  }, [serviceId]);

  return (
    <div>
      {isLoading ? ( <p>Loading...</p> ) : (
        <>
          {/* {photos.big && <img src={`data:image/jpeg;base64,${photos.big}`} alt="Big" height={200} />}
          {photos.small && <img src={`data:image/jpeg;base64,${photos.small}`} alt="Small" height={100} />} <br></br> */}
          {photoUrlsmall && <img src={photoUrlsmall} alt="Small" height={100} />} <br></br>
          {photoUrlbig && <img src={photoUrlbig} alt="Small" height={300} />} <br></br>
        </>
      )}
    </div>
  );
};

export default PhotoComponent;
