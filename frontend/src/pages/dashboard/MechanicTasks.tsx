import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAssignmentsByMechanic } from "./TaskBoardFunctions";
import AssignmentDialog from "../../components/dashboard_components/mechanic_components/AssignmentDialog";
import { AssignmentRead, Status } from '../../api/model';

const MechanicTasks: React.FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [assignments, setAssignments] = useState<AssignmentRead[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const token = localStorage.getItem('token') as string;

  const {
    data: responseAssignmentsData, 
    refetch: refetchAssignments,  
    isLoading: isLoadingAssignments, 
    error: assignmentsError 
  } = useQuery("assignments", () => fetchAssignmentsByMechanic(token));

  useEffect(() => {
    if (responseAssignmentsData) {
      setAssignments(responseAssignmentsData.data);
    }
  }, [responseAssignmentsData]);

  useEffect(() => {
    refetchAssignments();
  },[open]);

  const handleOpen = (id: string) => {
    setSelectedTaskId(id);
    setOpen(true);
  };

  const handleFilterChange = (status: Status | null) => {
    setSelectedStatus(status);
  };

  const filteredAssignments = selectedStatus
    ? assignments.filter(assignment => assignment.status === selectedStatus)
    : assignments;

  if (isLoadingAssignments) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (assignmentsError) {
    return <div className="text-center mt-10 text-red-500">Error fetching assignments</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <div className="mb-4">
        <button
          onClick={() => handleFilterChange(null)}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 transition duration-300"
        >
          All
        </button>
        {Object.values(Status).map(status => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`mr-2 px-4 py-2 rounded-lg shadow-md transition duration-300
              ${selectedStatus === status ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}
              hover:bg-green-600 hover:text-white active:bg-green-700`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.assignmentId}
            className="p-4 border rounded-lg shadow-md bg-white transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => handleOpen(assignment.assignmentId)}
          >
            <h2 className="text-xl font-semibold">{assignment.service.name}</h2>
            <p><strong>Status:</strong> {assignment.status}</p>
            <p><strong>Full Cost:</strong> {assignment.ticket.fullCost}</p>
            <p><strong>Created At:</strong> {new Date(assignment.ticket.createdAt).toLocaleString()}</p>
            <p><strong>Last Updated At:</strong> {new Date(assignment.ticket.lastUpdatedAt).toLocaleString()}</p>

            <div>
              <h3 className="text-lg font-medium mt-2">Car:</h3>
              <p>{assignment.ticket.car.model}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mt-2">Description:</h3>
              <ul>
                <p>{assignment.description}</p>
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