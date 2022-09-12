import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItemComponent from "./ListItemComponent";

function ListChambresComponent(props) {
  return (
    <div className="container">
      {/*--- /chambres/add_chambre car route dans App.js stack avec celles dans pages/Chambre (route imbriquée) ---*/}
      <Link to="/chambres/add_chambre">
        <h5 className="btn btn-primary">Ajouter</h5>
      </Link>
      <div className="table-responsive">
        <table className="table">
          <caption>Liste des chambres</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Numero</th>
              <th scope="col">Categorie</th>
              <th scope="col">Article</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* S'il y des données => on affiche le tableau SINON on affiche aucune donnée */}
            {props.chambres ? (
              props.chambres.map((chambre, index) => {
                return (
                  <ListItemComponent key={index} chambre={chambre} deleteChambre={props.deleteChambre} /> // une ligne du tableau
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  <h4>Aucune donnée...</h4>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListChambresComponent;
