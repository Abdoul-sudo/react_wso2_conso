import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormClientsComponent = (props) => {
  let { id } = useParams();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    contact: "",
    numeroCin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GET BY ID IF EDIT -------------------------------------------------------------------------------------------------------------------------
  const getClientById = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/clientSoa/_getgetbyid?id=${id}`).then((result) => {
      setFormData({ ...result.data.entries.entry[0], id: id });
      console.log("🚀 ~ file: FormClientsComponent.js ~ line 27 ~ getClientById ~ result", formData);
    });
  };

  useEffect(() => {
    if (id) {
      getClientById();
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
          <label>Prénoms</label>
          <input type="text" className="form-control" name="prenom" value={formData.prenom} onChange={(e) => handleChange(e)} placeholder="Prénoms" />
        </div>
        <div className="form-group mt-2">
          <label>CIN</label>
          <input type="number" className="form-control" name="numeroCin" value={formData.numeroCin} onChange={(e) => handleChange(e)} placeholder="CIN" />
        </div>
        <div className="form-group mt-2">
          <label>Telephone</label>
          <input type="number" className="form-control" name="contact" value={formData.contact} onChange={(e) => handleChange(e)} placeholder="03........" />
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
