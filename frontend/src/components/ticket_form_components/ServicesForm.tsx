interface ServicesFormProps{
    nextStep: () => void,
    services: { id: number; name: string; }[]
}

export const ServicesForm: React.FC<ServicesFormProps> = ({nextStep, services}) => {
    return ( 
        <div className="flex items-center justify-center">
            <div>

            </div>
            <div className="w-full flex justify-end items-end">
                <button className="ticket-form-button" onClick={nextStep}>Next</button>
            </div>
        </div>
     );
}
