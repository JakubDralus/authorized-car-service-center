import { useState } from "react";
import "./TicketForm.module.css";
import Navbar from "../../components/navbar/Navbar";
import { ServicesForm } from "../../components/ticket_form_components/ServicesForm";
import { ScheduleForm } from "../../components/ticket_form_components/ScheduleForm";
import { ClientDataForm } from "../../components/ticket_form_components/ClientDataForm";
import { CarForm } from "../../components/ticket_form_components/CarForm";
import { ConfirmationForm } from "../../components/ticket_form_components/ConfirmationForm";

export const TicketForm = () => {
    const [step, setStep] = useState<number>(1);
    const [selectedServices, setSelectedServices] = useState(null);
    const [serviceDate, setServiceDate] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [carData, setCarData] = useState(null);

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
                <div className="mx-auto my-0">
                    <div className="info-about-provided-data">

                    </div>
                    <div className="all-the-forms">
                        <h1>Multi-step Form</h1>
                        {step === 1 && (
                            <ServicesForm nextStep={nextStep} />
                        )}
                        {step === 2 && (
                            <ScheduleForm nextStep={nextStep} prevStep={prevStep}/>
                        )}
                        {step === 3 && (
                            <ClientDataForm nextStep={nextStep} prevStep={prevStep}/>
                        )}
                        {step === 4 && (
                            <CarForm nextStep={nextStep} prevStep={prevStep}/>
                        )}
                        {step === 5 && (
                            <ConfirmationForm prevStep={prevStep}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}