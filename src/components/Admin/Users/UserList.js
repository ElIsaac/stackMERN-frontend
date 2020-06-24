import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from 'antd';
import NoAvatar from '../../../assets/img/png/no-avatar.png'
import { traerUsuariosActivos } from '../../../api/usuarios'
import { EditOutlined, DeleteOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons'
import Modal from '../../Modal/Modal'
import EditUser from './EditUser'

export default function UserList(props) {
  const { userActive, userInactive } = props;
  const [viewUser, setViewUser] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState("")
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
            userInactive={userInactive} />
          : <Active
            setIsVisible={setIsVisible}
            userActive={userActive}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
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
  const Editar = (user) => {
    props.setIsVisible(true)
    props.setModalTitle(`Editar: ${user.nombre} ${user.apellidos}`)
    props.setModalContent(<EditUser user={user}/>)
  }
  return (
    <List
      className="container card-body bg-light"
      itemLayout="horizontal"
      dataSource={props.userActive}
      renderItem={user => (
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
              onClick={() => console.log("editar")}
            >
              <DeleteOutlined />
            </Button>,
            <Button
              type="danger"
              className="btn btn-danger"
              onClick={() => console.log("editar")}
            >
              <StopOutlined />
            </Button>

          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.nombre} ${user.apellidos}`}
            description={user.email}
          />
          <hr className="my-4" />
        </List.Item>
      )}


    />
  )
}

function NoActive(props) {
  return (
    <List
      className=""
      itemLayout="horizontal"
      dataSource={props.userInactive}
      renderItem={user => (
        <List.Item actions={[
          <Button
            type="primary"
            onClick={() => console.log("editar")}
          >
            <CheckOutlined />
          </Button>,
          <Button
            type="danger"
            className="btn btn-danger"
            onClick={() => console.log("editar")}
          >
            <DeleteOutlined />
          </Button>
        ]}>
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.nombre} ${user.apellidos}`}
            description={user.email}
          />
        </List.Item>
      )}


    />
  )
}