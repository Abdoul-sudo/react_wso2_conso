import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ListCategoriesComponent from "../components/categories/ListCategoriesComponent";
import FormCategoriesComponent from "../components/categories/FormCategoriesComponent";

function Categorie() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // GET -------------------------------------------------------------------------------------------------------------------------
  const getCategories = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/categorieSoa/_getselect`).then((result) => {
      setCategories(result.data.entries.entry);

    });

  };

  // POST -------------------------------------------------------------------------------------------------------------------------
  const postCategorie = (categorie) => {
    const params = new URLSearchParams();
    params.append("nom", categorie.nom);
    params.append("tarif", categorie.tarif);
    console.log("🚀 ~ file: Clients.js ~ line 50 ~ postClient ~ params", params.toString());

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_SERVER}/services/categorieSoa/_postinsert`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.success("Categorie ajouté", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getCategories();
        navigate("/categories");
      }
    });
  };

  // DELETE -------------------------------------------------------------------------------------------------------------------------
  const deleteCategorie = (id) => {
    console.log(id)
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/categorieSoa/_deletedelete?id=${id}`).then((result) => {
      console.log(result)
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.error("Categorie supprimé", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getCategories();
      }
    });
  };

    // UPDATE -------------------------------------------------------------------------------------------------------------------------
    const updateCategorie= (categorie) => {
      console.log("🚀 ~ file: Categorie.js ~ line 77 ~ updateCategorie ~ categorie", categorie);
      const params = new URLSearchParams();
      params.append("nom", categorie.nom);
      params.append("tarif", categorie.tarif);
      params.append("id", categorie.id);
      console.log("🚀 ~ file: Categorie.js ~ line 82 ~ postCategorrie ~ params", params.toString());
  
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_SERVER}/services/categorieSoa/_putupdate`,
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        data: params,
      }).then((result) => {
        if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
          // notification
          toast.warning("Catégorie modifié", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
          // refresh data
          getCategories();
          navigate("/categories");
        }
      });
    };


  useEffect(() => {
    getCategories();
    console.log(categories)
  }, []);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ListCategoriesComponent categories={categories} deleteCategorie={deleteCategorie}/>} />
        <Route path="/add_categorie" element={<FormCategoriesComponent postCategorie={postCategorie} />} />
        <Route path="/edit_categorie/:id" element={<FormCategoriesComponent updateCategorie={updateCategorie} postCategorie={postCategorie} />} />
      </Routes>

    </div>
  )
}

export default Categorie