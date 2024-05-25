interface ScheduleFormProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ prevStep, nextStep }) => {
    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-2xl mb-20 mt-10">Choose your preferred date to take your car to the service center</h2>
            <div className="w-full h-full flex justify-between sticky bottom-7">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
}