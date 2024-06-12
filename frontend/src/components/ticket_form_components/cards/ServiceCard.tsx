import { useContext, useEffect, useState } from "react";
import { SelectedServiceContext } from "../../../pages/ticket_form/ticketFormFunctions";

interface ServiceCardProps {
    service: {     
        serviceId: number,
        name: string,
        description: string,
        estimatedRepairTime: number,
        cost: number
    }
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const serviceContext = useContext(SelectedServiceContext);

    const [isSelected, setIsSelected] = useState<boolean>(false);

    //check if service is already selected
    useEffect(() => {
        const serviceIndex = serviceContext?.selectedServices.findIndex(
            (existingService) => existingService.serviceId === service.serviceId
        );
        if (serviceIndex !== -1) {
            setIsSelected(true);
        } 
        else {
            setIsSelected(false);
        }
    }, [service.serviceId, serviceContext?.selectedServices]);

    const addService = () => {
        const serviceIndex = serviceContext?.selectedServices.findIndex(
            (existingService) => existingService.serviceId === service.serviceId
        );

        if (serviceIndex !== -1) {
            serviceContext?.setSelectedServices((prevSelectedServices) =>
                prevSelectedServices.filter(
                    (_, index) => index !== serviceIndex
                )
            );
            setIsSelected(false);
        } 
        else {
            serviceContext?.setSelectedServices((prevSelectedServices) => [
                ...prevSelectedServices,
                service
            ]);
            setIsSelected(true);
        }
    }

    return (
        <div className={`ticket-form-card h-64 bg-white border-solid border-2 rounded-md ${isSelected ? 'selected' : ''}`}>
            <div className="p-3 h-full flex flex-col justify-between items-start">
                <div className="text-lg">{service.name}</div>
                <div className="text-sm">{service.description}</div>
                <div className="w-full flex justify-between items-center">
                    <div>Est. repair time: {service.estimatedRepairTime} days</div>
                    <div>{service.cost} PLN</div>
                </div>
                <div className="w-full flex items-center justify-center">
                    <button className="w-44 h-10  bg-green-200" onClick={addService}>Select</button>
                </div>
            </div>
        </div>
    )
}