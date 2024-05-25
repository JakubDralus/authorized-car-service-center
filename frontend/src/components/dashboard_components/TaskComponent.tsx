import { Task } from './model'

const TaskComponent = ({task}: {task: Task}) => {

  return (
    <div>
      <span className='font-bold'>
        id: {task.id} <br></br>
      </span>
      <hr className='mb-2 mt-1'/>
      <div className='max-h-6 overflow-ellipsis overflow-hidden'>
        {task.description} 
      </div>
      <div>
        {"start: " + task.startTime?.toLocaleString()}
      </div>
      <div>
        {"end: " + task.endTime?.toLocaleString()}
      </div>
      <div>
        ticket: {task.ticket?.ticketId}
      </div>
      <div>
        {task.mechanic && `mech: ${task.mechanic?.user.firstName} ${task.mechanic?.user.lastName} ${task.mechanic.mechanicId}`} <br></br>
        {task.manager && `menago: ${task.manager?.user.firstName} ${task.manager?.user.lastName} `} <br></br>
        {task.ticket && `status: ${task.ticket.status}`}
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
    </div>
  )
}

export default TaskComponent