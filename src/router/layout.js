// import React, {Component} from 'react';
// import PropTypes from "prop-types";
// import {Layout, Menu, Icon, Button} from 'antd';
// import {bindActionCreators} from 'redux';
// import {Route, NavLink, Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {clearMsg, routeChange} from '../redux/actions/todo';
// import MyRouter from '../router';
// import Home from '../../src/pages/home'
//
// const {Header, Footer, Sider, Content} = Layout;
// const SubMenu = Menu.SubMenu
//
// class MyLayout extends Component {
//
//     static propTypes = {};
//
//     componentWillMount() {
//
//     }
//
//     componentWillReceiveProps(nextProps) {
//
//     }
//
//     componentDidMount() {
//
//     }
//
//
//     sideBarList = () => {
//         const {projectId, deployId, uid} = this.props.todos && this.props.todos.routeValue;
//         let list = [
//             {
//                 isOneMenu: false,
//                 name: '部署环境',
//                 icon: 'appstore-o',
//                 menus: [
//                     {path: `/logAnalysis/${projectId}/${deployId}/${uid}`, name: '日志分析', icon: '', key: '03'},
//                 ],
//             }
//         ];
//     }
//
//
//     render() {
//         let projectId = localStorage.getItem('projectId')
//         return (
//             <div>
//                 <Layout>
//                     <Header style={{background: 'white', height: '50px'}}>
//                         {/*<a*/}
//                             {/*onClick={() => {*/}
//                                 {/*location.href = `#/`;*/}
//                             {/*}}*/}
//                         {/*>项目列表</a>*/}
//                     </Header>
//                     <Layout style={{background: 'white'}}>
//                         <Sider style={{height: '100%', background: 'white', marginTop: '10px'}}>
//                             <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
//                                 <Menu.Item key="3">
//                                     <a onClick={() => {
//                                         location.href = `#/nodeList`;
//                                     }}>
//                                         <Icon type={'database'}/>
//                                         <span>{'节点列表'}</span>
//                                     </a>
//                                 </Menu.Item>
//                                 <Menu.Item key="6">
//                                     <a onClick={() => {
//                                         location.href = `#/eventList`;
//                                     }}>
//                                         <Icon type={'database'}/>
//                                         <span>{'事件列表'}</span>
//                                     </a>
//                                 </Menu.Item>
//                                 <Menu.Item key="4">
//                                     <a onClick={() => {
//                                         location.href = `#/ruleList`;
//                                     }}>
//                                         <Icon type={'database'}/>
//                                         <span>{'规则列表'}</span>
//                                     </a>
//                                 </Menu.Item>
//                                 <Menu.Item key="5">
//                                     <a onClick={() => {
//                                         location.href = `#/releaseList`;
//                                     }}>
//                                         <Icon type={'database'}/>
//                                         <span>{'发布记录'}</span>
//                                     </a>
//                                 </Menu.Item>
//                             </Menu>
//                         </Sider>
//                         <Layout style={{background: 'white'}}>
//                             <Content>
//                                 <MyRouter/>
//                             </Content>
//                         </Layout>
//                     </Layout>
//                 </Layout>
//             </div>
//         )
//
//     }
// }
//
// export default MyLayout
//
//
// // const mapStateToProps = ({todos}) => ({
// //     todos
// // })
// //
// // const mapDispatchToProps = (dispatch) => bindActionCreators({clearMsg, routeChange}, dispatch);
// //
// // export default connect(
// //     mapStateToProps,
// //     mapDispatchToProps
// // )(A)