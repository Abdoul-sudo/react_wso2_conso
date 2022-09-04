import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ListReservationsComponents from "../components/reservations/ListReservationsComponent";
import FormReservationsComponent from "../components/reservations/FormReservationsComponent";

function Reservation() {
  let navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  // GET -------------------------------------------------------------------------------------------------------------------------
  const getreservations = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/reservationSoa/_getselect`).then((result) => {
      setReservations(result.data.entries.entry);
    });

  };

  // POST -------------------------------------------------------------------------------------------------------------------------
  const postReservation = (reservation) => {
    const params = new URLSearchParams();
    params.append("clientId", reservation.clientId);
    params.append("chambreId", reservation.chambreId);
    params.append("date", reservation.date);
    console.log("🚀 ~ file: Reservation.js ~ line 23 ~ postReservation ~ params", params.toString());

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_SERVER}/services/reservationSoa/_postinsert`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.success("chambre ajouté", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getreservations();
        navigate("/reservations");
      }
    });
  };

  // DELETE -------------------------------------------------------------------------------------------------------------------------
  const deleteReservation = (id) => {
    console.log(id)
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/reservationSoa/_deletedelete?id=${id}`).then((result) => {
      console.log(result)
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
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
        getreservations();
      }
    });
  };

    // UPDATE -------------------------------------------------------------------------------------------------------------------------
    const updateReservation= (reservation) => {
      console.log("🚀 ~ file: reservation.js ~ line 77 ~ updateReservation ~ chambre", reservation);
      const params = new URLSearchParams();
      params.append("clientId", reservation.clientId);
      params.append("chambreId", reservation.chambreId);
      params.append("date", reservation.date);
      params.append("id", reservation.id);
      console.log("🚀 ~ file: reservation.js ~ line 83 ~ postReservation ~ params", params.toString());
  
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_SERVER}/services/reservationSoa/_putupdate`,
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        data: params,
      }).then((result) => {
        if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
          // notification
          toast.warning("Reservation modifié", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
          // refresh data
          getreservations()
          navigate("/reservations");
        
        }
      });
    };


  useEffect(() => {
    getreservations();
  }, []);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ListReservationsComponents reservations={reservations} deleteReservation={deleteReservation}/>} />
        <Route path="/add_reservation" element={<FormReservationsComponent postReservation={postReservation} />} />
        <Route path="/edit_reservation/:id" element={<FormReservationsComponent updateReservation={updateReservation} />} />
      </Routes>

    </div>
  )
}

export default Reservation