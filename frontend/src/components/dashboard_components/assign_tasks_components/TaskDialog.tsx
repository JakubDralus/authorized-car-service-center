import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { GoInfo } from "react-icons/go";
import { ApiResponse, Assignment, Service } from '../../../api/model';
import { RxCross2 } from "react-icons/rx";
import { fetchAssignment } from '../../../pages/dashboard/TaskBoardFunctions';

export default function TaskDialog({taskId}: {taskId: string}) {

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<Assignment | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (open && taskId) {
      fetchAssignment(taskId)
        .then((response: ApiResponse<Assignment>) => {
          setTask(response.data);
          setServices(response.data.ticket.services);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log('Failed to fetch task details' + error);
        });
    }
  }, [open, taskId]);


  return (
    <>
    {/* entry */}
    <div onClick={() => setOpen(true)} 
      className='hover:text-blue-600 cursor-pointer'>
      <GoInfo size={25} />
    </div>

    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
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
                    Task Details
                    <div className='cursor-pointer' onClick={() => setOpen(false)} >
                      <RxCross2 />
                    </div>
                  </div>
                </DialogTitle>
                <hr className='mb-2 mt-3'/>
                <div className="mt-2">
                  {task && (
                    <div className="">
                      <p className="text-sm text-gray-600"><strong>Description:</strong> {task.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Start Time: </strong> 
                        {task.startTime && new Date(task.startTime).toLocaleString('pl-PL')}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>End Time: </strong> 
                        {task.endTime && new Date(task.endTime).toLocaleString('pl-PL')}
                      </p>
                      {/* <p className="text-sm text-gray-600"><strong>Duration:</strong> {task.duration} days</p> */}
                      <p className="text-sm text-gray-600"><strong>Status:</strong> {task.status} </p>
                      <hr className='mb-2 mt-1'/>
                      
                      <strong>Ticket</strong>
                      {task.ticket && (
                        <div className="text-sm text-gray-600">
                          <p><strong>Description:</strong> {task.ticket.description}</p>
                          <p><strong>Full Cost:</strong> {task.ticket.fullCost}$</p>
                          <p><strong>Status:</strong> {task.ticket.status}</p>
                          <p><strong>Created At:</strong> {new Date(task.ticket.createdAt).toLocaleString('pl-PL')}</p>
                          <p><strong>Last Updated At:</strong> {new Date(task.ticket.lastUpdatedAt).toLocaleString('pl-PL')}</p>
                          <p><strong>Car return date: </strong> 
                            {task.ticket.carReturnDate.date.toLocaleString('pl-PL')} {task.ticket.carReturnDate.hour}
                          </p>
                        </div>
                      )}
                      <div className='mt-2'>
                        <strong >Ticket Services</strong>
                      </div>
                      {services.map((service, index) => (
                        <div key={index} className="text-sm text-gray-600 mt-2 ml-3">
                          <strong className='text-black'>
                            id: {service.serviceId} {service.serviceId === task.service.serviceId ? " - this task" : null} 
                          </strong>
                          <p><strong>Name:</strong> {service.name}</p>
                          <p><strong>Estimated Repair Time:</strong> {service.estimatedRepairTime} hours</p>
                          <p><strong>Cost:</strong> {service.cost}$</p>
                          <p><strong>type:</strong> {service.type}</p>
                        </div>
                      ))}

                      <hr className='mb-2 mt-1'/>
                      <strong>Customer</strong>
                      {task.ticket.customer && (
                        <div className="text-sm text-gray-600">
                          <p><strong>Name:</strong> {task.ticket.customer.firstName} {task.ticket.customer.lastName}</p>
                          <p><strong>Email:</strong> {task.ticket.customer.email}</p>
                        </div>
                      )}
                      <hr className='mb-2 mt-1'/>
                      <strong>Car</strong>
                      {task.ticket.car && (
                        <div className="text-sm text-gray-600 ">
                          <p><strong>Model:</strong> {task.ticket.car.model}</p>
                          <p><strong>Production Year:</strong> {task.ticket.car.manufacturedYear}</p>
                          <p><strong>mileage:</strong> {task.ticket.car.mileage} km</p>
                          <p><strong>License Plate:</strong> {task.ticket.car.licensePlate}</p>
                          <p><strong>vin:</strong> {task.ticket.car.vin}</p>
                        </div>
                      )}

                      <hr className='mb-2 mt-1'/>
                      <strong>Manager</strong>
                      {task.manager && (
                        <div className="text-sm text-gray-600">
                          <p><strong>Name:</strong> {task.manager.user.firstName} {task.manager.user.lastName}</p>
                          <p><strong>Email:</strong> {task.manager.user.email}</p>
                        </div>
                      )}

                      <hr className='mb-2 mt-1'/>
                      <strong>Mechanic</strong>
                      {task.mechanic && (
                        <div className="text-sm text-gray-600">
                          <p><strong>Name:</strong> {task.mechanic.user.firstName} {task.mechanic.user.lastName}</p>
                          <p><strong>Email:</strong> {task.mechanic.user.email}</p>
                          <p><strong>Specialization:</strong> {task.mechanic.specialization}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {/* not a button because the dialog would open at the bottom 
                    https://github.com/tailwindlabs/headlessui/discussions/3211*/}
                  <div 
                    className=" cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Close
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  )
}
