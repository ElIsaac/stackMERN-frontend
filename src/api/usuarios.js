import config from './config'
export function traerUsuarios(token){
    return fetch(`http://${config.nombre}/api/${config.version}/usuarios`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(res => {
        return res.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err.mensaje
        
    });
}

export function traerUsuariosActivos(token, esActivo){
    return fetch(`http://${config.nombre}/api/${config.version}/usuarios-activos?activo=${esActivo}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err.mensaje
        
    });
}

export function subirAvatar(token, avatar, userId){

    const formData= new FormData();
    formData.append("avatar", avatar, avatar.name)

    return fetch(`http://${config.nombre}/api/${config.version}/subir-avatar/${userId}`, {
        method: 'PUT',
        body: formData,
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err.mensaje
        
    });
}

export function traerAvatar(avatarName){

    return fetch(`http://${config.nombre}/api/${config.version}/traer-avatar/${avatarName}`)
    .then(response => {
        return response.url;
    } ).catch((err)=>{
        return  err.mensaje
        
    });
}

export function actualizarUsuario(token, user, userId){
    return fetch(`http://${config.nombre}/api/${config.version}/actualizar-usuario/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result
    }).catch((err)=>{
        return  err.mensaje
    })
        
}

export function borrarUsuario(token, userId){
    return fetch(`http://${config.nombre}/api/${config.version}/borrar-usuario/${userId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(response => {
        return response.json();
    } ).then(result =>{
        return result.mensaje
    }).catch((err)=>{
        return  err.mensaje
    })
        
}

export function autorizarUsuario(token, status, userId){
    const url = `http://${config.nombre}/api/${config.version}/autorizar/${userId}`;
    const params = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            activo: status
        })
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    } ).then(result =>{
        return result.mensaje
    }).catch((err)=>{
        return  err.mensaje
    })
        
}

export function registrateAdmin(datos){
    return fetch(`http://${config.nombre}/api/${config.version}/registrate/administrador`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    } ).then(result =>{
        if(result.mensaje==='usuario guardado'){
            return {
                ok: true,
                mensaje: result.mensaje
            }
        }
        return {
            ok: false,
            mensaje: result.mensaje
        }
    }).catch((err)=>{
        return {
            ok: false,
            mensaje: err.mensaje
        }
    });
}