import { ApiResponse, Assignment, AssignmentRead, Mechanic, TaskRead, TicketRead } from "../../api/model";
import axios from "axios";

// Create an assignment/task for a mechanic
export const createAssignment = async (task: TaskRead) => {
  const payload = {
    description: task.description,
    startTime: task?.startTime,
    endTime: task?.endTime,
    ticket: { ticketId: task.ticket?.ticketId },
    mechanic: { mechanicId: task.mechanic?.mechanicId },
    manager: { managerId: task.manager?.managerId ?? 1 }, //get manager id from logged manager
    service: { serviceId: task.service?.serviceId }
  };
  
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
export const updateAssignment = async (task: TaskRead) => {
  const payload = {
    description: task.description,
    startTime: task?.startTime,
    endTime: task?.endTime,
    ticket: { ticketId: task.ticket?.ticketId },
    mechanic: { mechanicId: task.mechanic?.mechanicId },
    manager: { managerId: task.manager?.managerId ?? 1 }, //get manager id from logged manager
    service: { serviceId: task.service?.serviceId }
  };
  // console.log("payload:");
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
export const updateTicketStatus = async (ticketId: number, status: string) => {
  try {
    const response: ApiResponse<any> = await axios.put(`http://localhost:8081/api/v1/tickets/${ticketId}`, { status });
    console.log(`Ticket ${ticketId} status updated to ${status}`);
    console.log(response);
  } 
  catch (error) {
    console.error(`Error updating ticket ${ticketId} status:`, error);
  }
};

export const fetchTickets = async (): Promise<ApiResponse<TicketRead[]>> => {
  const { data } = await axios.get<ApiResponse<TicketRead[]>>( "http://localhost:8081/api/v1/tickets/status/requested");
  console.log('ticket fetch');
  return data;
};

export const fetchMechanics = async (): Promise<ApiResponse<Mechanic[]>> => {
  const { data } = await axios.get<ApiResponse<Mechanic[]>>( "http://localhost:8081/api/v1/mechanics");
  console.log('mechanics fetch');
  return data;
};

export const fetchAssignments = async (): Promise<ApiResponse<AssignmentRead[]>> => {
  const { data } = await axios.get<ApiResponse<AssignmentRead[]>>(`http://localhost:8081/api/v1/assignments`);
  console.log('assignments fetch');
  return data;
};

export const fetchAssignment = async (id: string | number): Promise<ApiResponse<Assignment>> => {
  const { data } = await axios.get<ApiResponse<Assignment>>(`http://localhost:8081/api/v1/assignments/${id}`);
  console.log(`assignment ${id} fetch`);
  // console.log(data);
  return data;
};
