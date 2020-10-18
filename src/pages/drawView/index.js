import React, {Component} from 'react';

import Network from '../network'
// import "../../utils/global.scss";
import html2canvas from 'html2canvas'
import MyCanvas2Image from "../../utils/myCanvas2Image";
import EventManager from '../../utils/eventManager'
import BezierAnimation from '../network/bezierAnimation'

import {
    Form,
    Select,
    Layout,
    Button,
    Input,
    Table,
    Popconfirm,
    message,
    Modal,
    Switch,
    Tooltip
} from 'antd';

let rucan = []
let chucan = []
const Content = Layout.Content;
const Sider = Layout.Sider;
const FormItem = Form.Item;
const Option = Select.Option;
let myClientHeight = window.innerHeight
let interval

export default class DrawView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftNode: [],
            addComponentModal: false,
            addComponentModalRandom: Math.floor(Math.random() * (99) + 1),
            monitorSwich: false
        }
        this.offSetPoint = {}
        this.data = ''
        // this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

        EventManager.on('onTap', (params) => {
            if (params != undefined) {
                this.data = params
            }

        })


        let toParam1 = {
            toParamId: 'nodeId1-toParam11',
            content: 'id: toParam11',
        }

        let toParam2 = {
            toParamId: 'nodeId1-toParam21',
            content: 'id: toParam21',
        }

        // let toParam3 = {
        //     toParamId: 'nodeId1-toParam31',
        //     content: 'id: toParam31',
        // }

        let toParam4 = {
            toParamId: 'nodeId2-toParam41',
            content: 'id: toParam41',
        }

        let toParam5 = {
            toParamId: 'nodeId2-toParam51',
            content: 'id: toParam51',
        }

        let toParam6 = {
            toParamId: 'nodeId3-toParam61',
            content: 'id: toParam61',
        }

        let toParam7 = {
            toParamId: 'nodeId3-toParam71',
            content: 'id: toParam71',
        }

        let toParam8 = {
            toParamId: 'nodeId3-toParam81',
            content: 'id: toParam81',
        }

        // let toParam9 = {
        //     toParamId: 'nodeId4-toParam91',
        //     content: 'id: toParam91',
        // }
        //
        // let toParam10 = {
        //     toParamId: 'nodeId4-toParam101',
        //     content: 'id: toParam101',
        // }

        let fromParam1 = {
            fromParamId: 'nodeId1-fromParam11',
            content: 'id: fromParam11',
        }

        let fromParam2 = {
            fromParamId: 'nodeId1-fromParam21',
            content: 'id: fromParam21',
        }

        let fromParam3 = {
            fromParamId: 'nodeId1-fromParam31',
            content: 'id: fromParam31',
        }

        let fromParam4 = {
            fromParamId: 'nodeId2-fromParam41',
            content: 'id: fromParam41',
        }

        let fromParam5 = {
            fromParamId: 'nodeId3-fromParam51',
            content: 'id: fromParam51',
        }

        let fromParam6 = {
            fromParamId: 'nodeId3-fromParam61',
            content: 'id: fromParam61',
        }

        let fromParam7 = {
            fromParamId: 'nodeId3-fromParam71',
            content: 'id: fromParam71',
        }

        // let fromParam8 = {
        //     fromParamId: 'nodeId4-fromParam81',
        //     content: 'id: fromParam81',
        // }
        //
        // let fromParam9 = {
        //     fromParamId: 'nodeId4-fromParam91',
        //     content: 'id: fromParam91',
        // }
        //
        // let fromParam10 = {
        //     fromParamId: 'nodeId4-fromParam101',
        //     content: 'id: fromParam101',
        // }


        let node1 = {
            nodeId: 'nodeId1',
            title: '这是组件1',
            content: '这里边包含了一些具体功能。。。。。。。',
            fromParamArr: [fromParam1, fromParam2, fromParam3],
            toParamArr: [toParam1, toParam2]
        }

        let node2 = {
            nodeId: 'nodeId2',
            title: '这是组件2',
            content: '这里边包含了一些具体功能。。。。。。。',
            fromParamArr: [fromParam4,],
            toParamArr: [toParam4, toParam5]
        }

        let node3 = {
            nodeId: 'nodeId3',
            title: '这是组件3',
            content: '这里边包含了一些具体功能。。。。。。。',
            fromParamArr: [fromParam5, fromParam6, fromParam7],
            toParamArr: [toParam6, toParam7, toParam8]
        }

        // this.node4 = {
        //     nodeId: 'nodeId4',
        //     title: '这是组件4',
        //     content: '这里边包含了一些具体功能。。。。。。。',
        //     fromParamArr: [fromParam8, fromParam9, fromParam10],
        //     toParamArr: [toParam9, toParam10]
        // }

        let edge1 = {
            toParam: 'nodeId1-toParam21',
            fromParam: 'nodeId2-fromParam41'
        }

        let edge2 = {
            toParam: 'nodeId2-toParam41',
            fromParam: 'nodeId3-fromParam71'
        }

        let data = {
            node: [node1, node2, node3],
            edge: [edge1, edge2]
        }
        this.data = data
        let container = document.getElementById("myCanvas");

        let fatherDiv = document.getElementById('fatherDiv')
        let clientWidth = fatherDiv.clientWidth
        let clientHeight = fatherDiv.clientHeight

        let option = {width: clientWidth, height: clientHeight}
        this.option = option

        this.network = new Network(container, data, option)

    }

    componentDidUpdate() {
        let leftNode = JSON.parse(JSON.stringify(this.state.leftNode))

        if (leftNode.length > 0) {
            for (let i = 0; i < leftNode.length; i++) {
                let div = document.getElementById(leftNode[i]['nodeId'])
                this.loginEvent(div, 'mousedown', this.mouseDown, false, false)
            }
        }
    }

    /*
    @param   HTMLElement  ele             绑定事件的元素
    @param   String       eventType       事件类型
    @param   Boolean      isCaptureCatch  是否在捕获阶段触发
    @param   Boolean      isRepeat        是否允许同类型事件重复绑定
    @param   Function     fn              事件绑定的函数
    @return undefined
*/
    loginEvent = (ele, eventType, fn, isRepeat, isCaptureCatch) => {
        if (ele == undefined || eventType === undefined || fn === undefined) {
            throw new Error('传入的参数错误！');
        }

        if (typeof ele !== 'object') {
            throw new TypeError('不是对象！');
        }

        if (typeof eventType !== 'string') {
            throw new TypeError('事件类型错误！');
        }

        if (typeof fn !== 'function') {
            throw new TypeError('fn 不是函数！');
        }

        if (isCaptureCatch === undefined || typeof isCaptureCatch !== 'boolean') {
            isCaptureCatch = false;
        }

        if (isRepeat === undefined || typeof isRepeat !== 'boolean') {
            isRepeat = true;
        }

        if (ele.eventList === undefined) {
            ele.eventList = {};
        }

        if (isRepeat === false) {
            for (let key in ele.eventList) {
                if (key === eventType) {
                    return '该事件已经绑定过！';
                }
            }
        }

        // 添加事件监听
        if (ele.addEventListener) {
            ele.addEventListener(eventType, fn, isCaptureCatch);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + eventType, fn);
        } else {
            return false;
        }

        ele.eventList[eventType] = true;
    }

    mouseDown = (e) => {
        this.offSetPoint = {x: e.offsetX, y: e.offsetY}
    }

    onDragStart = (e) => {

    }

    onDragEnd = (e) => {
        if (e.clientX < 200) {
            return
        } else {
            let endPoint = {x: e.clientX - 200, y: e.clientY}
            let dragPoint = {
                x: endPoint['x'] - this.offSetPoint['x'],
                y: endPoint['y'] - this.offSetPoint['y']
            }

            let leftNode = JSON.parse(JSON.stringify(this.state.leftNode))
            let newLeftNode = []

            let dragNode = {}
            for (let i = 0; i < leftNode.length; i++) {
                if (leftNode[i]['nodeId'] != e.target.id) {
                    newLeftNode.push(leftNode[i])
                } else {
                    dragNode = leftNode[i]
                }
            }

            this.network.addNode(dragNode, this.offSetPoint, endPoint)
            let item = document.getElementById(e.target.id)
            item.style.display = 'none'
            this.setState({
                leftNode: newLeftNode
            })
        }
    }

    addButton = (e) => {
        this.setState({
            addComponentModal: true,
            addComponentModalRandom: Math.floor(Math.random() * (99) + 1),
        })
    }

    // 随机数函数
    customizeRandom = (length) => {
        let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let res = '';
        for (let i = 0; i < length; i++) {
            let id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }


    addComponentModalVisibleOk = () => {
        this.addComponentRef.validateFields((err, values) => {
            if (!err) {

                // 创建node
                let nodeId = this.customizeRandom(24)
                let node = {
                    nodeId: nodeId,
                    title: values.name,
                    content: values.description,
                    fromParamArr: [],
                    toParamArr: []
                }

                // 创建入参
                let fromParamArr = []
                if (rucan.length > 0) {
                    for (let i = 0; i < rucan.length; i++) {
                        let fromParam = {
                            fromParamId: nodeId + '-' + this.customizeRandom(24),
                            content: rucan[i]['name'],
                        }

                        fromParamArr.push(fromParam)
                    }
                }


                // 创建出参
                let toParamArr = []

                if (chucan.length > 0) {
                    for (let i = 0; i < chucan.length; i++) {
                        let toParam = {
                            toParamId: nodeId + '-' + this.customizeRandom(24),
                            content: chucan[i]['name'],
                        }

                        toParamArr.push(toParam)
                    }
                }

                node['fromParamArr'] = fromParamArr
                node['toParamArr'] = toParamArr

                message.success('创建建成功!')
                this.setState({
                    addComponentModal: false,
                    leftNode: [...this.state.leftNode, node]
                })
            }
        })
    }


    addComponentModalChancel = () => {
        this.setState({
            addComponentModal: false
        })
    }

    downloadImage = () => {
        let that = this
        let image = that.convertToImage(document.getElementById('myCanvas'))
        image.then((value, err) => {
        })
    }

    convertToImage = (container, options = {}) => {
        return html2canvas(container, options).then(canvas => {
            canvas.style.width = canvas.style.width * 4
            canvas.style.height = canvas.style.height * 4
            const imageEl = MyCanvas2Image.saveAsPNG(canvas, canvas.width, canvas.height);
            return imageEl;
        });
    }

    myTest = () => {
        EventManager.emitter('test', 'test--')
    }

    monitorChange = (checked, event) => {
        if (checked == true) {
            this.setState({
                monitorSwich: checked
            }, () => {
                // 画图
                // 18222B
                document.getElementById('myCanvas').style.background = '#18222B';
                document.getElementById('canvas').style.display = 'block';
                this.createBezierAnimation()
            })
        } else {
            this.setState({
                monitorSwich: checked
            }, () => {
                document.getElementById('myCanvas').style.background = '#f0f2f5';
                document.getElementById('canvas').style.display = 'none';
                clearInterval(interval);
            })
        }

    }

    createBezierAnimation = () => {
        let currentNodes = this.data && this.data.node
        let allEdge = this.data && this.data.edge

        let currentNodesKey = []
        let currentEdge = []
        for (let i = 0; i < currentNodes.length; i++) {
            for (let j = 0; j < currentNodes[i]['fromParamArr'].length; j++) {
                currentNodesKey.push(currentNodes[i]['fromParamArr'][j]['fromParamId'])
            }
            for (let j = 0; j < currentNodes[i]['toParamArr'].length; j++) {
                currentNodesKey.push(currentNodes[i]['toParamArr'][j]['toParamId'])
            }
        }

        for (let i = 0; i < allEdge.length; i++) {
            if (currentNodesKey.indexOf(allEdge[i]['fromParam']) > -1 && currentNodesKey.indexOf(allEdge[i]['toParam']) > -1) {
                currentEdge.push(allEdge[i])
            }
        }


        // 麻烦
        for (let k = 0; k < currentEdge.length; k++) {
            for (let i = 0; i < currentNodes.length; i++) {

                for (let j = 0; j < currentNodes[i]['fromParamArr'].length; j++) {

                    if (currentNodes[i]['fromParamArr'][j]['fromParamId'] == currentEdge[k]['fromParam']) {
                        currentEdge[k]['fromParam_x'] = currentNodes[i]['fromParamArr'][j]['x']
                        currentEdge[k]['fromParam_y'] = currentNodes[i]['fromParamArr'][j]['y']
                    }
                }

                for (let j = 0; j < currentNodes[i]['toParamArr'].length; j++) {

                    if (currentNodes[i]['toParamArr'][j]['toParamId'] == currentEdge[k]['toParam']) {
                        currentEdge[k]['toParam_x'] = currentNodes[i]['toParamArr'][j]['x']
                        currentEdge[k]['toParam_y'] = currentNodes[i]['toParamArr'][j]['y']
                    }
                }

            }
        }


        let fromArr = []
        let controlArr = []
        let toArr = []
        let filterArr = []
        let countArr = []
        for (let i = 0; i < currentEdge.length; i++) {
            let p3 = {x: currentEdge[i]['toParam_x'], y: currentEdge[i]['toParam_y']}
            let p1 = {x: currentEdge[i]['fromParam_x'], y: currentEdge[i]['fromParam_y']}
            let p2 = this.contorlNode(p1, p3)
            let filterDic = JSON.stringify({from: p1, to: p3})
            if (filterArr.indexOf(filterDic) == -1) {
                filterArr.push(filterDic)
                fromArr.push(p1)
                toArr.push(p3)
                controlArr.push(p2)
                if (!currentEdge[i]['content']) {

                    countArr.push({faild: 0, success: 2, warn: 0})

                }
            }
        }

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext("2d");
        let ratio = this.getPixelRatio(ctx);
        canvas.style.width = this.option.width + 'px';
        canvas.style.height = this.option.height + 'px';
        canvas.width = this.option.width * ratio;
        canvas.height = this.option.height * ratio;
        ctx.scale(ratio, ratio);

        ctx.fillStyle = 'rgba(255, 255, 255, 0)';

        let bezierAnimation = new BezierAnimation(toArr, fromArr, controlArr)
        for (let i = 0; i < countArr.length; i++) {
            countArr[i]['faild'] = countArr[i]['faild'] == 0 ? 0 : this.numberOfVisits(countArr[i]['faild'])
            countArr[i]['success'] = countArr[i]['success'] == 0 ? 0 : this.numberOfVisits(countArr[i]['success'])
            countArr[i]['warn'] = countArr[i]['warn'] == 0 ? 0 : this.numberOfVisits(countArr[i]['warn'])
        }
        interval = setInterval(function () {
            bezierAnimation.drawBezierAnimation(ctx, 0.004, countArr)
        }, 42);
    }

    canvasClick = () => {
        message.info('监控开启期间不能拖拽！')
    }

    numberOfVisits = (count) => {
        if (count < 10) {
            return 1
        } else if (Math.pow(10, 2) > count > Math.pow(10, 1)) {
            return 2
        } else if (Math.pow(10, 3) > count > Math.pow(10, 2)) {
            return 3
        } else if (Math.pow(10, 4) > count > Math.pow(10, 3)) {
            return 4
        } else if (Math.pow(10, 5) > count > Math.pow(10, 4)) {
            return 5
        } else if (Math.pow(10, 6) > count > Math.pow(10, 5)) {
            return 6
        } else {
            return 0
        }
    }

    /**
     * control node
     * */
    contorlNode = (from, to) => {
        let xVia = undefined;
        let yVia = undefined;
        let factor = 0.5;
        let dx = Math.abs(from.x - to.x);
        let dy = Math.abs(from.y - to.y);

        let stepX;
        let stepY;

        if (dx <= dy) {
            stepX = stepY = factor * dy;
        } else {
            stepX = stepY = factor * dx;
        }

        if (from.x > to.x) stepX = -stepX;
        if (from.y >= to.y) stepY = -stepY;

        xVia = from.x + stepX;
        yVia = from.y + stepY;

        if (dx <= dy) {
            if (from.x <= to.x) {
                xVia = to.x < xVia ? to.x : xVia;
            }
            else {
                xVia = to.x > xVia ? to.x : xVia;
            }
        }
        else {
            if (from.y >= to.y) {
                yVia = to.y > yVia ? to.y : yVia;
            } else {
                yVia = to.y < yVia ? to.y : yVia;
            }
        }
        return {x: xVia, y: yVia};
    }


    getPixelRatio = (context) => {
        let backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };

    render() {
        return <div>
            <section style={{position: 'fixed', top: '14px', right: '10px', zIndex: '99'}}>
                <Switch defaultChecked={this.state.monitorSwich}
                        checked={this.state.monitorSwich} onChange={this.monitorChange} checkedChildren="监控开启"
                        unCheckedChildren="监控关闭" defaultChecked/>
            </section>
            <Button style={{position: 'fixed', top: '50px', right: '10px', zIndex: '99'}}
                    onClick={() => this.downloadImage()}>截图</Button>
            <Button
                style={{position: 'fixed', top: '92px', right: '10px', zIndex: '99'}}
                onClick={this.addButton}
            >新建</Button>

            <Tooltip title={<section>
                <span>1.点击右侧新建按钮创建新组件，可以将新组件从左侧拖拽到右侧画布上。</span>
                <br/>
                <span>2.选中node，按backspace可以删除。</span>
                <br/>
                <span>3.鼠标左键点击toParam, 松开左键，移动鼠标至fromParam，点击鼠标左键，可进行edge链接。</span>
            </section>}>
                <Button style={{position: 'fixed', top: '14px', left: '220px', zIndex: '99'}} >?</Button>
            </Tooltip>

            <div style={{
                height: 'inherit',
                minWidth: '550px',
                background: '#f0f2f5'
            }}>
                <Modal onOk={this.addComponentModalVisibleOk}
                       onCancel={this.addComponentModalChancel}
                       visible={this.state.addComponentModal}
                       title={'创建组件'}
                       key={this.state.addComponentModalRandom}
                       width={'80%'}
                >
                    <SelectAssociatedInterface ref={(ref) => {
                        this.addComponentRef = ref
                    }}/>
                </Modal>
                <Layout style={{height: '100%', width: '100%', background: '#f0f2f5'}}>
                    {/*<Header style={{background: 'white'}}>Header</Header>*/}
                    {/*f0f2f5*/}
                    <Layout style={{background: '#f0f2f5', height: myClientHeight}}>
                        <Sider
                            style={{background: '#f0f2f5', borderRight: '1px solid #e6e9ed', height: myClientHeight}}>
                            <section>
                                {
                                    this.state.leftNode && this.state.leftNode.length > 0 && this.state.leftNode.map((item, index) => {
                                        return (
                                            <Button id={item && item.nodeId}
                                                    style={{width: '200px', height: '100px', marginTop: '10px'}}
                                                    draggable="true" onDragStart={this.onDragStart}
                                                    onDragEnd={this.onDragEnd}
                                                    onClick={this.addButton}
                                            >{
                                                item && item.title
                                            }
                                            </Button>
                                        )
                                    })
                                }
                            </section>
                        </Sider>
                        <Content id='fatherDiv' style={{position: 'absolute', top: 0, bottom: 0, left: 200, right: 0}}>
                            <canvas id="canvas"
                                    style={{zIndex: '9', position: 'absolute', bottom: '0'}}
                                    onClick={() => this.canvasClick()}>
                            </canvas>

                            <canvas id="myCanvas" width="200" height="100"
                                    style={{background: '#f0f2f5'}}></canvas>
                        </Content>
                        {/*<Sider>Sider</Sider>*/}
                    </Layout>
                    {/*<Footer>Footer</Footer>*/}
                </Layout>
            </div>
        </div>
    }
}

const selectAssociatedInterfaceForm = Form.create()(
    (props) => {
        const {form} = props;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
        };
        return (
            <Form layout="name">
                <FormItem
                    label="名称"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            type: '', message: '',
                        }, {
                            required: true, message: '请输入名称!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    label="描述"
                    hasFeedback
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            type: '', message: '',
                        }, {
                            required: true, message: '请输入描述!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    label="请求参数"
                >
                    <EditableTable parameterTypes={[{parameterTypeId: 0, parameterTypeName: 'int'}, {
                        parameterTypeId: 1,
                        parameterTypeName: 'string'
                    }]}/>
                </FormItem>
                <FormItem
                    label="返回参数">
                    <EditableTable2 parameterTypes={[{parameterTypeId: 0, parameterTypeName: 'int'}, {
                        parameterTypeId: 1,
                        parameterTypeName: 'string'
                    }]}/>
                </FormItem>
            </Form>
        );
    }
);

const SelectAssociatedInterface = Form.create()(selectAssociatedInterfaceForm);


class EditableCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.state.value = value;
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    check = () => {
        this.setState({
            editable: false
        });

    }
    edit = () => {
        this.setState({
            editable: true
        });
    }

    render() {
        const {
            value,
            editable
        } = this.state;
        return (
            <div className="editable-cell">
                {
                    <div className="editable-cell-input-wrapper">
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                        />
                    </div>
                }
            </div>
        );
    }
}

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '参数名',
            dataIndex: 'name',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'name')}
                />
            ),
        }, {
            title: '类型',
            dataIndex: 'type',
            render: (text, record) => (
                <Select defaultValue={''} onChange={this.onCellChange(record.key, 'type')}
                        getPopupContainer={() => document.getElementById('warp')}>
                    {
                        this.props.parameterTypes && this.props.parameterTypes.length > 0 && this.props.parameterTypes.map((item) => {
                            return (
                                <Option
                                    value={item && item.parameterTypeId + ';' + item && item.parameterTypeName}>{item && item.parameterTypeName}</Option>
                            )
                        })
                    }
                </Select>
            ),
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 110,
            render: (text, record) => {
                return <div id="warp">
                    <Popconfirm placement="bottom" getPopupContainer={() => document.getElementById('warp')}
                                title="确定要删除吗？" onConfirm={() => this.onDelete(record.key)}>
                        <a href="#">删除</a>
                    </Popconfirm>
                </div>
            },
        }];

        this.state = {
            dataSource: [],
            count: 0,
            parameterTypes: []
        };
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                if (dataIndex == 'type') {
                    if ((value).indexOf(';') > 0) {
                        let temp = (value).split(';');
                        target.type = temp[1];
                        target.id = temp[0]
                    }
                } else {
                    target[dataIndex] = value;
                }
                rucan = dataSource
                this.setState({
                    dataSource
                });
            }
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key)
        });
        rucan = dataSource.filter(item => item.key !== key)
    }
    handleAdd = () => {
        let {
            count,
            dataSource
        } = this.state;
        if (count < dataSource.length + 2) {
            count = dataSource.length + 2;

        }
        // const newData = {
        //     key: count,
        //     name: `参数${count-1}`,
        //     type: "String",
        //     description: `描述${count-1}`,
        //     demo: `示例${count-1}`,
        //     bt: false,
        // };

        const newData = {
            key: count,
            name: null,
            type: "String",
            description: null,
            demo: null,
            bt: false,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    render() {
        const {
            dataSource
        } = this.state;
        const columns = this.columns;
        return (
            <div id={'warp'}>
                <Table bordered dataSource={dataSource} columns={columns} pagination={false}/>
                <Button className="editable-add-btn" onClick={this.handleAdd}
                        style={{float: 'right', marginTop: "10px"}}>添加参数</Button>
            </div>
        );
    }
}

class EditableTable2 extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '参数名',
            dataIndex: 'name',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'name')}
                />
            ),
        }, {
            title: '类型',
            dataIndex: 'type',
            render: (text, record) => (
                <Select defaultValue="" onChange={this.onCellChange(record.key, 'type')}
                        getPopupContainer={() => document.getElementById('warp')}>
                    {
                        this.props.parameterTypes && this.props.parameterTypes.length > 0 && this.props.parameterTypes.map((item) => {
                            return (
                                <Option
                                    value={item && item.parameterTypeId + ';' + item && item.parameterTypeName}>{item && item.parameterTypeName}</Option>
                            )
                        })
                    }
                </Select>
            ),
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 110,
            render: (text, record) => {
                return (
                    <div id="warp1">
                        <Popconfirm placement="bottom" getPopupContainer={() => document.getElementById('warp1')}
                                    title="确定要删除吗？" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        }];

        this.state = {
            dataSource: [],
            count: 0,
            addGroup: null,
            visible: false
        };
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                if (dataIndex == 'type') {
                    if ((value).indexOf(';') > 0) {
                        let temp = (value).split(';');
                        target.type = temp[1];
                        target.id = temp[0]
                    }
                } else {
                    target[dataIndex] = value;
                }
                chucan = dataSource
                this.setState({
                    dataSource
                });
            }
        };
    }
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key)
        });
        chucan = dataSource.filter(item => item.key !== key)
    }
    handleAdd = () => {
        let {
            count,
            dataSource
        } = this.state;
        if (count < dataSource.length + 2) {
            count = dataSource.length + 2;

        }
        // const newData = {
        //     key: count,
        //     name: `参数${count-1}`,
        //     type: "String",
        //     description: `描述${count-1}`,
        //     demo: `示例${count-1}`,
        //     bt: false,
        // };
        const newData = {
            key: count,
            name: null,
            type: "String",
            description: null,
            demo: null,
            bt: false,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };


    render() {
        const {
            dataSource
        } = this.state;
        const columns = this.columns;
        return (
            <div id='warp'>
                <Table bordered dataSource={dataSource} columns={columns} pagination={false}/>
                <Button className="editable-add-btn" onClick={this.handleAdd}
                        style={{float: 'right', marginTop: "10px"}}>添加参数</Button>
            </div>
        );
    }
}
































































