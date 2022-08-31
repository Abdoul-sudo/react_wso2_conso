import React from "react";
import { Link } from "react-router-dom";

const ListArticlesComponent = (props) => {
  return (
    <div className="container">
      <Link to="/articles/add_article">
        <h5 className="btn btn-primary">Ajouter</h5>
      </Link>

      <div className="table-responsive">
        <table className="table">
          <caption>Liste des articles de chambre</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Quantité</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.articles ? (
              props.articles.map((article, index) => (
                <tr key={index}>
                  <th scope="row">{article.id}</th>
                  <td>{article.nom}</td>
                  <td>{article.quantity}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <Link to={`/articles/edit_article/${article.id}`}>
                        <button className="btn btn-primary">Editer</button>
                      </Link>
                      <button className="btn btn-danger" onClick={() => props.deleteFunction(article.id)}>
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

export default ListArticlesComponent;
