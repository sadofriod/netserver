// import React, {Component} from 'react';
// import PropTypes from "prop-types";
// import {Layout, Menu, Icon, Button} from 'antd';
// import {bindActionCreators} from 'redux';
// import {Route, NavLink, Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {clearMsg, routeChange} from '../redux/actions/todo';
// import FirstRouter from '../router/firstRouter';
// import Home from '../../src/pages/home'
//
// const {Header, Footer, Sider, Content} = Layout;
// const SubMenu = Menu.SubMenu
//
// class FirstLayout extends Component {
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
//     render() {
//         let projectId = localStorage.getItem('projectId')
//         return (
//             <div>
//                 <Layout>
//                     <Header style={{background: 'white', height: '50px'}}>
//                     </Header>
//                     <Layout style={{background: 'white'}}>
//                         <Sider style={{height: '100%', background: 'white', marginTop: '10px'}}>
//                             <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
//                                 <Menu.Item key="3">
//                                     <a onClick={() => {
//                                         location.href = `#/newProject`;
//                                     }}>
//                                         <Icon type={'database'}/>
//                                         <span>{'项目列表'}</span>
//                                     </a>
//                                 </Menu.Item>
//                             </Menu>
//                         </Sider>
//                         <Layout style={{background: 'white'}}>
//                             <Content>
//                                 <FirstRouter/>
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
// export default FirstLayout
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