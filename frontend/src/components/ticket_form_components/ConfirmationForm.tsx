import { useContext } from "react";
import { TicketDataContext } from "../../pages/ticket_form/ticketFormFunctions";

interface ConfirmationFormProps {
    prevStep: () => void,
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ prevStep }) => {
    const ticketDataContext = useContext(TicketDataContext);
    const fullPrice = ticketDataContext?.ticketData.services.reduce((sum, service) => sum + service.cost, 0)
    const repairDuration = ticketDataContext?.ticketData.services.reduce((sum, service) => sum + service.estimatedRepairTime, 0)

    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-2xl mb-20 mt-10">Summary</h2>
            {/* services */}
            <div className="w-full flex flex-col gap-20">
                <div className="w-full flex flex-col items-start justify-center gap-10">
                    <div>
                        <span className="ticket-form-decor"></span>
                        <h2 className="text-2xl">Selected services</h2>
                    </div>
                    <div className="flex items-center w-full justify-start gap-10 flex-wrap">
                        {ticketDataContext?.ticketData.services.map((service, index) => {

                            return (
                                <div className={``} key={index}>
                                    <div className=" h-full flex flex-col justify-between items-start">
                                        <div className="text-lg">{service.name}</div>
                                        <div className="w-full flex flex-col justify-between items-start">
                                            <div>Est. repair time: {service.estimatedRepairTime} days</div>
                                            <div>Cost: {service.cost} PLN</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col">
                        <span>Full price: {fullPrice} PLN</span>
                        <span>Estimated service duration: {repairDuration} days</span>
                    </div>
                </div>
                {/* schedule */}
                <div className="w-full flex flex-col items-start justify-center gap-10">
                    <div>
                        <span className="ticket-form-decor"></span>
                        <h2 className="text-2xl">Scheduled date</h2>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-10">
                    <div>
                        <span className="ticket-form-decor"></span>
                        <h2 className="text-2xl">Car details</h2>
                    </div>
                    <div className="flex flex-col">
                        <span>Model: {ticketDataContext?.ticketData.car.model}</span>
                        <span>VIN: {ticketDataContext?.ticketData.car.vin}</span>
                        <span>License plate: {ticketDataContext?.ticketData.car.licensePlate}</span>
                        <span>Color: {ticketDataContext?.ticketData.car.color}</span>
                        <span>Manufacture year: {ticketDataContext?.ticketData.car.manufacturedYear}</span>
                        <span>Mileage: {ticketDataContext?.ticketData.car.mileage}</span>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-10">
                    <div>
                        <span className="ticket-form-decor"></span>
                        <h2 className="text-2xl">Personal data</h2>
                    </div>
                    <div className="flex flex-col">
                        <span>First name: {ticketDataContext?.ticketData.customer.firstName}</span>
                        <span>Last name: {ticketDataContext?.ticketData.customer.lastName}</span>
                        <span>Phone number: {ticketDataContext?.ticketData.customer.telephoneNumber}</span>
                        <span>E-mail: {ticketDataContext?.ticketData.customer.email}</span>
                        <span>Address:</span>
                        <span>City: {ticketDataContext?.ticketData.customer.address.city}</span>
                        <span>Street: {ticketDataContext?.ticketData.customer.address.street}</span>
                        <span>Postal code: {ticketDataContext?.ticketData.customer.address.postalCode}</span>
                        <span>Country:  {ticketDataContext?.ticketData.customer.address.country}</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex justify-between sticky bottom-7 mt-12">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" >Create ticket</button>
            </div>
        </div>
    );
}