import React from "react";
import { Link } from "react-router-dom";


function ListCategoriesComponent(props) {
  // 
    return (
        <div className="container">
          <Link to="/categories/add_categorie">
            <h5 className="btn btn-primary">Ajouter</h5>
          </Link>
    
          <div className="table-responsive">
            <table className="table">
              <caption>Liste des catégories</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Tarif</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.categories ? (
                  props.categories.map((categorie, index) => (
                    <tr key={index}>
                      <th scope="row">{categorie.id}</th>
                      <td>{categorie.nom}</td>
                      <td>{categorie.tarif}</td>
                      <td>
                        <div className="d-flex gap-3">
                          <Link to={`/categories/edit_categorie/${categorie.id}`}>
                            <button className="btn btn-primary">Editer</button>
                          </Link>
                          <button className="btn btn-danger" onClick={() => props.deleteCategorie(categorie.id)}>
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
}

export default ListCategoriesComponent