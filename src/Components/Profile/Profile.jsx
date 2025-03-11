import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../../contexts/clients/ClientContext";
import AlertContext from "../../contexts/Alert/AlertContext";
import { Container, Typography, Paper, Box } from "@mui/material";

const Profile = () => {
  const alertCtx = useContext(AlertContext);
  const { setShowOn} = alertCtx;
  
  const { client, authStatus, verifyingToken } = useContext(ClientContext);
  const { clientSubmitForm } = ClientContext;
  const navigate = useNavigate();

  useEffect(() => {
    verifyingToken();

    if (!authStatus) {
      navigate("/login"); // 🔹 Redirige si el usuario NO está autenticado
    }
  }, [authStatus, navigate]);

  const { name, lastname, email, country, address, zipcode, receipts } =
    userCtx.currentUser;

  const [clientForm, setClientForm] = useState({
    name: "",
    lastname: "",
    email: "",
    country: "",
    address: "",
    zipcode: "",
  });

  useEffect(() => {
    const updateData = () => {
      return setClientForm({
        ...clientForm,
        name,
        lastname,
        email,
        country,
        address,
        zipcode,
      });
    };

    updateData();
  }, []);

  const handleChange = async (event) => {
    setClientForm({
      ...clientForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();

    await clientSubmitForm(clientForm);

    setShowOn({
      show: true,
      msg: "Usuario actualizado",
      cta: "Cerrar",
      ctaURL: "/profile",
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "4rem" }}>
      <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h3" gutterBottom color="primary">
          Bienvenido a tu perfil
        </Typography>

        {client ? (
          <Box>
            <Typography variant="h5">Bienvenido, {client.name}!</Typography>
            <Typography>Email: {client.email}</Typography>
            <Typography>Usuario: {client.username}</Typography>
          </Box>
        ) : (
          <Typography>Cargando datos...</Typography>
        )}
      </Paper>
    </Container>
  )
{/* <div className="mx-auto py-4 px-8">
<div className="space-y-16 ">
  <section>
    <form
      onSubmit={(e) => {
        sendData(e);
      }}
    >
      <div className="">
        <div className="px-4">
          <div>
            <h2 className="text-3xl font-bold mt-8">Tu perfil</h2>
            <p className="mt-2 mb-8 text-sm">
              Recuerda que estás en un proyecto académico. No coloques
              información real. 😉
            </p>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-6">
            <div className="col-span-4 sm:col-span-2">
              <label className="form-label">Tu nombre</label>
              <input
                type="text"
                name="name"
                value={userForm.name}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-input"
              />
            </div>

            <div className="col-span-4 sm:col-span-2">
              <label className="form-label">Tu apellido</label>
              <input
                type="text"
                name="lastname"
                value={userForm.lastname}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-input"
              />
            </div>

            <div className="col-span-4 sm:col-span-2">
              <label className="form-label">Tu email</label>
              <input
                disabled
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-input"
              />
            </div>

            <div className="col-span-4 sm:col-span-2">
              <label className="form-label">Tu país</label>
              <input
                type="text"
                name="country"
                value={userForm.country}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-input"
              />
            </div>

            <div className="col-span-4 sm:col-span-1">
              <label className="form-label">
                <span>Código postal</span>
              </label>
              <input
                type="number"
                name="zipcode"
                value={userForm.zipcode}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-input"
              />
            </div>

            <div className="col-span-4 sm:col-span-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                name="address"
                value={userForm.address}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-input"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 px-4 py-3">
          <button type="submit" className="form-button w-auto">
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  </section>

  <section>
    <div className="px-4">
      <h2 className="text-3xl font-bold mt-8">Historial de Pagos</h2>
    </div>
    <div className="flex flex-col mt-8  inline-block">
      <div className="py-4 px-4 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="table-head">Fecha</th>
              <th className="table-head">ID Recibo</th>
              <th className="table-head">Cantidada pagada</th>
              <th className=" table-head">Enlace a recibo</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((e) => {
              return (
                <tr key={e.receiptID}>
                  <td className="billing-text-row">
                    <time dateTime={e.date_created}>
                      {new Date(e.date_created * 1000).toLocaleString()}
                    </time>
                  </td>
                  <td className="billing-text-row underline">
                    <a
                      href={e.receiptURL}
                      target="_blank"
                      className="text-brand-light-purple"
                      rel="noreferrer"
                    >
                      Ver recibo
                    </a>
                  </td>
                  <td className="billing-text-row">{e.receiptID}</td>
                  <td className="billing-text-row">
                    $ {(e.amount / 100).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </section>
</div>
</div> */} 
  
};

export default Profile;
