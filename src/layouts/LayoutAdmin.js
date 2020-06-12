import React from 'react'
import {Layout} from 'antd'
import { Route, Switch } from 'react-router-dom'

import './LayoutAdmin.scss'

export default function LayoutAdmin(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    return (
        <Layout>
            <Layout>
                <Header>head</Header>
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
