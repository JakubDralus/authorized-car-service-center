
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

interface Address {
  addressId: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface User {
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
  username: string;
  email: string;
}


type Role = 'Admin' | 'User' | 'Mechanic' | 'Manager' | 'Accountant';

export enum Status {
  REQUESTED, // waiting for approval from manager
  PENDING,   // approved scheduled for work
  DOING,     // working on the car
  DONE,      // done working
  CLOSED,    // user picked up the car
}

// export interface Ticket {
// }

// TicketRead interface
export interface TicketRead {
  ticketId: number;
  description: string;
  fullCost: number;
  status: Status;
  createdAt: string; // Assuming LocalDateTime will be in ISO format
  lastUpdatedAt: string; // Assuming LocalDateTime will be in ISO format
  user: UserRead;
  car: CarRead;
  services: Service[];
}

// AssignmentDTO
export interface Task {
  id: string;
  description: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  ticket?: TicketRead;
  manager?: Manager;
  mechanic?: Mechanic | null; 
};

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