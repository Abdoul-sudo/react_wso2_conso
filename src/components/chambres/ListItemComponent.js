import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListItemComponent(props) {
  const [categorie, setCategorie] = useState();
  const [article, setArticle] = useState();
  const findCategorie = (id) => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/categorieSoa/_getbyid?id=${id}`).then((result) => {
      setCategorie(result.data.entries.entry[0].nom);
    });
  };

  const findArticle = (id) => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/articleSoa/_getbyid?id=${id}`).then((result) => {
      setArticle(result.data.entries.entry[0].nom);
    });
  };
  findCategorie(props.chambre.categorieId);
  findArticle(props.chambre.articleId);

  return (
    <>
      <tr>
        <th scope="row">{props.chambre.id}</th>
        <td>{props.chambre.numero}</td>
        <td>{categorie}</td>
        <td>{article}</td>
        <td>
          <div className="d-flex gap-3">
            <Link to={`/chambres/edit_chambre/${props.chambre.id}`}>
              <button className="btn btn-primary">Editer</button>
            </Link>
            {/* Au click de suppression, on execute la fonction dans pages/Chambre via props event */}
            <button className="btn btn-danger" onClick={() => props.deleteChambre(props.chambre.id)}>
              Supprimer
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ListItemComponent;
