// import React,{Component} from 'react'
// import { HashRouter,Router,Switch,Route } from 'react-router-dom'
// import Layout from './layout';
// import NoMatch from './notFound';
// import { hot } from 'react-hot-loader';
// import rootReducer from '../redux/ducks'
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import lazyLoad from './lazyLoad';
// // const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//
// // const Login = lazyLoad(() => import('../../src/pages/login'))
// // const Home = lazyLoad(() => import('../../src/pages/home'))
//
// import Login from '../../src/pages/login'
// import Home from '../../src/pages/home'
// import NewProject from '../../src/pages/newProject'
// import DeploymentProject from '../../src/pages/deploymentProject'
//
// import Processor from '../../src/pages/processor'
// import EditProcessor from '../../src/pages/processor/editProcessor'
//
// import ParameterType from '../../src/pages/parameterType'
//
// import Environmentlist from '../../src/pages/environmentlist'
//
// import GeneralInterface from '../../src/pages/generalInterface'
//
// const FirstRoot = () => {
//     let router = [
//         {name:"项目列表",id:"3",component:NewProject,path:"/newProject",isExact:true},
//     ];
//
//     return (
//         <div>
//             {
//                 router.map((i,k)=>
//                     <Route path={i.path} key={i.id} component={i.component} exact={i.isExact} />
//                 )
//             }
//             {/*<Route component={NoMatch} />*/}
//         </div>
//     )
// }
//
// // export default hot(module)(Root);
// export default FirstRoot;
