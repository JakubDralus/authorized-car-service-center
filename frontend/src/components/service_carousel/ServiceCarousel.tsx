import "./ServiceCarousel.css"
import React, { useState, useEffect, act } from 'react';
import {Link} from "react-router-dom";
import {ServiceCarouselProps} from "../../pages/service/serviceData";



const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ serviceData, currentServiceId  }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  console.log(currentServiceId)

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

    return(
      <div className="app">
      <Link to = "/" className="image-section">
        <img className="caroseul-image" src={`data:image/jpeg;base64,${serviceData[activeIndex].smallPhoto}`} />
        <div className="image-section__text">
          <p className="text-white text-4xl font-bold">{serviceData[activeIndex].name}</p>
        </div>
      </Link>
      <div className="flex justify-center gap-8 flex-wrap">
        {serviceData.map((service, index) => (
          service.serviceId != currentServiceId ? (
          <div 
            key={index}
            className={`nav-item ${index === activeIndex ? 'nav-item--active' : ''} text-gray-500 text-gra` }
            onClick={() => handleItemClick(index)}
          >
            {service.name}
          </div>
        ) : null))}
      </div>
    </div>
    )
}

export default ServiceCarousel