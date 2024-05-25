import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskColumnType } from '../../pages/dashboard/AssignTasks';  // Adjust the import path based on your project structure
import TaskComponent from './TaskComponent';

const TaskColumn = ({ column }: {column: TaskColumnType}) => (
  <div key={column.id} className=" w-72  ">
    <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          className={`bg-gray-200 p-2 h-screen rounded ${snapshot.isDraggingOver ? "bg-gray-300" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {column.tasks.map((task, index) => (
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
