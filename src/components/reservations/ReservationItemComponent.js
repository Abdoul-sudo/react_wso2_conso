import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

function ReservationItemComponent(props) {
    const [client,setClient] = useState();
    const [chambre,setChambre] = useState();

    const findClient = (id) => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/services/clientSoa/_getbyid?id=${id}`).then((result) => {
            setClient(result.data.entries.entry[0].nom)
          });
    }

    const findChambre = (id) =>{
        axios.get(`${process.env.REACT_APP_API_SERVER}/services/chambreSoa/_getbyid?id=${id}`).then((result) => {
            setChambre(result.data.entries.entry[0].numero)
          });
    }
    findClient(props.reservation.clientId)
    findChambre(props.reservation.chambreId)

    return (
        <>
            <tr>
                <th scope="row">{props.reservation.id}</th>
                <td>{client}</td>
                <td>{chambre}</td>
                <td>{props.reservation.date}</td>
                <td>
                    <div className="d-flex gap-3">
                        <Link to={`/reservations/edit_reservation/${props.reservation.id}`}>
                            <button className="btn btn-primary">Editer</button>
                        </Link>
                        <button className="btn btn-danger" onClick={() => props.deleteReservation(props.reservation.id)}>
                            Supprimer
                        </button>
                    </div>
                </td>
            </tr>

        </>
    )
}

export default ReservationItemComponent