interface ConfirmationFormProps {
    prevStep: () => void,
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ prevStep }) => {
    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-2xl mb-20 mt-10">Summary</h2>
            <div className="w-full h-full flex justify-between sticky bottom-7">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" >Create ticket</button>
            </div>
        </div>
    );
}