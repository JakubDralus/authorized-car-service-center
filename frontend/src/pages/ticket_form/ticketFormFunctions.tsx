import { createContext } from "react";
import axiosInstance from "../../api/AxiosInstance";

// interfaces
export interface Service {
    serviceId: number,
    name: string,
    description: string,
    estimatedRepairTime: number,
    cost: number
}

export interface Schedule {
    date: Date | null;
    hour: string | null | undefined;
}

export interface Car {
    model: string,
    manufacturedYear: number,
    licensePlate: string,
    vin: string,
    color: string,
    mileage: number
}

export interface Address{
    country: string,
    city: string,
    street: string,
    postalCode: string
}

export interface Customer {
    firstName: string,
    lastName: string,
    telephoneNumber: string,
    email: string,
    address: Address
}

export interface TicketData {
    fullCost: number,
    description: string,
    services: Service[],
    car: Car,
    customer: Customer
    schedule: Schedule
}


// export interface ReservedHours {
//     date: string;
//     hour: string;
// }

//for contexts
export interface ServiceContextType {
    selectedServices: Service[];
    setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export interface CarContextType {
    carData: Car,
    setCarData: React.Dispatch<React.SetStateAction<Car>>;
}

export interface CustomerContextType {
    customerData: Customer,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

export interface TicketDataContextType {
    ticketData: TicketData;
    setTicketData: React.Dispatch<React.SetStateAction<TicketData>>;
}

export interface ScheduleDataContextType {
    selectedDate: Schedule;
    setSelectedDate: React.Dispatch<React.SetStateAction<Schedule>>;
}


//contexts
export const SelectedServiceContext = createContext<ServiceContextType | undefined>(undefined);
export const CarDataContext = createContext<CarContextType | undefined>(undefined);
export const CustomerDataContext = createContext<CustomerContextType | undefined>(undefined);
export const TicketDataContext = createContext<TicketDataContextType | undefined>(undefined);
export const ScheduleDataContext = createContext<ScheduleDataContextType | undefined>(undefined);


export const fetchTicketServices = async () => {
    try {
        const response = await axiosInstance.get('http://localhost:8081/api/v1/services/ticket-services');
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}

export const fetchReservedHours = async (date : string) => {
    try {
        let url = `http://localhost:8081/api/v1/reserved_hours/week?date=${date}`;
        const response = await axiosInstance.get(url)
        console.log(response.data)
        return response.data
    }
    catch(error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const fetchService = async (id : string | number | null) => {
    if (!id) return;

    try {
        let url = `http://localhost:8081/api/v1/services/${id}`;
        const response = await axiosInstance.get(url)
        console.log(response.data)
        return response.data;
    }
    catch(error) {
        console.error('Error fetching service:', error);
        throw error;
    }
}
