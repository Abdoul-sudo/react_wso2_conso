import React from "react";
import { Link } from "react-router-dom";

const ListClientsComponent = (props) => {
  return (
    <div className="container">
      <Link to="/clients/add_personne">
        <h5 className="btn btn-primary">Ajouter</h5>
      </Link>

      <div className="table-responsive">
        <table className="table">
          <caption>Liste des clients</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Prenoms</th>
              <th scope="col">Contact</th>
              <th scope="col">CIN</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.clients ? (
              props.clients.map((client, index) => (
                <tr key={index}>
                  <th scope="row">{client.id}</th>
                  <td>{client.nom}</td>
                  <td>{client.prenom}</td>
                  <td>{client.contact}</td>
                  <td>{client.numeroCin}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <Link to={`/clients/edit_personne/${client.id}`}>
                        <button className="btn btn-primary">Editer</button>
                      </Link>
                      <button className="btn btn-danger" onClick={() => props.deleteFunction(client.id)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
};

export default ListClientsComponent;
