import config from './config'
export default function registrate(datos){
    return fetch(`http://${config.nombre}/api/${config.version}/registrate`, {
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
