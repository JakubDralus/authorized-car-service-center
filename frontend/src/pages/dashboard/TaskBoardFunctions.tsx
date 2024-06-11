import axiosInstance from "../../api/AxiosInstance";
import { ApiResponse, Assignment, AssignmentRead, Mechanic, TaskRead, TicketRead } from "../../api/model";
// import axiosInstance from "axiosInstance";

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
    const response = await axiosInstance.post("/assignments", payload);
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
    service: { serviceId: task.service?.serviceId },
    status: task.status
  };
  // console.log("payload:");
  // console.log(payload);

  try {
    await axiosInstance.put(`/assignments/${task.id}`, payload);
    // console.log('Assignment updated:', response.data);
    console.log('Assignment updated');
  } catch (error) {
    console.error('Error updating assignment:', error);
    throw error;
  }
};
export const updateTaskStatus = async (assignmentId: string, status: string): Promise<ApiResponse<Assignment>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Assignment>>(`/assignments/${assignmentId}/update-status/${status}`);
    console.log(`Task ${assignmentId} status updated to ${status}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${assignmentId} status:`, error);
    throw error;
  }
};
// Function to update ticket status
export const updateTicketStatus = async (ticketId: number, status: string) => {
  try {
    const response: ApiResponse<any> = await axiosInstance.put(`/tickets/${ticketId}`, { status });
    console.log(`Ticket ${ticketId} status updated to ${status}`);
    console.log(response);
  } 
  catch (error) {
    console.error(`Error updating ticket ${ticketId} status:`, error);
  }
};

export const fetchTickets = async (): Promise<ApiResponse<TicketRead[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<TicketRead[]>>( "/tickets/status/requested");
  console.log('ticket fetch');
  return data;
};

export const fetchMechanics = async (): Promise<ApiResponse<Mechanic[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<Mechanic[]>>( "/mechanics");
  console.log('mechanics fetch');
  return data;
};

export const fetchAssignments = async (): Promise<ApiResponse<AssignmentRead[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<AssignmentRead[]>>(`/assignments`);
  console.log('assignments fetch');
  return data;
};

export const fetchAssignment = async (id: string | number): Promise<ApiResponse<Assignment>> => {
  const { data } = await axiosInstance.get<ApiResponse<Assignment>>(`/assignments/${id}`);
  console.log(`assignment ${id} fetch`);
  // console.log(data);
  return data;
};

export const fetchAssignmentsByMechanic = async (token: string): Promise<ApiResponse<AssignmentRead[]>> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const { data } = await axiosInstance.get<ApiResponse<AssignmentRead[]>>(`/assignments/my-tasks`, config);
  console.log('assignments fetched for mechanic');
  return data;
};
