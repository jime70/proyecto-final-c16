import React, { useState, useEffect, useContext } from 'react'
import ClientContext from '../../contexts/clients/ClientContext'

export default function Login(props) {

    const clientCtx = useContext(ClientContext)

    const { 
        loginClient,
        authStatus,
        verifyingToken
    } = clientCtx

    const [data, setData] = useState({
        email: "",
        password: ""
    })


    useEffect(() => {
        verifyingToken()

        if(authStatus){
            props.history.push("/perfil")
        }

    }, [authStatus])

    if(authStatus) return null   


    const handleChange = (event) => {

        setData({
            ...data,
            [event.target.name]: event.target.value
        })

    }

    const sendData = (event) => {
        
        event.preventDefault()
        loginClient(data)

    }


    return (
        <>
            <div>
                <div>
                    <div>
                        <h2>
                            Iniciar sesión
                        </h2>
                    </div>
                    <form onSubmit={(e) => { sendData(e) }}>
                        <input type="hidden" name="remember" value="true" />
                        <div>
                            <div>
                                <label for="email-address">Tu correo</label>
                                <input 
                                id="email-address" 
                                onChange={(e) => { handleChange(e) }}
                                name="email" type="email" autocomplete="email" required placeholder="Tu correo" />
                            </div>
                            <div>
                                <label for="password">Password</label>
                                
                                <input id="password" 
                                name="password" 
                                onChange={(e) => { handleChange(e) }}
                                type="password" autocomplete="current-password" 
                                required 
                                placeholder="Password" />
                            </div>
                        </div>


                        <div>
                            <button type="submit">
                                Comenzar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

