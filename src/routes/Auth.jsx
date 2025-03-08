import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ClientContext from "../contexts/clients/ClientContext";

export default function AuthRoute({ component: Component }) {
  const clientCtx = useContext(ClientContext);
  const { authStatus, verifyingToken } = clientCtx;

  useEffect(() => {
    verifyingToken();
  }, [authStatus]);

  return authStatus ? <Navigate replace to="/" /> : <Component />;
}
