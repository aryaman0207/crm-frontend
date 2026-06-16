import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketList from "./TicketList";
import TicketDetails from "./TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketList />} />
        <Route
          path="/ticket/:ticketId"
          element={<TicketDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
