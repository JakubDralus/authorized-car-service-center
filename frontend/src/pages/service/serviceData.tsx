import axios from "axios";

export interface ServiceData {
  serviceId: number;
  estimatedRepairTime: number;
  name: string;
  cost: number;
  description: string;
  isAvailable: boolean;
  isFeatured: boolean;
  smallPhoto: string;
  type: string;
}

export interface ServiceCarouselProps {
  serviceData: ServiceData[];
  currentServiceId?: number;
}


export const fetchFeaturedServices = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/services/featured-photos');
      // console.log(response.data)
      console.log('photos fetched');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const findServiceDataById = async (serviceData: ServiceCarouselProps) => {
    try {
      const foundService = serviceData.serviceData.find(service => service.serviceId === serviceData.currentServiceId);
      return foundService;
    } catch (error) {
      console.error('Error finding service data:', error);
      throw error;
    }
  };

  export const classSelector = (x: number) => {
    if(x == 0)  return true
    else if(x%4 == 1 || x%4 == 2) return false
    else return true
  }