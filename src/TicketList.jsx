import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateTicket from "./CreateTicket";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const loadTickets = async () => {
    try {
      const response = await axios.get(
        `https://customer-support-backend-cmk4.onrender.com/api/tickets?search=${search}&status=${status}`
      );

      setTickets(response.data);
    } catch (error) {
      console.error("Error loading tickets:", error);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [search, status]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-6">
        Customer Support Ticket System
      </h1>

      <CreateTicket onTicketCreated={loadTickets} />

      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4">

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

      </div>

      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Ticket ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4"
                >
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket.ticket_id}
                  className="border-t"
                >
                  <td className="p-3">
                    <Link
                      to={`/ticket/${ticket.ticket_id}`}
                      className="text-blue-600 underline"
                    >
                      {ticket.ticket_id}
                    </Link>
                  </td>

                  <td className="p-3">
                    {ticket.customer_name}
                  </td>

                  <td className="p-3">
                    {ticket.customer_email}
                  </td>

                  <td className="p-3">
                    {ticket.subject}
                  </td>

                  <td className="p-3">
                    {ticket.status}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TicketList;