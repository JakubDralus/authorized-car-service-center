import axios from "axios";

export const fetchTicketServices = async () => {
    try {
        const response = await axios.get('http://localhost:8081/api/v1/services/ticket-services');
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}