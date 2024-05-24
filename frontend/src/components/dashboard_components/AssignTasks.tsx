import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Dialog from "./Dialog";
import { ApiResponse, Mechanic, Service, Task, TicketRead } from "./model";
import TaskColumn from "./TaskColumn";
import axios from "axios";
import { useQuery } from "react-query";

// Define types for column and task
export type TaskColumnType = {
  id: string;
  title: string;
  mechanic?: Mechanic;
  tasks: Task[];
}

const fetchTickets = async (): Promise<ApiResponse<TicketRead[]>> => {
  const { data } = await axios.get<ApiResponse<TicketRead[]>>( "http://localhost:8081/api/v1/tickets/requested");
  console.log('ticket fetch');
  return data;
};

const fetchMechanics = async (): Promise<ApiResponse<Mechanic[]>> => {
  const { data } = await axios.get<ApiResponse<Mechanic[]>>( "http://localhost:8081/api/v1/mechanics");
  console.log('mechanics fetch');
  return data;
};

// Create an assignment/task for a mechanic
const createAssignment = async (task: Task) => {
  const payload = {
    description: task.description,
    startTime: task.startTime?.toISOString(),
    endTime: task.endTime?.toISOString(),
    ticket: {
      ticketId: task.ticket?.ticketId
    },
    mechanic: {
      mechanicId: task.mechanic?.mechanicId
    },
    manager: {
      managerId: task.manager?.managerId ?? 1 // TODO: get manager id from logged manager
    }
  };
  
  console.log(payload);
  
  try {
    const response = await axios.post("http://localhost:8081/api/v1/assignments", payload);
    console.log(response.data);
  } 
  catch (error) {
    console.error('Error creating assignment:', error);
  }
};

const AssignTasks = () => {

  const { data: responseTicketData, isLoading: isLoadingTickets, error: ticketError } 
    = useQuery<ApiResponse<TicketRead[]>>("tickets", fetchTickets);

  const { data: responseMechanicsData, isLoading: isLoadingMechanics, error: mechanicsError } 
    = useQuery<ApiResponse<Mechanic[]>>("mechanics", fetchMechanics);

  const [columns, setColumns] = useState<TaskColumnType[]>([]);

  useEffect(() => {
    if (responseTicketData && responseMechanicsData) {
      const availableTasks: TaskColumnType = {
        id: "column0",
        title: "Available tasks",
        tasks: responseTicketData.data.reduce<Task[]>((acc, ticket) => {
          // for every service in a ticket make a task obj
          const tasksFromServices: Task[] = ticket.services.map((service: Service) => ({
            id: `ticket-${ticket.ticketId}-service-${service.serviceId}`,
            description: service.name,
            duration: service.estimatedRepairTime,
            ticket: ticket
          }));
          return acc.concat(tasksFromServices);
        }, [])
      };

      // Create mechanic columns from fetched mechanics
      const mechanicColumns: TaskColumnType[] = responseMechanicsData.data.map(mechanic => ({
        id: `mechanic-column-${mechanic.mechanicId}`,
        title: mechanic.user.firstName + ' ' + mechanic.user.lastName,
        mechanic: mechanic,
        tasks: [] //TODO: fetch assignments for each mechanic 
      }));

      setColumns([availableTasks, ...mechanicColumns]);
      // console.log(availableTasks);
      // console.log(responseMechanicsData.data);
    }
  }, [responseTicketData, responseMechanicsData]);


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

      const [movedTask] = sourceTasks.splice(source.index, 1);

      // assigning a task to mechanic
      if (destination.droppableId === "column0") { // if dropped to default column
        movedTask.startTime = undefined;
        movedTask.endTime = undefined;
        movedTask.mechanic = undefined;
      }
      else {
        const now = new Date();
        movedTask.startTime = now;
        if (movedTask.duration) movedTask.endTime = new Date(now.getTime() + movedTask.duration * 24 * 60 * 60 * 1000); //days (for now)
        else movedTask.endTime = undefined;
        movedTask.mechanic = columns[destIndex].mechanic;
        console.log('mechanic ' + movedTask.mechanic?.user.email);
        // Send POST request to create assignment with this mechanic
        createAssignment(movedTask);
      }

      destTasks.splice(destination.index, 0, movedTask);

      const newColumns = [...columns];
      newColumns[sourceIndex].tasks = sourceTasks;
      newColumns[destIndex].tasks = destTasks;
      setColumns(newColumns);
    }

    const destIndex = columns.findIndex(col => col.id === destination.droppableId);
    console.log(columns[destIndex].id); // id of mechanic
    // console.log(columns)
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
