import React,{Component} from 'react'
import { HashRouter,Router,Switch,Route } from 'react-router-dom'
import Layout from './layout';
import NoMatch from './notFound';
import { hot } from 'react-hot-loader';
import rootReducer from '../redux/ducks'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import lazyLoad from './lazyLoad';
// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// const Login = lazyLoad(() => import('../../src/pages/login'))
// const Home = lazyLoad(() => import('../../src/pages/home'))

import Login from '../../src/pages/login'
import Home from '../../src/pages/home'
import NewProject from '../../src/pages/newProject'
import DeploymentProject from '../../src/pages/deploymentProject'

import Processor from '../../src/pages/processor'
import EditProcessor from '../../src/pages/processor/editProcessor'

import ParameterType from '../../src/pages/parameterType'

import Environmentlist from '../../src/pages/environmentlist'

import GeneralInterface from '../../src/pages/generalInterface'

import NodeList from '../../src/pages/nodeList'
import RuleList from '../../src/pages/ruleList'
import ReleaseList from '../../src/pages/releaseList'
import EventList from '../../src/pages/eventList'

const Root = () => {
    let router = [
        // {name:"登录",id:"3",component:Login,path:"/login",isExact:true},
        // {name:"组件列表",id:"5",component:DeploymentProject,path:"/deploymentProject/:projectId",isExact:true},
        // {name:"处理器列表",id:"6",component:Processor,path:"/processor/:id",isExact:true},
        // {name:"编辑处理器",id:"7",component:EditProcessor,path:"/editProcessor/:processorId",isExact:true},
        // {name:"参数类型",id:"8",component:ParameterType,path:"/parameterType",isExact:true},
        // {name:"环境列表",id:"8",component:Environmentlist,path:"/environmentlist/:projectId",isExact:true},
        // {name:"接口列表",id:"8",component:GeneralInterface,path:"/generalInterface",isExact:true},
        {name:"节点列表",id:"1",component:NodeList,path:"/nodeList",isExact:true},
        {name:"规则列表",id:"1",component:RuleList,path:"/ruleList",isExact:true},
        {name:"发布列表",id:"1",component:ReleaseList,path:"/releaseList",isExact:true},
        {name:"事件列表",id:"1",component:EventList,path:"/eventList",isExact:true},
    ];

    return (
        <div>
            {
                router.map((i,k)=>
                    <Route path={i.path} key={i.id} component={i.component} exact={i.isExact} />
                )
            }
            {/*<Route component={NoMatch} />*/}
        </div>
    )
}

// export default hot(module)(Root);
export default Root;
