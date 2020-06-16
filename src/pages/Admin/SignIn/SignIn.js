import React from 'react'
import { Layout, Tabs } from 'antd';
import Logo from '../../../assets/img/png/logo.png';

import './SignIn.scss';
import Sign from '../../../components/SignIn'
import Login from '../../../components/Login'
export default function SignIn() {
    
    const { Content } = Layout;
    const { TabPane } = Tabs;
      
    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt=""/>
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane  tab={<h6 >Inicia sesion</h6>} key="1">
                            <Login></Login>
                        </TabPane>
                        <TabPane tab={<h6 >Registrate</h6>} key="2">
                            <Sign></Sign>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>

      );
}
