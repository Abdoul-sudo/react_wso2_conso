import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import FormArticlesComponent from "../components/articles/FormArticlesComponent";
import ListArticlesComponent from "../components/articles/ListArticlesComponent";
import { ToastContainer, toast } from "react-toastify";

const Articles = () => {
  let navigate = useNavigate();

  const [articles, setArticles] = useState([]);

  // GET -------------------------------------------------------------------------------------------------------------------------
  const getArticles = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/articleSoa/_getselect`).then((result) => {
      setArticles(result.data.entries.entry);
    });
  };

  useEffect(() => {
    getArticles();
  }, []);

  // DELETE -------------------------------------------------------------------------------------------------------------------------
  const deleteArticle = (id) => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/services/articleSoa/_deletedelete?id=${id}`).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.error("Article supprimé", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getArticles();
      }
    });
  };

  // POST -------------------------------------------------------------------------------------------------------------------------
  const postArticle = (article) => {
    const params = new URLSearchParams();
    params.append("nom", article.nom);
    params.append("quantity", article.quantity);
    console.log("🚀 ~ file: articles.js ~ line 50 ~ postArticle ~ params", params.toString());

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_SERVER}/services/articleSoa/_postinsert`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.success("Article ajouté", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getArticles();
        navigate("/articles");
      }
    });
  };

  // UPDATE -------------------------------------------------------------------------------------------------------------------------
  const updateArticle = (article) => {
    console.log("🚀 ~ file: articles.js ~ line 81 ~ updateArticle ~ article", article);
    const params = new URLSearchParams();
    params.append("nom", article.nom);
    params.append("quantity", article.quantity);
    params.append("id", article.id);
    console.log("🚀 ~ file: articles.js ~ line 50 ~ postArticle ~ params", params.toString());

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/services/articleSoa/_putupdate`,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      data: params,
    }).then((result) => {
      if (result.data.REQUEST_STATUS == "SUCCESSFUL") {
        // notification
        toast.warning("Article modifié", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // refresh data
        getArticles();
        navigate("/articles");
      }
    });
  };

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ListArticlesComponent articles={articles} deleteFunction={deleteArticle} />} />
        <Route path="/add_article" element={<FormArticlesComponent postFunction={postArticle} />} />
        <Route path="/edit_article/:id" element={<FormArticlesComponent updateFunction={updateArticle} />} />
      </Routes>
    </div>
  );
};

export default Articles;
