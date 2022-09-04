import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReservationItemComponent from "./ReservationItemComponent";

function ListReservationsComponents(props) {
  return (
    <div className="container">
      <Link to="/reservations/add_reservation">
        <h5 className="btn btn-primary">Ajouter</h5>
      </Link>
      <div className="table-responsive">
        <table className="table">
          <caption>Liste des reservations</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Client</th>
              <th scope="col">Chambre</th>
              <th scope="col">Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.reservations ?
              (
                props.reservations.map((reservation, index) => {
                  return (
                    <ReservationItemComponent key={index} reservation={reservation} deleteReservation={props.deleteReservation}/>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    <h4>Aucune donnée...</h4>
                  </td>
                </tr>)

            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListReservationsComponents