import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAssignments } from "./TaskBoardFunctions";

const MechanicTasks: React.FC = () => {
  const { 
    data: responseAssignmentsData, 
    refetch: refetchAssignments,  
    isLoading: isLoadingAssignments, 
    error: assignmentsError 
  } = useQuery("assignments", fetchAssignments);

  if (isLoadingAssignments) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (assignmentsError) {
    return <div className="text-center mt-10 text-red-500">Error fetching assignments: </div>;
  }

  const assignments = responseAssignmentsData?.data || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <div key={assignment.ticket.ticketId} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold">{assignment.description}</h2>
            <p><strong>Status:</strong> {assignment.ticket.status}</p>
            <p><strong>Full Cost:</strong> {assignment.ticket.fullCost}</p>
            <p><strong>Created At:</strong> {new Date(assignment.ticket.createdAt).toLocaleString()}</p>
            <p><strong>Last Updated At:</strong> {new Date(assignment.ticket.lastUpdatedAt).toLocaleString()}</p>
            <div>
              <h3 className="text-lg font-medium mt-2">User:</h3>
              
            </div>
            <div>
              <h3 className="text-lg font-medium mt-2">Car:</h3>
              <p>{assignment.ticket.car.model}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mt-2">Service:</h3>
              <p>{assignment.service.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MechanicTasks;
