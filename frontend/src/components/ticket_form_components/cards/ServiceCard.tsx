import { useContext } from "react";
import { SelectedServiceContext } from "../../../pages/ticket_form/TicketForm";

interface ServiceCardProps {
    service: { id: number; name: string; }
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const serviceContext = useContext(SelectedServiceContext);

    const addService = () => {
        const serviceIndex = serviceContext?.selectedServices.findIndex(
            (existingService) => existingService.id === service.id
        );

        if (serviceIndex !== -1) {
            serviceContext?.setSelectedServices((prevSelectedServices) =>
                prevSelectedServices.filter(
                    (_, index) => index !== serviceIndex
                )
            );
        } 
        else {
            serviceContext?.setSelectedServices((prevSelectedServices) => [
                ...prevSelectedServices,
                service
            ]);
        }
    }

    return (
        <div className="ticket-form-card-width h-64 bg-red-200">
            <div className="p-3 h-full flex flex-col justify-between items-start">
                <div>{service.name}</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas molestie dolor ac venenatis euismod.</div>
                <div>1000 PLN</div>
                <div className="w-full flex items-center justify-center">
                    <button className="w-44 h-10  bg-green-200" onClick={addService}>Select</button>
                </div>
            </div>
        </div>
    )
}