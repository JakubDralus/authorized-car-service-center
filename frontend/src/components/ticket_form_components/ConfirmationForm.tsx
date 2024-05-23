interface ConfirmationFormProps {
    prevStep: () => void,
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ prevStep }) => {
    return (
        <>
            <button onClick={prevStep}>prev</button>
        </>
    );
}