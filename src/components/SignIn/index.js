import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {notification} from 'antd';
import registrate from '../../api/registrate'

export default class Sign extends Component {

    state = {
        nombre: "",
        apellidos: '',
        email: "",
        contrasenia: '',
        confirmaContrasenia: ''
    }
    cleanForm=()=>{
        const inputs = document.getElementsByTagName('input')
        for(let i=0; i<inputs.length;i++){
            inputs[i].classList.remove("succes");
            inputs[i].classList.remove("remove");
        }
        this.setState({
            nombre: "",
            apellidos: '',
            email: "",
            contrasenia: '',
            confirmaContrasenia: ''
        })
    }
    
     
     onSubmit = async (e) => {
        e.preventDefault();
        
            const result = await registrate(this.state)
            if(result.ok===false){
                notification["error"]({
                    message: result.mensaje
                })
            }else{
                notification["success"]({
                    message: result.mensaje
                })
                this.cleanForm();
            }
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

                   
                    <div className="form-group">
                            <input type="text" className="form-control" 
                            placeholder="Nombre(s)" 
                            name="nombre" 
                            value={this.state.nombre}
                            onChange={this.onInputChange}
                            required />
                    </div>

                    <div className="form-group">
                            <input type="text" className="form-control" 
                            placeholder="Apellido(s)" 
                            name="apellidos" 
                            value={this.state.apellidos}
                            onChange={this.onInputChange}
                            required />
                    </div>

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

                    <div className="form-group">
                            <input type="password" className="form-control" 
                            placeholder="Confimre su contraseña" 
                            name="confirmaContrasenia" 
                            value={this.state.confirmaContrasenia}
                            onChange={this.onInputChange}
                            required />
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                            
                    </button>
                    </form>
                </div>
                
        )
    }
}
