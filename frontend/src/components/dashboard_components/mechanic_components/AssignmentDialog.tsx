import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ApiResponse, Assignment, Service } from '../../../api/model';
import { fetchAssignment } from '../../../pages/dashboard/TaskBoardFunctions';

interface TaskDialogProps {
  taskId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

enum Status {
  REQUESTED = 'REQUESTED',
  PENDING = 'PENDING',
  DOING = 'DOING',
  DONE = 'DONE',
  CLOSED = 'CLOSED',
}

const AssignmentDialog: React.FC<TaskDialogProps> = ({ taskId, open, setOpen }) => {
  const [task, setTask] = useState<Assignment | null>(null);
  const [status, setStatus] = useState<Status | ''>('');
  const [services, setServices] = useState<Service[]>([]);


  useEffect(() => {
    if (open && taskId) {
      fetchAssignment(taskId)
        .then((response: ApiResponse<Assignment>) => {
          setTask(response.data);
          setStatus(response.data.ticket.status as unknown as Status);
          setServices(response.data.ticket.services);
          console.log('dudupson');
        })
        .catch((error: string) => {
          console.log('Failed to fetch task details: ' + error);
        });
    }
  }, [open, taskId]);

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
  };

  // const handleUpdateStatus = () => {
  //   if (task) {
  //     // Add logic to update task status via API
  //     console.log(`Updating assignment ${task.ticket.ticketId} status to ${status}`);
      
  //   }
  // };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                {task ? (
                  <>
                    <h2 className="text-xl font-semibold">{task.ticket.description}</h2>
                    <p><strong>Status:</strong> {task.ticket.status}</p>
                    <p><strong>Full Cost:</strong> {task.ticket.fullCost}</p>
                    <p><strong>Created At:</strong> {new Date(task.ticket.createdAt).toLocaleString()}</p>
                    <p><strong>Last Updated At:</strong> {new Date(task.ticket.lastUpdatedAt).toLocaleString()}</p>
                    <div>
                      <h3 className="text-lg font-medium mt-2">User:</h3>
                      <p>{task.ticket.customer.firstName} {task.ticket.customer.lastName}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mt-2">Car:</h3>
                      <p>{task.ticket.car.model}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mt-2">Services:</h3>
                      <ul>
                        {services.map((service, index) => (
                          <li key={index}>{service.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value as Status)}
                        className="w-full p-2 border rounded mt-1"
                      >
                        {Object.values(Status).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  // onClick={handleUpdateStatus}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AssignmentDialog;
