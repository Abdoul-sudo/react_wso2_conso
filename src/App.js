import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Clients from "./pages/Clients";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Clients ******************************************************************/}
        <Route index element={<Clients />} />
        <Route path="/clients/*" element={<Clients />} />
      </Routes>
    </Router>
  );
}

export default App;
