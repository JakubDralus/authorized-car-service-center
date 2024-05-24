import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Dialog from "./Dialog";
import { Mechanic, Task } from "./model";
import TaskColumn from "./TaskColumn";

// Define types for column and task

export type TaskColumnType = {
  id: string;
  title: string;
  mechanic?: Mechanic;
  tasks: Task[];
}

const availableTasks: TaskColumnType = {
  id: "column0",
  title: "Available tasks",
  tasks: [
    { id: "task0", content: "Task 0" }, 
    { id: "task1", content: "Task 1" }
  ]
}

// Predefined arrays for columns and tasks
const mechanicsTasks: TaskColumnType[] = [
  {
    id: "column1",
    title: "Mechanic 1",
    tasks: [
      { id: "task2", content: "Task 2" }, 
      { id: "task3", content: "Task 3" }
    ]
  },
  {
    id: "column2",
    title: "mechanic 2",
    tasks: [
      { id: "task4", content: "Task 4" }
    ]
  }
];

const AssignTasks = () => {

  // const availableTasks: TaskColumnType = //todo fetch from api

  const initialColumns: TaskColumnType[] = [availableTasks, ...mechanicsTasks];
  const [columns, setColumns] = useState<TaskColumnType[]>(initialColumns);

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
    console.log(columns[columnIndex].id); // id of mechanic
    // console.log(columnIndex);
  };

  return (
    <>
      <div className="flex">
        <h1 className="text-3xl mb-8 mr-8">Assign tasks to mechanics</h1>
        <Dialog />
      </div>

      <div className="flex space-x-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map(column => (
            <TaskColumn key={column.id} column={column} />
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default AssignTasks;
