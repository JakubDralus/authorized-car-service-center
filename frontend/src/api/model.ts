
export interface Manager {
  managerId: string;
  salary: number;
  user: User;
}

export interface Mechanic {
  mechanicId: number;
  specialization: string;
  salary: number;
  user: User;
}

export interface Address {
  addressId: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  email: string;
  createdAt: string; // ISO string format for dates
  role: Role;
  address: Address;
}

export interface UserRead {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}


type Role = 'Admin' | 'User' | 'Mechanic' | 'Manager' | 'Accountant';

export enum Status {
  REQUESTED = "REQUESTED",
  PENDING = "PENDING",
  DOING = "DOING",
  DONE = "DONE",
  CLOSED = "CLOSED"
}

export interface ReservedHours {
  date: Date;
  hour: string;
}

export interface Ticket {
  ticketId: number;
  description: string;
  fullCost: number;
  status: Status;
  createdAt: string;
  lastUpdatedAt: string;
  carReturnDate: ReservedHours;
  customer: User;
  car: Car;
  services: Service[];
}

// TicketRead interface
export interface TicketRead {
  ticketId: number;
  description: string;
  fullCost: number;
  status: Status;
  createdAt: string; // Assuming LocalDateTime will be in ISO format
  lastUpdatedAt: string; // Assuming LocalDateTime will be in ISO format
  carReturnDate: ReservedHours;
  customer: UserRead;
  car: CarRead;
  services: ServiceRead[];
}

// AssignmentReadDTO - send to backend
export interface TaskRead {
  id: string;
  description: string;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  duration?: number;
  ticket?: TicketRead;
  manager?: ManagerRead;
  mechanic?: MechanicRead | null ;
  service?: ServiceRead;
  status?: Status;
}

// full AssignmentDTO from backend
export interface Assignment {
  assignmentId: string;
  description: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  duration: number;
  ticket: Ticket;
  manager: Manager;
  mechanic: Mechanic;
  service: Service;
  status: Status;
}

// AssignmentReadDTO interface - from backend
export interface AssignmentRead {
  assignmentId: string;
  description: string;
  startTime: Date;
  endTime: Date;
  ticket: TicketRead;
  manager: ManagerRead;
  mechanic: MechanicRead;
  service: ServiceRead;
  status: Status;
}

export interface Car {
  carId: number;
  model: string;
  manufacturedYear: number;
  licensePlate: string;
  vin: string;
  color: string;
  mileage: number;
  owner: User;
}

export interface CarRead {
  carId: number;
  model: string;
  manufacturedYear: number;
  licensePlate: string;
}

export interface Service {
  serviceId: number;
  estimatedRepairTime: number;
  name: string;
  type: string;
  cost: number;
  isAvailable: boolean;
  isFeatured: boolean;
  photoBigKey?: string;
  photoSmallKey?: string;
}

export interface ApiResponse<T> {
  timeStamp: Date;
  status: number;
  success: boolean;
  message?: string;
  data: T;
}

// ManagerRead interface
export interface ManagerRead {
  managerId: string;
  salary: number;
  user: UserRead;
}

// MechanicRead interface
export interface MechanicRead {
  mechanicId: string;
  specialization: string;
  salary: number;
  user: UserRead;
}

// ServiceRead interface
export interface ServiceRead {
  serviceId: string;
  estimatedRepairTime: number;
  name: string;
  cost: number;
}
