interface ClientDataProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const ClientDataForm: React.FC<ClientDataProps> = ({ prevStep, nextStep }) => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="w-full h-full flex justify-between sticky bottom-7">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
}