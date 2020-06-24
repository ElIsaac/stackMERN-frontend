import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, Form, Input, Select, Button, Row, Col } from 'antd'
import { useDropzone } from 'react-dropzone'
import NoAvatar from '../../../assets/img/png/no-avatar.png'

import './EditUser.scss'

export default function EditUser(props) {

    
    
    const { user } = props;
    const [avatar, setAvatar]=useState(user.avatar)
    const [userData, setUserData] = useState({
        nombre: user.nombre,
        apellidos:user.apellidos,
        email: user.email,
        contrasenia: "",
        confirmaContrasenia:"",
        rol: user.rol,
        avatar: user.avatar
    })
    

    

    useEffect(()=>{
        if(avatar){
            setUserData({...setUserData,avatar})
        }
    }, [avatar]) 
     
    
    return (
        <div>
                <SubirAvatar avatar={avatar} setAvatar={setAvatar} />
                <EditForm  
                user={user} setUserData={setUserData} 
                userData={userData}
                />
        </div>
    )
}
function SubirAvatar(props) {
    const { avatar, setAvatar } = props;
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
                    <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
                )}
        </div>
    )
}

function EditForm(props){
    const { Option } = Select;
    const {setUserData, userData, user}=props;
    const subir=(e)=>{
        e.preventDefault();
        console.log(userData);
    }
    
    return(
        <Form className="edit-form" >
        
        <Row gutter={24}>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <Input type="text" className="form-control" 
                    name="nombre" onChange={e => setUserData({...userData, nombre:e.target.value})} id="nombre" defaultValue={userData.nombre} />
                </div>
            </Col>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos:</label>
                    <Input type="text" className="form-control" 
                    name="apellidos" onChange={e => setUserData({...userData, apellidos:e.target.value})} id="apellidos" defaultValue={userData.apellidos} />
                </div>
            </Col>

        </Row>
        <Row gutter={24}>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Input type="email" className="form-control" name="email" onChange={e => setUserData({...userData, email:e.target.value})} id="email" defaultValue={userData.email} />
                </div>
            </Col>
            
            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="contrasenia">Contraseña:</label>
                    <Input type="password" className="form-control" name="contrasenia" onChange={e => setUserData({...userData, contrasenia:e.target.value})} id="contrasenia" defaultValue={userData.contrasenia} />
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
                    defaultValue={userData.rol}
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
                    <Input type="password" className="form-control" name="confirmaContrasenia" onChange={e => setUserData({...userData, confirmaContrasenia:e.target.value})} id="confirmaContrasenia" defaultValue={userData.confirmaContrasenia} />
                </div>
            </Col>

        </Row>


        <Form.Item>
            <Button htmlType="submit" className="btn btn-block" onClick={subir} type="primary">Editar</Button>
        </Form.Item>
    </Form> 
    )
}
  /* 
   <Form className="edit-form" onSubmit={subir}>
        <Row gutter={24}>

            <Col span={12}>
                <Form.Item>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <Input type="text" className="form-control" 
                    name="nombre" onChange={e => setUserData({...userData, nombre:e.target.value})} id="nombre" defaultValue={userData.nombre} />
                </div>
                </Form.Item>
            </Col>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos:</label>
                    <Input type="text" className="form-control" 
                    name="apellidos" onChange={e => setUserData({...userData, apellidos:e.target.value})} id="apellidos" defaultValue={userData.apellidos} />
                </div>
            </Col>

        </Row>
        <Row gutter={24}>

            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Input type="email" className="form-control" name="email" onChange={e => setUserData({...userData, email:e.target.value})} id="email" defaultValue={userData.email} />
                </div>
            </Col>
            
            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="contrasenia">Contraseña:</label>
                    <Input type="password" className="form-control" name="contrasenia" onChange={e => setUserData({...userData, contrasenia:e.target.value})} id="contrasenia" defaultValue={userData.contrasenia} />
                </div>
            </Col>

        </Row>
        <Row gutter={24}>
            <Col span={12}>
            <div className="form-group">
                <label htmlFor="rol">Seleccione un rol: </label> <br></br>
                <Select
                    placeholder="seleccione un rol"
                    onChange={e => setUserData({...userData, rol:e})}
                    defaultValue={userData.rol}
                >
                    <Option value="admin">Administrador</Option>
                    <Option value="editor">Editor</Option>
                    <Option value="reviewr">Moderador</Option>
                </Select>
            </div>
            </Col>
            <Col span={12}>
                <div className="form-group">
                    <label htmlFor="confirmaContrasenia">Contraseña:</label>
                    <Input type="password" className="form-control" name="confirmaContrasenia" onChange={e => setUserData({...userData, confirmaContrasenia:e.target.value})} id="confirmaContrasenia" defaultValue={userData.confirmaContrasenia} />
                </div>
            </Col>

        </Row>


        <Form.Item>
            <Button htmlType="submit" className="btn btn-primary">Editar</Button>
        </Form.Item>
    </Form> 
  */
