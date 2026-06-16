import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TicketDetails() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load Ticket
  const loadTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/${ticketId}`
      );

      setTicket(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  // Load Notes
  const loadNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/${ticketId}/notes`
      );

      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add Note
  const addNote = async () => {
    if (!newNote.trim()) {
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/tickets/${ticketId}/notes`,
        {
          note_text: newNote
        }
      );

      setNewNote("");

      loadNotes();

      alert("Note Added Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // Update Status
  const updateStatus = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${ticketId}`,
        {
          status
        }
      );

      alert("Status Updated");

      loadTicket();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTicket();
    loadNotes();
  }, []);

  if (!ticket) {
    return <h2 className="p-6">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <Link
        to="/"
        className="text-blue-600 underline"
      >
        ← Back to Tickets
      </Link>

      <h1 className="text-3xl font-bold my-6">
        Ticket Details
      </h1>

      <div className="bg-white shadow rounded p-6 mb-6">

        <p className="mb-2">
          <strong>Ticket ID:</strong> {ticket.ticket_id}
        </p>

        <p className="mb-2">
          <strong>Customer:</strong> {ticket.customer_name}
        </p>

        <p className="mb-2">
          <strong>Email:</strong> {ticket.customer_email}
        </p>

        <p className="mb-2">
          <strong>Subject:</strong> {ticket.subject}
        </p>

        <p className="mb-4">
          <strong>Description:</strong> {ticket.description}
        </p>

        <div className="flex items-center gap-4">

          <label className="font-bold">
            Status:
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Closed">
              Closed
            </option>
          </select>

          <button
            onClick={updateStatus}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Status
          </button>

        </div>

      </div>

      <div className="bg-white shadow rounded p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Add Note
        </h2>

        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
          className="border p-3 rounded w-full"
          rows="4"
        />

        <button
          onClick={addNote}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        >
          Add Note
        </button>

      </div>

      <div className="bg-white shadow rounded p-6">

        <h2 className="text-2xl font-bold mb-4">
          Notes History
        </h2>

        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border-b py-3"
            >
              <p>{note.note_text}</p>

              <small className="text-gray-500">
                {new Date(
                  note.created_at
                ).toLocaleString()}
              </small>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default TicketDetails;