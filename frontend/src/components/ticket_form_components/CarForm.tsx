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
            <h2 className="text-2xl mb-20 mt-10">Provide your car details</h2>
            <form className="w-full flex justify-center gap-10 items-center mb-20 max-[680px]:flex-col max-[680px]:gap-8">
                <div className="flex justify-center items-start flex-col gap-8">
                    <label className="flex flex-col gap-3">
                        Model
                        <input className="car-form-input" type="text" name="model" />
                    </label>
                    <label className="flex flex-col gap-3">
                        VIN
                        <input className="car-form-input" type="text" name="vin" />
                    </label>
                    <label className="flex flex-col gap-3">
                        Year of manufacture
                        <input className="car-form-input" type="number" name="manufacturedYear" />
                    </label>
                </div>
                <div className="flex justify-center items-start flex-col gap-8">
                    <label className="flex flex-col gap-3">
                        License plate number
                        <input className="car-form-input" type="text" name="licensePlate" />
                    </label>
                    <label className="flex flex-col gap-3">
                        Color
                        <input className="car-form-input" type="text" name="color" />
                    </label>
                    <label className="flex flex-col gap-3">
                        Mileage
                        <input className="car-form-input" type="number" name="mileage" />
                    </label>
                </div>
            </form>
            <div className="w-full h-full flex justify-between sticky bottom-7">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" onClick={validateCarDetails}>Next</button>
            </div>
        </div>
    );
}