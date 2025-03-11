export default (globalState, action) => {
    switch (action.type) {
      case "OBTENER_ARTICLES":
        return {
          ...globalState,
          articles: action.payload,
        };
  
      case "OBTENER_ARTICLE":
        return {
          ...globalState,
          currentArticle: action.payload,
        };
  
      default:
        return globalState;
    }
  };
  