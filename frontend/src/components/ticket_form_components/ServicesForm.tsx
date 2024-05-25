import { useContext } from "react";
import { SelectedServiceContext, TicketDataContext } from "../../pages/ticket_form/TicketForm";
import { ServiceCard } from "./cards/ServiceCard";

interface ServicesFormProps {
    nextStep: () => void,
    services: { id: number; name: string; }[]
}

export const ServicesForm: React.FC<ServicesFormProps> = ({ nextStep, services }) => {
    const serviceContext = useContext(SelectedServiceContext);
    const ticketDataContext = useContext(TicketDataContext);

    const checkSelectedServices = () => {
        //check if there are selected services
        if (serviceContext?.selectedServices.length !== 0){
            //update state of the main variable that will be sent to backend
            ticketDataContext?.setTicketData((prevTicketData) => ({
                ...prevTicketData,
                services: serviceContext?.selectedServices ?? []
            }));

            nextStep();
        }
    }

    return (
            <div className="flex items-center justify-center flex-col">
                <div className="flex justify-start items-center flex-wrap gap-5">
                    {services ? (
                        <>
                            {services.map((service, index) => {
                                return (
                                    <ServiceCard key={index} service={service} />
                                )
                            })}
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className="w-full h-full flex justify-end sticky bottom-7">
                    <button className="ticket-form-button" onClick={checkSelectedServices}>Next</button>
                </div>
            </div>
    );
}
