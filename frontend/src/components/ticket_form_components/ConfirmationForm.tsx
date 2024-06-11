import { useContext, useState} from "react";
import { TicketDataContext, useCreateTicket } from "../../pages/ticket_form/ticketFormFunctions";
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';


interface ConfirmationFormProps {
    prevStep: () => void,
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ prevStep }) => {
    const ticketDataContext = useContext(TicketDataContext);
    const fullPrice = ticketDataContext?.ticketData.services.reduce((sum, service) => sum + service.cost, 0)
    const repairDuration = ticketDataContext?.ticketData.services.reduce((sum, service) => sum + service.estimatedRepairTime, 0)
    const token = localStorage.getItem('token');
    const ticketMutation = useCreateTicket(token, ticketDataContext?.ticketData);
    const [ticketCreated, setTicketCreated] = useState(false);
    const navigate = useNavigate();
    
    const calcFullCost = () => {
      return ticketDataContext?.ticketData.services.reduce((sum, service) => sum + service.cost, 0)
    }

    const createTicket = () => {
      if (ticketDataContext && ticketDataContext.ticketData) {
        ticketDataContext.ticketData.fullCost = calcFullCost() || 0;
      }
      try{
        ticketMutation.mutate({
          data: ticketDataContext?.ticketData,
          token: token
        });
        setTicketCreated(true);
      } catch(error){
        console.error('Error creating ticket:', error);
      }
    }

    const handleClose = () => {
      setTicketCreated(false);
      navigate('/');
    };

    return (
        <div className="flex items-center justify-center flex-col">
          <Dialog open={ticketCreated} onClose={() => setTicketCreated(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Title className="fixed inset-0 bg-black opacity-30" /> 

                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-auto z-10">
                        <Dialog.Title className="text-2xl font-bold mb-4">Success!</Dialog.Title>
                        <p className="mb-4">Ticket successfully created!</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </Dialog>
            
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
                        <div className="flex flex-col">
                            <span>Date: {ticketDataContext?.ticketData.schedule.date?.toDateString()}</span>
                            <span>Time: {ticketDataContext?.ticketData.schedule.hour}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-10">
                    <div>
                        <span className="ticket-form-decor"></span>
                        <h2 className="text-2xl">Car details</h2>
                    </div>
                    <div className="flex flex-col gap-2">
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
                    <div className="flex flex-col gap-2">
                        <span>First name: {ticketDataContext?.ticketData.customer.firstName}</span>
                        <span>Last name: {ticketDataContext?.ticketData.customer.lastName}</span>
                        <span>Phone number: {ticketDataContext?.ticketData.customer.telephoneNumber}</span>
                        <span>E-mail: {ticketDataContext?.ticketData.customer.email}</span>
                        {ticketDataContext?.ticketData.customer.address.country &&
                        ticketDataContext?.ticketData.customer.address.city &&
                        ticketDataContext?.ticketData.customer.address.street &&
                        ticketDataContext?.ticketData.customer.address.postalCode? ( 
                          <div className="flex flex-col mt-6 gap-2">
                            <span className="font-bold">Address:</span>
                            <span>City: {ticketDataContext?.ticketData.customer.address.city}</span>
                            <span>Street: {ticketDataContext?.ticketData.customer.address.street}</span>
                            <span>Postal code: {ticketDataContext?.ticketData.customer.address.postalCode}</span>
                            <span>Country:  {ticketDataContext?.ticketData.customer.address.country}</span>
                          </div>
                        ): null}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex justify-between sticky bottom-7 mt-12">
                <button className="ticket-form-button" onClick={prevStep}>Prev</button>
                <button className="ticket-form-button" onClick={createTicket}>Create ticket</button>
            </div>
        </div>
    );
}