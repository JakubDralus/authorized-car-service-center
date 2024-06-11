import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ApiResponse, Assignment, Service, Status } from '../../../api/model';
import { fetchAssignment,updateTaskStatus } from '../../../pages/dashboard/TaskBoardFunctions';
import Dropdown from './Dropdown';

interface TaskDialogProps {
  taskId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AssignmentDialog: React.FC<TaskDialogProps> = ({ taskId, open, setOpen }) => {
  const [task, setTask] = useState<Assignment | null>(null);
  const [status, setStatus] = useState<Status>(Status.REQUESTED);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (open && taskId) {
      fetchAssignment(taskId)
        .then((response: ApiResponse<Assignment>) => {
          setTask(response.data);
          setStatus(response.data.ticket.status as unknown as Status);
          setServices(response.data.ticket.services);
        })
        .catch((error: string) => {
          console.log('Failed to fetch task details: ' + error);
        });
    }
  }, [open, taskId]);

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
    console.log('New Status:', newStatus);
  };

  const handleUpdateStatus = async () => {
    if (task) {
      try {
        const updatedTask = await updateTaskStatus(task.assignmentId, status.toString());
        console.log('Task status updated:', updatedTask.data);
        // // Update the status of the task directly in the state
        setTask(updatedTask.data);

        // Close the dialog
        setOpen(false);
      } catch (error) {
        console.log('Failed to update task status: ' + error);
      }
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={setOpen}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl 
              transition-all sm:my-8 sm:w-full sm:max-w-3xl flex flex-col h-[75vh]">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex-grow">
                {task ? (
                  <>
                    <h2 className="text-xl font-semibold">{task.ticket.description}</h2>
                    <p><strong>Status:</strong> {task.status}</p>
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
                    <div className="mt-4 mb-12"> {/* Increased margin bottom */}
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <Dropdown status={task.status} onChange={handleStatusChange} />
                    </div>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold 
                    text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto sm:mt-0"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold 
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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