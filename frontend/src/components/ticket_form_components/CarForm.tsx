interface CarFormProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const CarForm: React.FC<CarFormProps> = ({ prevStep, nextStep }) => {
    return (
        <>
            <button onClick={nextStep}>next</button>
            <button onClick={prevStep}>prev</button>
        </>
    );
}