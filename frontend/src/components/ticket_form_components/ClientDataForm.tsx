interface ClientDataProps{
    nextStep: () => void,
    prevStep: () => void,
}

export const ClientDataForm: React.FC<ClientDataProps> = ({ prevStep, nextStep }) => {
    return ( 
        <>
        <button onClick={nextStep}>next</button>
        <button onClick={prevStep}>prev</button>
    </>
     );
}