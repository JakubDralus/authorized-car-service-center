import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { User } from '../../api/model';

interface ProfileDialogProps {
  user: User
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({user, isOpen, onClose }) => {

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
                        Profile Details
                        <div className='cursor-pointer' onClick={onClose}>
                          <RxCross2 />
                        </div>
                      </div>
                    </DialogTitle>
                    <hr className='mb-2 mt-3'/>
                    <div className="mt-2">
                      {user && (
                        <div>
                          <div>
                            <span className="font-semibold">First Name:</span> {user.firstName}
                          </div>
                          <div>
                            <span className="font-semibold">Last Name:</span> {user.lastName}
                          </div>
                          <div>
                            <span className="font-semibold">Email:</span> {user.email}
                          </div>
                          <div>
                            <span className="font-semibold">Telephone Number:</span> {user.telephoneNumber}
                          </div>
                          <div>
                            <span className="font-semibold">Role:</span> {user.role}
                          </div>
                          {user.address && (<div>
                            <span className="font-semibold">Address: </span> 
                            {user.address.street}, {user.address.city}, {user.address.postalCode}, {user.address.country}
                          </div>)}
                        </div>
                      )}
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

export default ProfileDialog;
