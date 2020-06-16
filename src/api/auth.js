import { nombre, version } from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants'
import jwtDecode from 'jwt-decode'

export  function obtenerToken(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    if(!accessToken || accessToken===false){
        return null
    }

    return decodificar(accessToken) ? null : accessToken;
}

export function obtenerRefreshToken(){
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)

    if(!refreshToken || refreshToken===false){
        return null
    }

    return decodificar(refreshToken) ? null : refreshToken;
}

function decodificar(token){
    const segundos = 60;
    const rawToken=jwtDecode(token);
    const {fechaExpiracion}=rawToken;
    const now = (Date.now() + segundos)/1000
    return now > fechaExpiracion;
}