import React from 'react'
import logo from '../../assets/img/png/logo.png'
import './MenuTop.scss'
import { Button } from 'antd';
import { PoweroffOutlined, MenuUnfoldOutlined, CloseOutlined } from '@ant-design/icons'

export default function MenuTop(props) {
    const{setMenuCollapsed, menuCollapsed}=props;
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img src={logo} alt=""
                    className="menu-top__left-logo"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                  
                     {menuCollapsed ? <MenuUnfoldOutlined />:<CloseOutlined/>} 
                      
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" >
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
}
