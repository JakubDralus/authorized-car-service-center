interface ClientDataProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const ClientDataForm: React.FC<ClientDataProps> = ({ prevStep, nextStep }) => {
    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-2xl mb-20 mt-10">Provide your personal information</h2>
            <div className="car-form-wrapper mx-auto">
                <form className="w-full flex flex-col justify-between items-center mb-20 gap-10">
                    <div className="flex justify-center items-start gap-10 max-[680px]:flex-col">
                        <label className="flex flex-col gap-3 max-[680px]:flex-col">
                            First name
                            <input className="customer-form-input" type="text" name="model" />
                        </label>
                        <label className="flex flex-col gap-3">
                            Last name
                            <input className="customer-form-input" type="text" name="vin" />
                        </label>
                    </div>
                    <div className="flex justify-center items-start gap-10 max-[680px]:flex-col">
                        <label className="flex flex-col gap-3">
                            Phone number
                            <input className="customer-form-input" type="text" name="licensePlate" />
                        </label>
                        <label className="flex flex-col gap-3">
                            E-mail
                            <input className="customer-form-input" type="text" name="color" />
                        </label>
                    </div>
                    <label className="w-full flex flex-col gap-3">
                        Description
                        <textarea name="description" className="w-full h-72 p-2 border-2 border-gray-400 focus:outline-0 focus:border-black">

                        </textarea>
                    </label>
                </form>
            </div>
            <div className="w-full h-full flex justify-between sticky bottom-7">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
}