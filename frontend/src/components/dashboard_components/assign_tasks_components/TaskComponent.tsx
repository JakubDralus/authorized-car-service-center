import { TaskRead } from '../../../api/model';
import TaskDialog from './TaskDialog';

const TaskComponent = ({task}: {task: TaskRead}) => {

  // console.log(task);

  return (
    <div>
      <div className='font-bold flex justify-between'>
        id: {task.id}
        {task.mechanic && <TaskDialog taskId={task.id} />}
      </div>

      <hr className='mb-2 mt-2'/>

      <div className='max-h-6 overflow-ellipsis overflow-hidden whitespace-nowrap mb-1'>
        {task.description}
      </div>
      <div className='flex flex-col'>
        <div>
          <strong>start: </strong>{task.startTime ? task.startTime?.toLocaleString() : "-"}
        </div>
        <div>
          <strong>end: </strong>{task.startTime ? task.endTime?.toLocaleString() : "-"}
        </div>
        <div>
          <strong>ticket id: </strong>{task.ticket?.ticketId}
        </div>
        <div>
          {task.mechanic && (
            <div>
              <strong>mechanic: </strong>{task.mechanic?.user.firstName} {task.mechanic?.user.lastName} {task.mechanic.mechanicId}
            </div>
          )}
        </div>
        <div>
          {task.manager && (
            <div>
              <strong>manager: </strong>{task.manager?.user.firstName} {task.manager?.user.lastName}
            </div>
          )}
        </div>
        {task.ticket && (
          <div>
            <strong>status: </strong>{task.status}
          </div>
        )}
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