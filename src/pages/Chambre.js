import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ListChambresComponent from "../components/chambres/ListChambresComponent";
import FormChambresComponent from "../components/chambres/FormChambresComponent";

function Chambre() {
  let navigate = useNavigate();

  const [chambres, setChambres] = useState([]);
  const [isListVisible, setIsListVisible] = useState(true);
  // GET -------------------------------------------------------------------------------------------------------------------------
  const getChambres = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/chambreSoa/_getselect`).then((result) => {
      setChambres(result.data.entries.entry);
    });
  };

  // POST -------------------------------------------------------------------------------------------------------------------------
  const postChambre = (chambre) => {
    const params = new URLSearchParams();
    params.append("numero", chambre.numero);
    params.append("categorieId", chambre.categorieId);
    params.append("articleId", chambre.articleId);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_SERVER}/services/chambreSoa/_postinsert`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification Toastify couleur vert
        toast.success("chambre ajouté", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data et on retourne à la liste
        getChambres();
        navigate("/chambres");
      }
    });
  };

  // DELETE -------------------------------------------------------------------------------------------------------------------------
  const deleteChambre = (id) => {
    console.log(id);
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/chambreSoa/_deletedelete?id=${id}`).then((result) => {
      console.log(result);
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification Toastify couleur rouge
        toast.error("chambre supprimé", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getChambres();
      }
    });
  };

  // UPDATE -------------------------------------------------------------------------------------------------------------------------
  const updateChambre = (chambre) => {
    console.log("🚀 ~ file: chambre.js ~ line 77 ~ updatechambre ~ chambre", chambre);
    const params = new URLSearchParams();
    params.append("numero", chambre.numero);
    params.append("categorieId", chambre.categorieId);
    params.append("articleId", chambre.articleId);
    params.append("id", chambre.id);
    console.log("🚀 ~ file: chambre.js ~ line 82 ~ postChambre ~ params", params.toString());

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/services/chambreSoa/_putupdate`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification Toastify couleur jaune
        toast.warning("Chambre modifié", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data et on retourne à la liste
        getChambres();
        navigate("/chambres");
      }
    });
  };

  useEffect(() => {
    getChambres();
  }, []);
  return (
    <div>
      <ToastContainer /> {/* Tostify pour la notification */}
      {/* 
        @description ROUTES 
        @params :id => id de la chambre - on l'appelle avec useParams() dans le composant FormChambresComponent
      */}
      <Routes>
        <Route path="/" element={<ListChambresComponent chambres={chambres} deleteChambre={deleteChambre} />} />
        <Route path="/add_chambre" element={<FormChambresComponent postChambre={postChambre} />} />
        <Route path="/edit_chambre/:id" element={<FormChambresComponent updateChambre={updateChambre} />} />
      </Routes>
    </div>
  );
}

export default Chambre;
