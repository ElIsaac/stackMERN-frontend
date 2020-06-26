import React, { useState, useEffect } from 'react';
import { Button, Switch, Avatar,  Modal as ModalAntd, List, notification } from 'antd';
import { EditOutlined, DeleteOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons'

import NoAvatar from '../../../assets/img/png/no-avatar.png'
import { traerAvatar, borrarUsuario, autorizarUsuario } from '../../../api/usuarios'
import { obtenerToken } from '../../../api/auth'
import Modal from '../../Modal/Modal'
import EditUser from './EditUser'
import { changeConfirmLocale } from 'antd/lib/modal/locale';

const { confirm } = ModalAntd

export default function UserList(props) {
  const { userActive, userInactive, setReloadUsers } = props;
  const [viewUser, setViewUser] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState("")

  const Eliminar=(user)=>{
    const token = obtenerToken();
    confirm({
      title: "Eliminar usuario",
      content: "Esta seguro que desea eliminar al usuario '"+user.nombre+" "+user.apellidos+"'",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk(){
        
        borrarUsuario(token, user._id).then(response =>{
            notification["success"]({
            message:response
        }) 
        setReloadUsers(true)
        }).catch(err=>{
            notification["error"]({
              message:err
            })
      
        })
      }
      
    })

    
  }

  const autorizar=(user,activo)=>{
    const token = obtenerToken();
    autorizarUsuario(token, activo, user._id).then(response =>{
         notification["success"]({
          message:response
        }) 
        setReloadUsers(true)
    }).catch(err=>{
      notification["error"]({
        message:err
      })
      
    })
  }
  return (
    <div>
      <div className="container">
        <h1 className="display-4">{viewUser ? "Usuarios Inactivos" : "Usuarios Activos"}</h1>
        <Switch
          defaultChecked
          onChange={() => setViewUser(!viewUser)}
        />
        <hr className="my-4" />


        {viewUser
          ? <NoActive
          setReloadUsers={setReloadUsers}
          autorizar={autorizar}
            Eliminar={Eliminar}
            userInactive={userInactive} />
          : <Active
          setReloadUsers={setReloadUsers}
          autorizar={autorizar}
            Eliminar={Eliminar}
            setIsVisible={setIsVisible}
            userActive={userActive}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            setReloadUsers={setReloadUsers}
          />}


        <Modal
          title={modalTitle}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          
        >
          {modalContent}
        </Modal>
      </div>

    </div>

  )
}


function Active(props) {
  const {setModalContent, setModalTitle, Eliminar, autorizar, setReloadUsers, setIsVisible}=props;
  
  return (
    <List
      className="container card-body bg-light"
      itemLayout="horizontal"
      dataSource={props.userActive}
      renderItem={user => <UserActive Eliminar={Eliminar} setReloadUsers={setReloadUsers} autorizar={autorizar} setIsVisible={setIsVisible} setReloadUsers={setReloadUsers} setModalContent={setModalContent} setModalTitle={setModalTitle}  user={user}/>}


    />
  )
}

function UserActive(props){
  const {user, Eliminar, autorizar, setReloadUsers}=props;
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    if(user.avatar){
      traerAvatar(user.avatar).then(response =>{
        setAvatar(response)
      })
    }else{
      setAvatar(null)
    }
  }, [user])

  const Editar = (user) => {
    props.setIsVisible(true)
    props.setModalTitle(`Editar: ${user.nombre} ${user.apellidos} (${user._id})`)
    props.setModalContent(<EditUser user={user} setReloadUsers={setReloadUsers} setIsVisible={props.setIsVisible} />)
  }

  
   

  return(
    <List.Item
          actions={[
            <Button
              type="primary"
              className="btn btn-primary"
              onClick={() => Editar(user)}>
              <EditOutlined />
            </Button>,
            <Button
              type="danger"
              className="btn btn-danger"
              onClick={() => Eliminar(user) }
            >
              <DeleteOutlined />
            </Button>,
            <Button
              type="danger"
              className="btn btn-danger"
              onClick={() => autorizar(user, false)}
            >
              <StopOutlined />
            </Button>

          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
            title={`${user.nombre} ${user.apellidos}`}
            description={user.email}
          />
          <hr className="my-4" />
        </List.Item>
  )

}

function NoActive(props) {
  return (
    <List
      className=""
      itemLayout="horizontal"
      dataSource={props.userInactive}
      renderItem={user => ( <UserNoActive autorizar={props.autorizar} Eliminar={props.Eliminar} user={user}/> )}


    />
  )
}

function UserNoActive(props){
  const {user, autorizar}=props;
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    if(user.avatar){
      traerAvatar(user.avatar).then(response =>{
        setAvatar(response)
      })
    }else{
      setAvatar(null)
    }
  }, [user])

  return(
    <List.Item actions={[
      <Button
        type="primary"
        onClick={() => autorizar(user, true)}
      >
        <CheckOutlined />
      </Button>,
      <Button
        type="danger"
        className="btn btn-danger"
        onClick={() => props.Eliminar(user)}
      >
        <DeleteOutlined />
      </Button>
    ]}>
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.nombre} ${user.apellidos}`}
        description={user.email}
      />
    </List.Item>
  )

}