import React, { useState, useEffect } from 'react';
import {obtenerToken} from '../../../api/auth';
import {traerUsuariosActivos} from '../../../api/usuarios'
import UserList from '../../../components/Admin/Users/UserList'

export default function AdminUsers() {

    
    const [userActive, setUserActive] = useState([]);
    const [userInactive, setUserInactive] = useState([]);
    const token = obtenerToken();

    useEffect(() => {
        traerUsuariosActivos(token, true).then(response => {
            setUserActive(response);
        });
        traerUsuariosActivos(token, false).then(response => {
            setUserInactive(response);
        });
    }, [token])


    return (
        <div>
            <UserList userActive={userActive} userInactive={userInactive} />
        </div>
    )
}
