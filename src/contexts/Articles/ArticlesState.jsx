import { useReducer } from "react";

import ArticleReducer from "./ArticleReducer";
import ArticleContext from "./ArticleContext";
import clienteAxios from "../../config/axios";

const ArticleState = (props) => {
  const initialState = {
    articles: [],
    currentArticle: {
      _id: null,
      idProd: "",
      name: "",
      img: [],
      price: [],
      description: "",
    },
  };

  const [globalState, dispatch] = useReducer(ArticleReducer, initialState);

  const getArticles = async () => {
    const res = await clienteAxios.get("/articles/readall");

    const articles = res.data.data;

    dispatch({
      type: "OBTENER_ARTICULOS",
      payload: articles,
    });
  };

  const getArticle = async (id) => {
    try {
      const res = await clienteAxios.get(`/articles/readone/${id}`);

      dispatch({
        type: "OBTENER_ARTICULO",
        payload: res.data.data,
      });
    } catch (error) {
      return;
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        articles: globalState.articles,
        currentArticle: globalState.currentArticle,
        getArticle,
        getArticles,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleState;
