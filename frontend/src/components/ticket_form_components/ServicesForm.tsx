interface ServicesFormProps{
    nextStep: () => void
}

export const ServicesForm: React.FC<ServicesFormProps> = ({nextStep}) => {
    return ( 
        <div>
            <button onClick={nextStep}>next</button>
        </div>
     );
}
