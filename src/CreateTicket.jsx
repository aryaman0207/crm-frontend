import { useState } from "react";
import axios from "axios";

function CreateTicket({ onTicketCreated }) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tickets",
        form
      );

      alert("Ticket Created Successfully");

      setForm({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: ""
      });

      onTicketCreated();
    } catch (error) {
      console.error(error);
      alert("Error creating ticket");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Create New Ticket
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={(e) =>
            setForm({
              ...form,
              customer_name: e.target.value
            })
          }
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="email"
          placeholder="Customer Email"
          value={form.customer_email}
          onChange={(e) =>
            setForm({
              ...form,
              customer_email: e.target.value
            })
          }
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Issue Title"
          value={form.subject}
          onChange={(e) =>
            setForm({
              ...form,
              subject: e.target.value
            })
          }
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          placeholder="Issue Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value
            })
          }
          className="border p-2 rounded w-full"
          rows="4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>

      </form>
    </div>
  );
}

export default CreateTicket;