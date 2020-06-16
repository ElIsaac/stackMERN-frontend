import config from './config'
export default function iniciaSesion(datos){
    return fetch(`http://${config.nombre}/api/${config.version}/inicia-sesion`, {

        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }

    }).then(response => {
        return response.json();

    } ).then(result =>{
        console.log(result)
        return result;
        
    }).catch((err)=>{

        return err.mensaje
        })
}
