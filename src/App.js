import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Clients from "./pages/Clients";
import Categorie from "./pages/Categorie";
import Chambre from "./pages/Chambre";
import Reservation from "./pages/Reservation";
import Articles from "./pages/Articles";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Clients ******************************************************************/}
        <Route index element={<Clients />} />
        <Route path="/clients/*" element={<Clients />} />
        <Route path="/categories/*" element={<Categorie />} />
        <Route path="/chambres/*" element={<Chambre />} />
        <Route path="/Reservations/*" element={<Reservation />} />
        <Route path="/articles/*" element={<Articles />} />
      </Routes>
    </Router>
  );
}

export default App;
