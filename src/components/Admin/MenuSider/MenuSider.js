import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd'
import {HomeOutlined, MenuOutlined, UserOutlined} from '@ant-design/icons'
import './MenuSider.scss'
function MenuSider(props) {
    console.log(props)
    return (
        <Layout.Sider className="admin-menu-sider" collapsed={props.menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.location.pathname]}>
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <HomeOutlined/>
                        <span className="nav-text">
                            home
                        </span>
                    </Link>
                </Menu.Item>
                
                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <UserOutlined/>
                        <span className="nav-text">
                            Usuarios
                        </span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
    }
    export default withRouter(MenuSider);