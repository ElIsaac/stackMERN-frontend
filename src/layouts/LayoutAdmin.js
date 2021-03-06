import React, {useState} from 'react';
import {Layout} from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

import useAuth from '../hooks/useAuth'
import MenuTop from '../components/MenuTop';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import MenuSider from '../components/Admin/MenuSider';

import './LayoutAdmin.scss'

//import { obtenerToken, obtenerRefreshToken } from '../api/auth'

export default function LayoutAdmin(props) {
    const [menuCollapsed, setMenuCollapsed]=useState(true)
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    const {user, isLoading}=useAuth()


    if(!user  && !isLoading ){
        return(
            <>
             <Route path="/admin/sign" component={AdminSignIn}></Route>
             <Redirect to="/admin/sign"></Redirect>
            </>
        )
        
    }
   
    if(user && !isLoading){
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
                </Layout>
            </Layout>
        )
    }
    return null;
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
