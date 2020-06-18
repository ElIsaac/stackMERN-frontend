import React, { useEffect, createContext, useState } from 'react'
import {  refreshAccessToken,
    cerrarSesion,
    obtenerToken,
    obtenerRefreshToken  } from '../api/auth';
import jwtDecode from 'jwt-decode';


export const AuthContext = createContext();

export default function AuthProvider(props) {
    const { children }=props;
    const [user, setUser]=useState({
        user:null,
        isLoading:true
    });

    useEffect(()=>{
        checkUserLogin(setUser)
    }, [])
return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function checkUserLogin(setUser){
    const accessToken = obtenerToken()
    if(!accessToken){
        const refreshToken = obtenerRefreshToken()
        if(!refreshToken){
            cerrarSesion()
            setUser({
                user:null,
                isLoading:false
            })
        }else{
            refreshAccessToken(refreshToken)
        }
    }
    else{
        setUser({
            user:jwtDecode(accessToken),
            isLoading:false
        })
    }
    
}