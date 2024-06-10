import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskComponent from './TaskComponent';
import { TaskColumnType } from "../../../pages/dashboard/AssignTasks";
import { TaskRead } from "../../../api/model";

const TaskColumn = ({ column }: { column: TaskColumnType }) => (
  <div key={column.id} className='w-72 min-w-72'>
    <h2 className={`${column.id === 'column0' ? 'text-blue-500' : ''} text-lg font-semibold mb-2`}>{column.title}</h2>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          className={`bg-gray-200 p-2 min-h-screen overflow-auto rounded pb-5 ${snapshot.isDraggingOver ? "bg-gray-300" : ""}
          ${column.id === 'column0' ? 'bg-gray-300' : ''}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {column.tasks.map((task: TaskRead, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  className={`bg-white p-2 mb-2 rounded shadow ${snapshot.isDragging ? "bg-green-200" : ""}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskComponent task={column.tasks[index]} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default TaskColumn;
