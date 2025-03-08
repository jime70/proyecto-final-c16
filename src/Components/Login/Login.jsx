import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ClientContext from "../../contexts/clients/ClientContext"

export default function Login() {

  const navigate = useNavigate();
  const ctx = useContext(ClientContext);

  const { authStatus, loginClient, verifyingToken } = ctx;

  const [logClient, setLogClient] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    setLogClient({
      ...logClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginClient(logClient);
    
    if (res) setErrorMsg(res);

    return;
  };

   useEffect(() => {
     verifyingToken();

     if (authStatus) {
       navigate('/profile');
     }
     return;
   }, [authStatus]);

  return (
    <>
      <section >
        <h2 >Iniciar sesión</h2>
        <p >
          ¿Aún sin cuenta? 
          <Link to="/register">

              Regístrate

          </Link>
        </p>
      </section>

      <section >
        <div>
          <form

            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <label htmlFor="email" >
                Tu correo electrónico
              </label>
              <div >
                <input
                  onChange={(evt) => {
                    handleChange(evt);
                  }}
                  name="email"
                  type="email"

                />
              </div>
            </div>

            <div>
              <label htmlFor="password" >
                Tu contraseña
              </label>
              <div >
                <input
                  onChange={(evt) => {
                    handleChange(evt);
                  }}
                  name="password"
                  type="password"

                />
              </div>
            </div>

            <div>
              <button type="submit" >
                Acceder a tu cuenta
              </button>
            </div>

            <div>
              <p >{errorMsg}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}


// import React, { useContext, useEffect, useState } from 'react';
// import UserContext from '../../contexts/users/UserContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const userCtx = useContext(UserContext);
//   const { loginUser, authStatus, verifyingToken } = userCtx;

//   const [data, setData] = useState({
//     email: '',
//     password: '',
//   });

//   useEffect(() => {
//     verifyingToken();

//     if (authStatus) {
//       navigate('/perfil');
//     }
//   }, [authStatus]);

//   if (authStatus) return null;

//   const handleChange = (event) => {
//     setData({
//       ...data,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const sendData = async (event) => {
//     event.preventDefault();
//     const resp = await loginUser(data);
//   };
//   return (
//     <>
//       <div>
//         <div>
//           <div>
//             <h2>Iniciar sesión</h2>
//           </div>
//           <form
//             onSubmit={e => {
//               sendData(e);
//             }}
//           >
//             <input type="hidden" name="remember" value="true" />
//             <div>
//               <div>
//                 <label for="email">tu email</label>
//                 <input
//                   id="email"
//                   onChange={e => {
//                     handleChange(e);
//                   }}
//                   name="email"
//                   type="email"
//                   required
//                   placeholder="correo@dominio"
//                 />
//               </div>
//               <div>
//                 <label for="password">Password</label>

//                 <input
//                   id="password"
//                   name="password"
//                   onChange={e => {
//                     handleChange(e);
//                   }}
//                   type="password"
//                   required

//                 />
//               </div>
//             </div>

//             <div>
//               <button type="submit">Comenzar</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
