import { useState } from "react";
import "./TicketForm.css";
import Navbar from "../../components/navbar/Navbar";
import { ServicesForm } from "../../components/ticket_form_components/ServicesForm";
import { ScheduleForm } from "../../components/ticket_form_components/ScheduleForm";
import { ClientDataForm } from "../../components/ticket_form_components/ClientDataForm";
import { CarForm } from "../../components/ticket_form_components/CarForm";
import { ConfirmationForm } from "../../components/ticket_form_components/ConfirmationForm";
import { createContext } from "react";

interface Service{
    id: number,
    name: string
}

interface ServiceContextType {
    selectedServices: Service[];
    setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export const SelectedServiceContext = createContext<ServiceContextType | undefined>(undefined);


export const TicketForm = () => {
    const [step, setStep] = useState<number>(1);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [serviceDate, setServiceDate] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [carData, setCarData] = useState(null);

    //test
    const services = [
        {
            id: 1,
            name: 'Tire Change'
        },
        {
            id: 2,
            name: 'Oil change'
        },
        {
            id: 3,
            name: 'Check engine'
        },
        {
            id: 4,
            name: 'Check engine2'
        },
        {
            id: 5,
            name: 'Check engine3'
        }
    ]

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

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
                                        <div>
                                            {selectedServices.map((service, index) => {
                                                return(
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
                                </div>
                                <div className="form-info-box">
                                    <h3 className="text-lg">Personal details</h3>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-around bg-gray-100 text-xl p-4">
                                <div className={`${step >= 1 ? 'text-red-500' : ''}`}>Services</div>
                                <div className={`${step >= 2 ? 'text-red-500' : ''}`}>Schedule</div>
                                <div className={`${step >= 3 ? 'text-red-500' : ''}`}>Car details</div>
                                <div className={`${step >= 4 ? 'text-red-500' : ''}`}>Client details</div>
                                <div className={`${step >= 5 ? 'text-red-500' : ''}`}>Confirm</div>
                            </div>
                        </div>
                        <div className="w-full h-full">
                            {step === 1 && (
                                <SelectedServiceContext.Provider value={{ selectedServices, setSelectedServices }}>
                                    <ServicesForm nextStep={nextStep} services={services} />
                                </SelectedServiceContext.Provider>
                            )}
                            {step === 2 && (
                                <ScheduleForm nextStep={nextStep} prevStep={prevStep} />
                            )}
                            {step === 3 && (
                                <CarForm nextStep={nextStep} prevStep={prevStep} />
                            )}
                            {step === 4 && (
                                <ClientDataForm nextStep={nextStep} prevStep={prevStep} />
                            )}
                            {step === 5 && (
                                <ConfirmationForm prevStep={prevStep} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}