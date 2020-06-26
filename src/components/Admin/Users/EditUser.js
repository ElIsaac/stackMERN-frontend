import React, { useState, useCallback, useEffect } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { useDropzone } from 'react-dropzone';

import NoAvatar from '../../../assets/img/png/no-avatar.png';
import {traerAvatar, subirAvatar, actualizarUsuario} from '../../../api/usuarios';

import { obtenerToken } from '../../../api/auth';
import './EditUser.scss';

export default function EditUser(props) {

    
    
    const { user , setIsVisible, setReloadUsers} = props;
    const [avatar, setAvatar]=useState(user.avatar)
    const [userData, setUserData] = useState({nombre: user.nombre,
        apellidos:user.apellidos,
        email: user.email,
        contrasenia: "",
        confirmaContrasenia:"",
        rol: user.rol,
        avatar: user.avatar})
    
    useEffect(()=>{
        setUserData({
            nombre: user.nombre,
        apellidos:user.apellidos,
        email: user.email,
        contrasenia: "",
        confirmaContrasenia:"",
        rol: user.rol,
        avatar: user.avatar
        })
    }, [user])

    useEffect(() => {
        if(user.avatar){
            traerAvatar(user.avatar).then(response=>{
                setAvatar(response)
            })
        }else{
            setAvatar(null)
        }
    }, [user])

    useEffect(()=>{
        if(avatar){
            setUserData({...userData, avatar: avatar.file})
        }
    }, [avatar]) 
     
    
    return (
        <div>
                <SubirAvatar avatar={avatar} setAvatar={setAvatar} />
                <EditForm  
                user={user} setUserData={setUserData} 
                setReloadUsers={setReloadUsers}
                userData={userData} setIsVisible={setIsVisible}
                />
        </div>
    )
}
function SubirAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        if(avatar){
            if(avatar.preview){
                setAvatarUrl(avatar.preview)
            }else{
                setAvatarUrl(avatar)
            }
        }else{
            setAvatarUrl(null)
        }
    }, [avatar])

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    )
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });
    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                    <Avatar size={150} src={avatarUrl ? avatarUrl: NoAvatar} />
                )}
        </div>
    )
}

function EditForm(props){
    const { Option } = Select;
    const {setUserData, user, setIsVisible, setReloadUsers, userData}=props;
    const subir=(e)=>{
        e.preventDefault();
        const token = obtenerToken()
        let userUpdated = userData;

        
        if (userUpdated.contrasenia || userUpdated.confirmaContrasenia){
            if(userUpdated.contrasenia.legth < 4 ){
                notification["error"]({
                    message: "La contraseña debe de ser mayor a 4 caracteres."
                })
            }
            
            if(userUpdated.confirmaContrasenia !== userUpdated.confirmaContrasenia){
                notification["error"]({
                    message: "Las contraseñas no coinciden"
                })
                return;
            }
            
        }else{
            delete userUpdated.contrasenia
            delete userUpdated.confirmaContrasenia
        }

        if(!userUpdated.nombre || !userUpdated.apellidos || !userUpdated.email ){
            notification["error"]({
                message: "Debe de llenar todos los campos"
            })
            return;
        }
        if(typeof userUpdated.avatar === "object"){
            subirAvatar(token, userUpdated.avatar, user._id).then(response =>{
                userUpdated.avatar= response.avatarName;
                actualizarUsuario(token, userUpdated, user._id).then(result =>{
                    notification["success"]({
                        message:result.mensaje
                    });
                    setIsVisible(false);
                    setReloadUsers(true);
                });
            });
        }else{
            actualizarUsuario(token, userUpdated, user._id).then(result =>{
                const mensaje = result.mensaje;
                const mensajeSplit = mensaje.split(":")
                if(mensajeSplit[0] === "Error"){
                    notification["error"]({
                        message:result.mensaje
                    });
                }
                else{
                    notification["success"]({
                        message:result.mensaje
                    });
                }
                
                setIsVisible(false);
                setReloadUsers(true);
            });
        }
    }
    
    return(
        <Form className="edit-form" >
        
        <Row gutter={24}>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <Input type="text" className="form-control" 
                    name="nombre" onChange={e => setUserData({...userData, nombre:e.target.value})} id="nombre" value={userData.nombre} />
                </div>
            </Col>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos:</label>
                    <Input type="text" className="form-control" 
                    name="apellidos" onChange={e => setUserData({...userData, apellidos:e.target.value})} id="apellidos" value={userData.apellidos} />
                </div>
            </Col>

        </Row>
        <Row gutter={24}>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Input type="email" className="form-control" name="email" onChange={e => setUserData({...userData, email:e.target.value})} id="email" value={userData.email} />
                </div>
            </Col>
            
            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="contrasenia">Contraseña:</label>
                    <Input type="password" className="form-control" name="contrasenia" onChange={e => setUserData({...userData, contrasenia:e.target.value})} id="contrasenia" value={userData.contrasenia} />
                </div>
            </Col>

        </Row>
        <Row gutter={24}>
            <Col span={12}>
            <div className="form-group">
                <label htmlFor="rol">Seleccione un rol: </label> <br></br>
                <Select
                    className="form-control"
                    placeholder="seleccione un rol"
                    onChange={e => setUserData({...userData, rol:e})}
                    value={userData.rol}
                >
                    <Option value="admin">Administrador</Option>
                    <Option value="editor">Editor</Option>
                    <Option value="reviewr">Moderador</Option>
                </Select>
            </div>
            </Col>
            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="confirmaContrasenia">Confirme su contraseña:</label>
                    <Input type="password" className="form-control" name="confirmaContrasenia" onChange={e => setUserData({...userData, confirmaContrasenia:e.target.value})} id="confirmaContrasenia" value={userData.confirmaContrasenia} />
                </div>
            </Col>

        </Row>


        <Form.Item>
            <Button htmlType="submit" className="btn btn-block" onClick={subir} type="primary">Editar</Button>
        </Form.Item>
    </Form> 
    )
}
  