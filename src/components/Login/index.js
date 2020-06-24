import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {notification} from 'antd';
import iniciaSesion from '../../api/iniciaSesion'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants'

export default class Login extends Component {

    state = {
        email: "",
        contrasenia: ''
    }
    cleanForm=()=>{
        const inputs = document.getElementsByTagName('input')
        for(let i=0; i<inputs.length;i++){
            inputs[i].classList.remove("succes");
            inputs[i].classList.remove("remove");
        }
        this.setState({
            apellidos: '',
            email: ""
        })
    }
    
     
     onSubmit = async (e) => {
        e.preventDefault();
        
        const result = await iniciaSesion(this.state)
          if(result.mensaje){
            notification["error"]({
                message: result.mensaje
            })
        }else{
            const{ AccessToken, RefreshToken }= result;
            localStorage.setItem(ACCESS_TOKEN, AccessToken);
            localStorage.setItem(REFRESH_TOKEN, RefreshToken);

            notification["success"]({
                message: "Inicio de sesion correcto"
            })
            window.location.href="/admin"
        }  
        console.log(result); 
    }
       
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   

    render() {
        return (
                <div className="card card-body">
                    <h4>Registrate</h4>

                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                            <input type="email" className="form-control" 
                            placeholder="E-mail" 
                            name="email" 
                            value={this.state.email}
                            onChange={this.onInputChange}
                            required />
                    </div>
                    
                    <div className="form-group">
                            <input type="password" className="form-control" 
                            placeholder="Contraseña" 
                            name="contrasenia" 
                            value={this.state.contrasenia}
                            onChange={this.onInputChange}
                            required />
                    </div>

                    
                        <button type="submit" className="btn btn-primary">
                            Iniciar
                            
                    </button>
                    </form>
                </div>
                
        )
    }
}
