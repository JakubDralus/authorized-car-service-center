import { ServiceCard } from "./cards/ServiceCard";

interface ServicesFormProps{
    nextStep: () => void,
    services: { id: number; name: string; }[]
}

export const ServicesForm: React.FC<ServicesFormProps> = ({nextStep, services}) => {
    return ( 
        <div className="flex items-center justify-center flex-col">
            <div className="flex justify-start items-center flex-wrap gap-5">
                {services ? (
                    <>
                        {services.map((service, index) => {
                            return (
                                <ServiceCard key={index} service={service}/>
                            )
                        })}
                    </>
                ) : (
                <div>Loading...</div>
                )}
            </div>
            <div className="w-full h-full flex justify-end">
                <button className="ticket-form-button" onClick={nextStep}>Next</button>     
            </div>
        </div>
     );
}
