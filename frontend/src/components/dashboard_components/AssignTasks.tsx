import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Dialog from "./Dialog";


// Define types for column and task
type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

// Predefined arrays for columns and tasks
const initialColumns: Column[] = [
  {
    id: "column1",
    title: "To Do",
    tasks: [{ id: "task1", content: "Task 1" }, { id: "task2", content: "Task 2" }]
  },
  {
    id: "column2",
    title: "In Progress",
    tasks: [{ id: "task3", content: "Task 3" }]
  }
];

const AssignTasks: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const columnIndex = columns.findIndex(col => col.id === source.droppableId);
      const newTasks = Array.from(columns[columnIndex].tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumns = [...columns];
      newColumns[columnIndex].tasks = newTasks;
      setColumns(newColumns);
    } 
    else {
      const sourceIndex = columns.findIndex(col => col.id === source.droppableId);
      const destIndex = columns.findIndex(col => col.id === destination.droppableId);

      const sourceTasks = Array.from(columns[sourceIndex].tasks);
      const destTasks = Array.from(columns[destIndex].tasks);

      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const newColumns = [...columns];
      newColumns[sourceIndex].tasks = sourceTasks;
      newColumns[destIndex].tasks = destTasks;
      setColumns(newColumns);
    }

    const columnIndex = columns.findIndex(col => col.id === destination.droppableId);
    console.log(columns[columnIndex].tasks);
    console.log(columnIndex)
  };

  return (
    <>
    <div className="flex">
      <h1 className="text-3xl mb-8 mr-8">Assign tasks to mechanics </h1>
      <Dialog/>
    </div>
    
    <div className="flex space-x-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map(column => (
          <div key={column.id} className="w-64">
            <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  className={`bg-gray-200 p-2 rounded ${
                    snapshot.isDraggingOver ? "bg-gray-300" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={`bg-white p-2 mb-2 rounded shadow ${
                            snapshot.isDragging ? "bg-green-200" : ""
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
    </>
  );
};

export default AssignTasks;
