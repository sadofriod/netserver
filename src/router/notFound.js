import React, {Component} from 'react';
import PropTypes from "prop-types";
// const notImg = require ('../../public/img/notFound.png');
import {Button} from 'antd';

const history =  require("history/createHashHistory").default();

export default class NotFound extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    wrapStyle = {
        textAlign:"center",
        position:"relative",
        marginTop:50
    };

    notFoundTitle = {
        float:"left",
        display:"inline-block",
        fontSize:15,
    };

    innerWrapStyle = {
        width: "230px",
        margin:"10px auto 20px auto",
        textAlign:"left"
    };

    listStyle = {
        paddingLeft: 115,
        listStyle: "circle",
        fontSize:15,
    };

    render() {
        return <div style={this.wrapStyle}>
            <h3 style={{fontSize:25,marginTop:10}}> 哎呀妈呀！找不到页面了～</h3>
            <div style={this.innerWrapStyle}>
                <h4 style={this.notFoundTitle}> 可能的原因: </h4>
                <ul style={this.listStyle}>
                    <li>网络信号弱</li>
                    <li>找不到请求页面</li>
                    <li>输入地址不正确</li>
                </ul>
            </div>
            <footer>
                <Button icon="sync" style={{marginRight:30}} onClick={()=>{window.location.reload()}}>刷新</Button>
                <Button icon="arrow-left" type="primary"
                        onClick={()=>{history.replace({ pathname:"/" })}}
                >首页</Button>
            </footer>

        </div>
    }
}