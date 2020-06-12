import React, {useState} from 'react'
import {Layout} from 'antd'
import { Route, Switch } from 'react-router-dom'
import MenuTop from '../components/MenuTop'

import MenuSider from '../components/Admin/MenuSider'

import './LayoutAdmin.scss'

export default function LayoutAdmin(props) {
    const [menuCollapsed, setMenuCollapsed]=useState(true)
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed}/>
            <Layout style={{marginLeft: menuCollapsed ? "80px":"200px"}}>
                <Header>
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>
                    isaac xd
                </Footer>
            </Layout>
        </Layout>
    )
}

function LoadRoutes(props){
    const {routes}=props;
    return (
        <Switch>
            {
            routes.map((route, index)=>(
                <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
                />
            ))
        }
        </Switch>
    )
}
