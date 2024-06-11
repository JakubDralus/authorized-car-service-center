import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { TicketRead } from '../../api/model';
import { useEffect, useState } from 'react';
import { fetchUsersTickets } from './navbarFunctions';

interface ProfileDialogProps {
  // tickets: TicketRead[]
  isOpen: boolean;
  onClose: () => void;
}

const UserTicketsDialog: React.FC<ProfileDialogProps> = ({isOpen, onClose }) => {
  
  const [tickets, setTickets] = useState<TicketRead[]>([]); 
  // const [services, setServices] = useState<Service[]>([]);

  // fetch everytime it's opened to have latest changes
  useEffect(() => {
    if (isOpen) {
      fetchUsersTickets().then((tickets: TicketRead[]) => {
        setTickets(tickets);
      });
    }
  },[isOpen])

  return (
    <>
      <Transition show={isOpen}>
        <Dialog className="relative z-50" onClose={onClose}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <DialogTitle as="h2" className="text-2xl font-medium leading-6 text-gray-900">
                      <div className='flex justify-between'>
                        My Tickets
                        <div className='cursor-pointer' onClick={onClose}>
                          <RxCross2 />
                        </div>
                      </div>
                    </DialogTitle>
                    <div className="mt-2">
                    {tickets.map((ticket, index) => (
                      <div className='mb-4'>
                        <hr className='mb-2 mt-3'/>
                        <strong>num: {index+1}</strong>
                        <div className="text-sm text-gray-600">
                          <p><strong>Description:</strong> {ticket.description}</p>
                          <p><strong>Full Cost:</strong> {ticket.fullCost}$</p>
                          <p><strong>Status:</strong> {ticket.status}</p>
                          <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString('pl-PL')}</p>
                          <p><strong>Last Updated At:</strong> {new Date(ticket.lastUpdatedAt).toLocaleString('pl-PL')}</p>
                          <p><strong>Car return date: </strong> 
                            {ticket.carReturnDate.date.toLocaleString('pl-PL')} {ticket.carReturnDate.hour}
                          </p>

                          {ticket.services.map((service, index) => (
                            <div key={index} className="text-sm text-gray-600 mt-2 ml-3">
                              <strong className='text-black'>
                                service {index+1}
                              </strong>
                              <p><strong>Name:</strong> {service.name}</p>
                              <p><strong>Estimated Repair Time:</strong> {service.estimatedRepairTime} hours</p>
                              <p><strong>Cost:</strong> {service.cost}$</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold 
                        text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserTicketsDialog;
