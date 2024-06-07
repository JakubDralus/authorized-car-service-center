import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAssignments } from "./TaskBoardFunctions";
import AssignmentDialog from "../../components/dashboard_components/mechanic_components/AssignmentDialog";
import { AssignmentRead } from '../../api/model';

const MechanicTasks: React.FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [assignments, setAssignments] = useState<AssignmentRead[]>([]);

  const { 
    data: responseAssignmentsData, 
    refetch: refetchAssignments,  
    isLoading: isLoadingAssignments, 
    error: assignmentsError 
  } = useQuery("assignments", fetchAssignments);
  
  useEffect(() => {
    if (responseAssignmentsData) {
      setAssignments(responseAssignmentsData.data);
    }
  }, [responseAssignmentsData]);

  const handleOpen = (id: string) => {
    setSelectedTaskId(id);
    setOpen(true);
  };

  if (isLoadingAssignments) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (assignmentsError) {
    return <div className="text-center mt-10 text-red-500">Error fetching assignments</div>;
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <div key={assignment.assignmentId} 
          className="p-4 border rounded-lg shadow-md bg-white"
          >
            <button onClick={() =>handleOpen(assignment.assignmentId)}>Open Task Dialog</button>
            <h2 className="text-xl font-semibold">{assignment.description}</h2>
            <p><strong>Status:</strong> {assignment.ticket.status}</p>
            <p><strong>Full Cost:</strong> {assignment.ticket.fullCost}</p>
            <p><strong>Created At:</strong> {new Date(assignment.ticket.createdAt).toLocaleString()}</p>
            <p><strong>Last Updated At:</strong> {new Date(assignment.ticket.lastUpdatedAt).toLocaleString()}</p>
            
            <div>
              <h3 className="text-lg font-medium mt-2">Car:</h3>
              <p>{assignment.ticket.car.model}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mt-2">Services:</h3>
              <ul>
                {assignment.ticket.services.map((service, index) => (
                  <li key={index}>{service.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {selectedTaskId && (<AssignmentDialog taskId={selectedTaskId} open={open} setOpen={setOpen} />)}
        
      </div>
    </div>
  );
}

export default MechanicTasks;
