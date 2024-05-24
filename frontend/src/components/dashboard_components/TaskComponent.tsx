import React from 'react'
import { Task } from './model'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const TaskComponent = ({task}: {task: Task}) => {

  return (
    <>
      {task.id} <br></br>
      {task.description} 
      <div>
        {task.startTime?.toLocaleString()}
      </div>
      <div>
        {task.endTime?.toLocaleString()}
      </div>
      <div>
        ticket: {task.ticket?.ticketId}
      </div>
      <div>
        mech: {task.mechanic?.user.lastName}
      </div>
      {/* <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="text-base ml-3 font-semibold leading-6 text-gray-900">
            Deactivate account
        </div>
      </div>
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to deactivate your account? 
          </p>
        </div>
      </div> */}
    </>
  )
}

export default TaskComponent