interface ScheduleFormProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ prevStep, nextStep }) => {
    return (
        <>
            <button onClick={nextStep}>next</button>
            <button onClick={prevStep}>prev</button>
        </>
    );
}