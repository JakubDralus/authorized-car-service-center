import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Dialog from "../../components/dashboard_components/Dialog";
import { ApiResponse, AssignmentRead, Mechanic, ServiceRead, Task, TicketRead } from "../../components/dashboard_components/model";
import TaskColumn from "../../components/dashboard_components/TaskColumn";
import axios from "axios";
import { useQuery } from "react-query";

// Define types for column and task
export type TaskColumnType = {
  id: string;
  title: string;
  mechanic?: Mechanic;
  tasks: any[]; // Task[]
}

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
      managerId: task.manager?.managerId ?? 1 //get manager id from logged manager
    },
    service: {
      serviceId: task.service?.serviceId
    }
  };
  // console.log(payload);
  
  try {
    const response = await axios.post("http://localhost:8081/api/v1/assignments", payload);
    console.log(response.data);
    return response;
  } 
  catch (error) {
    console.error('Error creating assignment:', error);
  }
};

// Function to update an existing assignment
const updateAssignment = async (task: Task) => {
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
      managerId: task.manager?.managerId ?? 1 //get manager id from logged manager
    },
    service: {
      serviceId: task.service?.serviceId
    }
  };
  // console.log(payload);

  try {
    await axios.put(`http://localhost:8081/api/v1/assignments/${task.id}`, payload);
    // console.log('Assignment updated:', response.data);
    console.log('Assignment updated');
  } catch (error) {
    console.error('Error updating assignment:', error);
    throw error;
  }
};

// Function to update ticket status
const updateTicketStatus = async (ticketId: number, status: string) => {
  try {
    const response: ApiResponse<any> = await axios.put(`http://localhost:8081/api/v1/tickets/${ticketId}`, { status });
    console.log(`Ticket ${ticketId} status updated to ${status}`);
    console.log(response);
  } 
  catch (error) {
    console.error(`Error updating ticket ${ticketId} status:`, error);
  }
};

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

const fetchAssignments = async (): Promise<ApiResponse<AssignmentRead[]>> => {
  const { data } = await axios.get<ApiResponse<AssignmentRead[]>>(`http://localhost:8081/api/v1/assignments`);
  console.log('assignments fetch');
  return data;
};

const AssignTasks = () => {
  
  const { data: responseTicketData, isLoading: isLoadingTickets, error: ticketError, refetch: refetchTickets } 
    = useQuery<ApiResponse<TicketRead[]>>("tickets", fetchTickets);

  const { data: responseMechanicsData, isLoading: isLoadingMechanics, error: mechanicsError, refetch: refetchMechanics } 
    = useQuery<ApiResponse<Mechanic[]>>("mechanics", fetchMechanics);

  const { data: responseAssignmentsData, refetch: refetchAssignments,  isLoading: isLoadingAssignments, error: assignmentsError } 
    = useQuery<ApiResponse<AssignmentRead[]>>("assignments", fetchAssignments);

  const [columns, setColumns] = useState<TaskColumnType[]>([]);

  useEffect(() => {
    if (responseMechanicsData && responseMechanicsData.data) {
      const mechanicsTasksMap: { [key: string]: Task[] } = {};
  
      // Initialize the map with empty arrays for each mechanic
      responseMechanicsData.data.forEach(mechanic => {
        mechanicsTasksMap[mechanic.mechanicId] = [];
      });
  
      // Populate the map with assignments
      if (responseAssignmentsData && responseAssignmentsData.data) {
        responseAssignmentsData.data.forEach((assignment) => {
          const mechanicId = assignment.mechanic.mechanicId;
          mechanicsTasksMap[mechanicId].push({
            id: `${assignment.assignmentId}`,
            description: assignment.description,
            startTime: new Date(assignment.startTime),
            endTime: new Date(assignment.endTime),
            ticket: assignment.ticket,
            manager: assignment.manager,
            mechanic: assignment.mechanic,
            service: assignment.service
          });
        });
      }
  
      // Create columns based on the populated map
      const newColumns: TaskColumnType[] = responseMechanicsData.data.map(mechanic => ({
        id: `column-${mechanic.mechanicId}`,
        title: mechanic.user.firstName + " " + mechanic.user.lastName,
        mechanic: mechanic,
        tasks: mechanicsTasksMap[mechanic.mechanicId]
      }));
  
      // Add the available tasks column if there are tickets
      const availableTasksColumn: TaskColumnType = {
        id: "column0",
        title: "Available tasks",
        tasks: responseTicketData && responseTicketData.data ? responseTicketData.data.reduce<Task[]>((acc: Task[], ticket: TicketRead) => {
          const tasksFromServices: Task[] = ticket.services.map((service: ServiceRead) => ({
            id: `ticket-${ticket.ticketId}-service-${service.serviceId}`,
            description: service.name,
            startTime: undefined,
            endTime: undefined,
            duration: service.estimatedRepairTime,
            ticket: ticket,
            manager: undefined,
            mechanic: undefined,
            service: service
          }));
          return acc.concat(tasksFromServices);
        }, []) : []
      };
  
      // Update the state with new columns
      setColumns([availableTasksColumn, ...newColumns]);
    }
  }, [responseMechanicsData, responseAssignmentsData, responseTicketData]);

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
      // Code for handling tasks moving between columns
      const sourceIndex = columns.findIndex(col => col.id === source.droppableId);
      const destIndex = columns.findIndex(col => col.id === destination.droppableId);
      // console.log('src index: ' + sourceIndex);
      // console.log('dest index: ' + destIndex);
      
      const sourceTasks = Array.from(columns[sourceIndex].tasks);
      const destTasks = Array.from(columns[destIndex].tasks);
  
      const [movedTask] = sourceTasks.splice(source.index, 1);
  
      if (destination.droppableId === "column0") {
        // If dropped to default column, remove mechanic assignment
        movedTask.startTime = undefined;
        movedTask.endTime = undefined;
        movedTask.mechanic = undefined;
      } 
      else {
        // If dropped to mechanic column, assign mechanic and update task
        const now = new Date();
        movedTask.startTime = now;
        if (movedTask.duration) movedTask.endTime = new Date(now.getTime() + movedTask.duration * 24 * 60 * 60 * 1000);
        movedTask.mechanic = columns[destIndex].mechanic;
        // console.log(movedTask);

        destTasks.splice(destination.index, 0, movedTask);

        // Check if the task was previously assigned to a different mechanic
        const previouslyAssigned: boolean = columns[sourceIndex].mechanic?.mechanicId !== undefined ;
        // console.log(previouslyAssigned);
        
        if (previouslyAssigned) {
          // Update existing assignment
          try {
            console.log('updating task');
            updateAssignment(movedTask);
          } 
          catch (error) {
            console.error('Error updating assignment:', error);
            sourceTasks.splice(source.index, 0, movedTask);
          }
        }

        // Update the columns
        let newColumns = [...columns];
        newColumns[sourceIndex].tasks = sourceTasks;
        newColumns[destIndex].tasks = destTasks;
        setColumns(newColumns);

        if (previouslyAssigned) return; // as the rest of logic is for first assignment
        
        // Check if all tasks from the ticket are assigned to any mechanic
        const ticketId = movedTask.ticket?.ticketId;
        const allTasksAssigned = ticketId && responseTicketData?.data?.find(ticket => ticket.ticketId === ticketId)?.services.every(service => {
          return newColumns.some(column => column.tasks.some(task => task.ticket?.ticketId === ticketId && task.service?.serviceId === service.serviceId && task.mechanic));
        });

        if (allTasksAssigned) {
          // If all tasks are assigned, send POST requests to create assignments for each task
          responseTicketData?.data
            ?.find(ticket => ticket.ticketId === ticketId)
            ?.services.forEach(service => {
              const task = newColumns.flatMap(column => column.tasks).find(task => task.ticket?.ticketId === ticketId && task.service?.serviceId === service.serviceId);
              if (task) {
                createAssignment(task).then(() => {
                  refetchAssignments().then(() => {
                    refetchTickets().then(() => {
                      // Update the columns
                      newColumns = [...columns];
                      newColumns[sourceIndex].tasks = sourceTasks;
                      newColumns[destIndex].tasks = destTasks;
                      setColumns(newColumns);
                    })
                  })
                })
              }
            });
        
          // Also, send PUT request to update ticket status to "PENDING"
          updateTicketStatus(ticketId, "PENDING") 
        }
      }
    }
  };

  const handleRefresh = () => {
    refetchTickets();
    refetchMechanics();
    refetchAssignments();
  };

  if (isLoadingTickets || isLoadingMechanics || isLoadingAssignments) {
    return <div>Loading...</div>;
  }

  if (ticketError || mechanicsError || assignmentsError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="flex">
        <h1 className="text-3xl mb-8 mr-8">Assign tasks to mechanics</h1>
        <Dialog />
        <button
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit flex ml-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          refresh
        </button>
      </div>

      <div className="flex space-x-4 ">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.length > 0 && <TaskColumn column={columns[0]} />}
          
          {columns.slice(1).map(column => (
            <TaskColumn key={column.id} column={column} />
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default AssignTasks;
