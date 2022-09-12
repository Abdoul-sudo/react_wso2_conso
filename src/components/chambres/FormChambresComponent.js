import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormChambresComponent(props) {
  let { id } = useParams(); // récupère l'id de la chambre par destructuring assignement (id passé par react-router-dom)

  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    numero: "",
    categorieId: "",
    articleId: "",
  });

  /**
   * @description Gère le forulaire
   * @details: Chaque imput a un name et une value, on récupère la value de l'input en fonction de son name
   * @param e : event
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData, "test");
  };

  // GET ARTICLES pour liste déroulante -------------------------------------------------------------------------------------------------------------------------
  const getArticles = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/articleSoa/_getselect`).then((result) => {
      setArticles(result.data.entries.entry);
    });
  };

  // GET CATEGORIES pour liste déroulante -------------------------------------------------------------------------------------------------------------------------
  const getCategories = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/categorieSoa/_getselect`).then((result) => {
      setCategories(result.data.entries.entry);
    });
  };

  // GET BY ID IF EDIT -------------------------------------------------------------------------------------------------------------------------
  const getchambreById = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/chambreSoa/_getbyid?id=${id}`).then((result) => {
      setFormData({ ...result.data.entries.entry[0], id: id });
      console.log("🚀 ~ file: FormChambresComponent.js ~ line 27 ~ getCategorieById ~ result", formData);
    });
  };

  useEffect(() => {
    // si Edit
    if (id) {
      getchambreById();
    }
    getCategories();
    getArticles();
  }, [id]);

  return (
    <div className="container">
      <form>
        <div className="form-group mt-2">
          <label>Numero</label>
          <input type="number" className="form-control" name="numero" value={formData.numero} onChange={(e) => handleChange(e)} placeholder="numero" />
        </div>
        <div className="form-group mt-2">
          <label>Categorie</label>
          <select
            className="form-select"
            name="categorieId"
            value={formData.categorieId || "DEFAULT"}
            onChange={(e) => {
              handleChange(e);
              console.log("val catId:", e.target.value);
            }}
          >
            <option value="DEFAULT" disabled>
              -Selectionnez catégorie-
            </option>
            {categories &&
              categories.map((categorie, index) => {
                return (
                  <option key={index} value={categorie.id}>
                    {categorie.nom}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group mt-2">
          <label>Article</label>
          <select
            className="form-select"
            name="articleId"
            value={formData.articleId || "DEFAULT"}
            onChange={(e) => {
              handleChange(e);
              console.log("val:", e.target.value);
            }}
          >
            <option value="DEFAULT" disabled>
              -Selectionnez article-
            </option>
            {articles &&
              articles.map((article, index) => {
                return (
                  <option key={index} value={article.id}>
                    {article.nom}
                  </option>
                );
              })}
          </select>
        </div>

        {/* Si Edit bouton = Modifier - Si Ajout bouton = Ajouter */}
        {id ? (
          <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.updateChambre(formData, id))}>
            Modifier
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.postChambre(formData))}>
            Ajouter
          </button>
        )}
      </form>
    </div>
  );
}

export default FormChambresComponent;
