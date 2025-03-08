import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ClientContext from "../contexts/clients/ClientContext";

export default function PrivateRoute({ component: Component }) {
  const clientCtx = useContext(ClientContext);
  const { authStatus, verifyingToken } = clientCtx;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      await verifyingToken();
      setLoading(false);
    };
    verifyToken();
  }, [authStatus]);

  if (loading) return null;

  return authStatus ? <Component /> : <Navigate replace to="/login" />;
}
