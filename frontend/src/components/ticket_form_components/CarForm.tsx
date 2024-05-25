interface CarFormProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const CarForm: React.FC<CarFormProps> = ({ prevStep, nextStep }) => {
    const validateCarDetails = () => {
        //here validate car data before setting state
        nextStep()
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex justify-start items-center flex-wrap gap-5">

            </div>
            <div className="w-full h-full flex justify-between sticky bottom-7">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" onClick={validateCarDetails}>Next</button>
            </div>
        </div>
    );
}