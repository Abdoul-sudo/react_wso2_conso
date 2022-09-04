import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Clients from "./pages/Clients";
<<<<<<< HEAD
import Categorie from "./pages/Categorie";
import Chambre from "./pages/Chambre";
import Reservation from "./pages/Reservation";
=======
import Articles from "./pages/Articles";
>>>>>>> ed174e601eb4f13fd70897d987a13219c2f7025e

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Clients ******************************************************************/}
        <Route index element={<Clients />} />
        <Route path="/clients/*" element={<Clients />} />
<<<<<<< HEAD
        <Route path="/categories/*" element={<Categorie />}/>
        <Route path="/chambres/*" element={<Chambre />}/>
        <Route path="/Reservations/*" element={<Reservation/>}/>
=======
        <Route path="/articles/*" element={<Articles />} />
>>>>>>> ed174e601eb4f13fd70897d987a13219c2f7025e
      </Routes>
    </Router>
  );
}

export default App;
