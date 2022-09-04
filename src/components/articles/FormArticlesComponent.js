import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormClientsComponent = (props) => {
  let { id } = useParams();

  const [formData, setFormData] = useState({
    nom: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GET BY ID IF EDIT -------------------------------------------------------------------------------------------------------------------------
  const getArticleById = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/articleSoa/_getbyid?id=${id}`).then((result) => {
      setFormData({ ...result.data.entries.entry[0], id: id });
      console.log("🚀 ~ file: FormClientsComponent.js ~ line 27 ~ getArticleById ~ result", formData);
    });
  };

  useEffect(() => {
    if (id) {
      getArticleById();
    }
  }, [id]);
  // -------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="container">
      <form>
        <div className="form-group mt-2">
          <label>Nom</label>
          <input type="text" className="form-control" name="nom" value={formData.nom} onChange={(e) => handleChange(e)} placeholder="Nom" />
        </div>
        <div className="form-group mt-2">
          <label>CIN</label>
          <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={(e) => handleChange(e)} placeholder="Quantité" />
        </div>

        {id ? (
          <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.updateFunction(formData, id))}>
            Modifier
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mt-3" onClick={(e) => (e.preventDefault(), props.postFunction(formData))}>
            Ajouter
          </button>
        )}
      </form>
    </div>
  );
};

export default FormClientsComponent;
