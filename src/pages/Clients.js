import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import FormClientsComponent from "../components/FormClientsComponent";
import ListClientsComponent from "../components/ListClientsComponent";
import { ToastContainer, toast } from "react-toastify";

const Clients = () => {
  let navigate = useNavigate();

  const [clients, setClients] = useState([]);

  // GET -------------------------------------------------------------------------------------------------------------------------
  const getClients = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/clientSoa/_getselect`).then((result) => {
      setClients(result.data.entries.entry);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  // DELETE -------------------------------------------------------------------------------------------------------------------------
  const deleteClient = (id) => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/clientSoa/_deletedelete?id=${id}`).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.error("Client supprimé", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getClients();
      }
    });
  };

  // POST -------------------------------------------------------------------------------------------------------------------------
  const postClient = (client) => {
    const params = new URLSearchParams();
    params.append("nom", client.nom);
    params.append("prenom", client.prenom);
    params.append("contact", client.contact);
    params.append("numeroCin", client.numeroCin);
    console.log("🚀 ~ file: Clients.js ~ line 50 ~ postClient ~ params", params.toString());

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_SERVER}/services/clientSoa/_postinsert`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.success("Client ajouté", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getClients();
        navigate("/clients");
      }
    });
  };

  // UPDATE -------------------------------------------------------------------------------------------------------------------------
  const updateClient = (client) => {
    console.log("🚀 ~ file: Clients.js ~ line 81 ~ updateClient ~ client", client);
    const params = new URLSearchParams();
    params.append("nom", client.nom);
    params.append("prenom", client.prenom);
    params.append("contact", client.contact);
    params.append("numeroCin", client.numeroCin);
    params.append("id", client.id);
    console.log("🚀 ~ file: Clients.js ~ line 50 ~ postClient ~ params", params.toString());

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/services/clientSoa/_putupdate`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.warning("Client modifié", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getClients();
        navigate("/clients");
      }
    });
  };

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ListClientsComponent clients={clients} deleteFunction={deleteClient} />} />
        <Route path="/add_personne" element={<FormClientsComponent postFunction={postClient} />} />
        <Route path="/edit_personne/:id" element={<FormClientsComponent updateFunction={updateClient} />} />
      </Routes>
    </div>
  );
};

export default Clients;
