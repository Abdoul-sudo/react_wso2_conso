import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormCategoriesComponent(props) {
  let { id } = useParams();

  const [formData, setFormData] = useState({
    nom: "",
    tarif: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GET BY ID IF EDIT -------------------------------------------------------------------------------------------------------------------------
  const getCategorieById = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/categorieSoa/_getbyid?id=${id}`).then((result) => {
      setFormData({ ...result.data.entries.entry[0], id: id });
      console.log("🚀 ~ file: FormCategoriesComponent.js ~ line 27 ~ getCategorieById ~ result", formData);
    });
  };

  useEffect(() => {
    if (id) {
      getCategorieById();
    }
  }, [id]);

  return (
    <div className="container">
      <form>
        <div className="form-group mt-2">
          <label>Nom catégorie</label>
          <input type="text" className="form-control" name="nom" value={formData.nom} onChange={(e) => handleChange(e)} placeholder="catégorie" />
        </div>
        <div className="form-group mt-2">
          <label>Tarif</label>
          <input type="number" className="form-control" name="tarif" value={formData.tarif} onChange={(e) => handleChange(e)} />
        </div>

        {id ? (
          <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.updateCategorie(formData, id))}>
            Modifier
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.postCategorie(formData))}>
            Ajouter
          </button>
        )}
      </form>
    </div>
  )
}

export default FormCategoriesComponent