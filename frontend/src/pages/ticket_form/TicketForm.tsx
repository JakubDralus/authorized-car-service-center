import { useEffect, useState } from "react";
import "./TicketForm.css";
import Navbar from "../../components/navbar/Navbar";
import { ServicesForm } from "../../components/ticket_form_components/ServicesForm";
import { ScheduleForm } from "../../components/ticket_form_components/ScheduleForm";
import { ClientDataForm } from "../../components/ticket_form_components/ClientDataForm";
import { CarForm } from "../../components/ticket_form_components/CarForm";
import { ConfirmationForm } from "../../components/ticket_form_components/ConfirmationForm";
import { createContext } from "react";
import { useQuery } from "react-query";
import { fetchTicketServices } from "./ticketFormFunctions";


//for context
interface Service {
    serviceId: number,
    name: string,
    description: string,
    estimatedRepairTime: number,
    cost: number
}

interface Schedule {

}

interface Car {
    model: string,
    manufacturedYear: number,
    licensePlate: string,
    vin: string,
    color: string,
    mileage: number
}

interface Customer {
    userId: number,
    firstName: string,
    lastName: string,
    telephoneNumber: string,
    email: string,
}

interface TicketData {
    description: string,
    services: Service[],
    car: Car,
    customer: Customer
}


interface ServiceContextType {
    selectedServices: Service[];
    setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

interface CarContextType {
    carData: Car,
    setCarData: React.Dispatch<React.SetStateAction<Car>>;
}

interface CustomerContextType {
    customerData: Customer,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

interface TicketDataContextType {
    ticketData: TicketData;
    setTicketData: React.Dispatch<React.SetStateAction<TicketData>>;
}


//contexts
export const SelectedServiceContext = createContext<ServiceContextType | undefined>(undefined);
export const CarDataContext = createContext<CarContextType | undefined>(undefined);
export const CustomerDataContext = createContext<CustomerContextType | undefined>(undefined);
export const TicketDataContext = createContext<TicketDataContextType | undefined>(undefined);

export const TicketForm = () => {
    const [step, setStep] = useState<number>(1);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [serviceDate, setServiceDate] = useState(null);
    const [carData, setCarData] = useState<Car>({
        model: '',
        manufacturedYear: -1,
        licensePlate: '',
        vin: '',
        color: '',
        mileage: -1,
    });
    const [customerData, setCustomerData] = useState<Customer>({
        userId: -1,
        firstName: '',
        lastName: '',
        telephoneNumber: '',
        email: '',
    });

    const [ticketData, setTicketData] = useState<TicketData>({
        description: '',
        services: [{
            serviceId: -1,
            name: '',
            description: '',
            estimatedRepairTime: -1,
            cost: -1
        }],
        car: {
            model: '',
            manufacturedYear: -1,
            licensePlate: '',
            vin: '',
            color: '',
            mileage: -1
        },
        customer: {
            userId: -1,
            firstName: '',
            lastName: '',
            telephoneNumber: '',
            email: '',
        }
    });

    //service fetching
    const {data, error, isLoading} = useQuery(
        ['ticketServices'],
        fetchTicketServices
    );


    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    useEffect(() => {
        console.log("Updated ticketData's services:", ticketData.services);
    }, [ticketData.services]);

    return (
        <>
            <Navbar />
            <div className="w-full h-full">
                <div className="mx-auto my-0 ticket-form-wrapper">
                    <div className="flex flex-col items-center justify-center gap-5 last:gap-16">
                        <div className="w-full flex flex-col gap-5">
                            <h1 className="text-4xl text-center py-7">Creating ticket</h1>
                            <div className="flex justify-between items-center w-full gap-1">
                                <div className="form-info-box">
                                    <h3 className="text-lg">Selected services</h3>
                                    {selectedServices ? (
                                        <div className="w-full">
                                            {selectedServices.map((service, index) => {
                                                return (
                                                    <div key={index}>{service.name}</div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <div className="form-info-box">
                                    <h3 className="text-lg">Scheduled date</h3>
                                </div>
                                <div className="form-info-box">
                                    <h3 className="text-lg">Car</h3>
                                    {/* todo */}
                                    {carData.model !== '' ? (
                                        <div className="w-full">
                                            {carData.manufacturedYear}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <div className="form-info-box">
                                    <h3 className="text-lg">Personal details</h3>
                                    {/* todo */}
                                    {customerData.email !== '' ? (
                                        <div className="w-full">
                                            {customerData.telephoneNumber}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-around bg-gray-100 text-xl p-4">
                                <div className={`${step >= 1 ? 'text-red-500' : ''}`}>Services</div>
                                <div className={`${step >= 2 ? 'text-red-500' : ''}`}>Schedule</div>
                                <div className={`${step >= 3 ? 'text-red-500' : ''}`}>Car details</div>
                                <div className={`${step >= 4 ? 'text-red-500' : ''}`}>Client details</div>
                                <div className={`${step >= 5 ? 'text-red-500' : ''}`}>Summary</div>
                            </div>
                        </div>
                        <div className="w-full h-full bg-gray-50 p-7">
                            <TicketDataContext.Provider value={{ ticketData, setTicketData }}>
                                {step === 1 && (
                                    <SelectedServiceContext.Provider value={{ selectedServices, setSelectedServices }}>
                                        <ServicesForm nextStep={nextStep} services={data} />
                                    </SelectedServiceContext.Provider>
                                )}
                                {step === 2 && (
                                    <ScheduleForm nextStep={nextStep} prevStep={prevStep} />
                                )}
                                {step === 3 && (
                                    <CarDataContext.Provider value={{ carData, setCarData }}>
                                        <CarForm nextStep={nextStep} prevStep={prevStep} />
                                    </CarDataContext.Provider>
                                )}
                                {step === 4 && (
                                    <CustomerDataContext.Provider value={{ customerData, setCustomerData }}>
                                        <ClientDataForm nextStep={nextStep} prevStep={prevStep} />
                                    </CustomerDataContext.Provider>
                                )}
                                {step === 5 && (
                                    <ConfirmationForm prevStep={prevStep} />
                                )}
                            </TicketDataContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}