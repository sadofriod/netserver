import EventManager from '../../utils/eventManager'

let Hammer = require('hammerjs')
let util = require('./util')
let keycharm = require('keycharm');
/**
 * network
 *
 * @param {dic}        container      容器
 * @param {dic}        data           数据
 * @param {dic}        options        配置
 * */

class Network {

    constructor(container, data, options) {
        this.container = container
        this.data = data
        this.options = options
        this.hoverToParam = ''
        this.hoverFromParam = ''
        this.newNode = ''
        this.hoverNode = ''
        // default value
        this.options.zoomView = true
        this.createNetWork()

        // this.body = {
        //     container: container,
        //
        //     // See comment above for following fields
        //     nodes: {},
        //     nodeIndices: [],
        //     edges: {},
        //     edgeIndices: [],
        //
        //     emitter: {
        //         on: this.on.bind(this),
        //         off: this.off.bind(this),
        //         emit: this.emit.bind(this),
        //         once: this.once.bind(this)
        //     },
        //     eventListeners: {
        //         onTap: function () {
        //         },
        //         onTouch: function () {
        //         },
        //         onDoubleTap: function () {
        //         },
        //         onHold: function () {
        //         },
        //         onDragStart: function () {
        //         },
        //         onDrag: function () {
        //         },
        //         onDragEnd: function () {
        //         },
        //         onMouseWheel: function () {
        //         },
        //         onPinch: function () {
        //         },
        //         onMouseMove: function () {
        //         },
        //         onRelease: function () {
        //         },
        //         onContext: function () {
        //         }
        //     },
        //     data: {
        //         nodes: null,      // A DataSet or DataView
        //         edges: null       // A DataSet or DataView
        //     },
        //     functions: {
        //         createNode: function () {
        //         },
        //         createEdge: function () {
        //         },
        //         getPointer: function () {
        //         }
        //     },
        //     modules: {},
        //     view: {
        //         scale: 1,
        //         translation: {x: 0, y: 0}
        //     }
        // };
    }


    /**
     * network
     * */
    createNetWork = () => {
        this.keycharm = keycharm({container: window, preventDefault: true});
        this.keycharm.bind('backspace', () => {
            this.bindToRedraw('backspace');
        }, 'keydown');

        // let height = window.innerHeight
        // let width = window.innerWidth

        // this.container.width = this.options.width
        // this.container.height = this.options.height

        this.ctx = this.container.getContext('2d');


        let ratio = this.getPixelRatio(this.ctx);

        this.container.style.width = this.options.width + 'px';
        this.container.style.height = this.options.height + 'px';

        this.container.width = this.options.width * ratio;
        this.container.height = this.options.height * ratio;


        this.ctx.scale(ratio, ratio);

        // this.ctx.setTransform();
        // this.ctx.translate(this.options.width / 2, this.options.height / 2);
        // this.ctx.scale(ratio, ratio);

        // this.drawMoveEdgeCtx = this.container.getContext('2d')
        // this.drawMoveEdgeCtx.zIndex = 999
        // this.drawMoveEdgeCtx.canvas.width = width;
        // this.drawMoveEdgeCtx.canvas.height = height;

        // ctx.translate(ctx.canvas.clientWidth/2, ctx.canvas.clientHeight/2)


        this.drawNode(this.ctx)
        this.drawEdge(this.ctx)
        this.bindEvent(this.ctx)
    }

    bindToRedraw = (btn) => {

        let nodeArr = this.data && this.data['node']
        if (this.hoverNode) {
            for (let i = 0; i < nodeArr.length; i++) {
                if (nodeArr[i]['nodeId'] == this.hoverNode['nodeId']) {
                    nodeArr.splice(i, 1)
                    break
                }
            }

            let w = this.ctx.canvas.clientWidth;
            let h = this.ctx.canvas.clientHeight;
            this.ctx.clearRect(0, 0, w, h);

            this.drawDragNode(this.ctx)
            this.drawDragEdge(this.ctx)
        }

    }

    addNode = (node, offSetPoint, endPoint) => {
        this.newNode = node
        if (this.newNode) {
            let nodeArr = this.data && this.data['node']
            let x = endPoint['x']
            let y = endPoint['y']
            this.newNode['x'] = x - offSetPoint['x']
            this.newNode['y'] = y - offSetPoint['y']
            this.newNode['highLight'] = true


            // 通过content， fromParam， toParam计算node的高度，宽度暂时固定。
            let fromParamLength = this.newNode['fromParamArr'] && this.newNode['fromParamArr'].length || 0
            let toParamLength = this.newNode['toParamArr'] && this.newNode['toParamArr'].length || 0
            let paramHeight = fromParamLength > toParamLength ? fromParamLength * 20 : toParamLength * 20

            let contentHeight = 50


            this.newNode['width'] = 240
            this.newNode['height'] = paramHeight + contentHeight

            nodeArr.push(this.newNode)
            this.newNode = ''


            // 画高亮的node
            let w = this.ctx.canvas.clientWidth;
            let h = this.ctx.canvas.clientHeight;
            this.ctx.clearRect(0, 0, w, h);

            this.drawDragNode(this.ctx)
            this.drawDragEdge(this.ctx)
        }
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


    /**
     * bind event
     * */
    bindEvent = (ctx) => {

        // 缩放后，鼠标的位置距离缩放前是变化的。
        // 首先得计算出缩放的偏差


        let that = this
        let edgeArr = that.data && that.data['edge']
        that.container.addEventListener('mousemove', this.mouseMoveNodeAndToParamHover);

        // that.container.addEventListener('wheel', that.mouseWheel)

        // 1.当toParam处于hover状态的时候，panmove状态不应该销毁，

        // 2.当我从toParam拖拽出一条edge的时候，这期间会经历的情况

        // a,node
        //b,new node
        // c, new toParam // 每当mouse hover 到这些模块，都需要记录状态。
        // d, fromParam

        // 3.先不考虑

        that.hammer = new Hammer(this.container);
        // that.hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});


        // hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });


        that.hammer.on('tap', function (e) {

            if (that.hoverToParam) {
                that.container.removeEventListener('mousemove', that.mouseMoveNodeAndToParamHover)

                // 绑定 from param hover
                that.container.addEventListener('mousemove', that.mouseMoveNodeAndFromParamHover)
            }

            if (that.hoverToParam && that.hoverFromParam) {
                let item = {
                    toParam: that.hoverToParam['toParamId'],
                    fromParam: that.hoverFromParam['fromParamId']
                }
                edgeArr.push(item)

                that.hoverToParam = ''
                that.hoverFromParam = ''

                // 解除old绑定， 设置new绑定
                that.container.addEventListener('mousemove', that.mouseMoveNodeAndToParamHover);

                that.container.removeEventListener('mousemove', that.mouseMoveNodeAndFromParamHover)


                // 重画
                let w = that.ctx.canvas.clientWidth;
                let h = that.ctx.canvas.clientHeight;
                that.ctx.clearRect(0, 0, w, h);

                that.drawDragNode(that.ctx)
                that.drawDragEdge(that.ctx)
            }

        });


        that.hammer.on('panstart', function (e) {

            let nodeArr = that.data && that.data['node']
            // 在这里判断拖拽的点是否在node内部

            // 将，要拖拽的node放入数组，目的有两个。
            // 1.为什么要在这里设置，为了避免在拖拽状态下，鼠标和其他node重叠后，产生冲突。而且可以减少遍历。
            // 2.为以后选择多个node进行拖拽做准备
            that.dragNodeArr = []

            let w = ctx.canvas.clientWidth;
            let h = ctx.canvas.clientHeight;

            for (let i = 0; i < nodeArr.length; i++) {
                if (that.isInsideRect(nodeArr[i]['x'], nodeArr[i]['y'], nodeArr[i]['width'], nodeArr[i]['height'], e.changedPointers[0]['offsetX'], e.changedPointers[0]['offsetY'])) {
                    that.dragNodeArr.push(nodeArr[i])
                }
            }
            that.dragOldNodeArr = JSON.parse(JSON.stringify(that.dragNodeArr))

        });

        that.hammer.on('panmove', function (e) {
            // 拖拽状态区分，
            // 1.拖拽出edge
            // 2.拖拽node

            if (that.dragOldNodeArr.length > 0) {
                let nodeArr = that.data && that.data['node']

                // 在这里判断拖拽的点是否在node内部
                let w = ctx.canvas.clientWidth;
                let h = ctx.canvas.clientHeight;

                for (let i = 0; i < that.dragNodeArr.length; i++) {

                    const num = nodeArr.findIndex((value) => {
                        return value['nodeId'] == that.dragNodeArr[i]['nodeId']
                    })

                    let x = that.dragOldNodeArr[i]['x']
                    let y = that.dragOldNodeArr[i]['y']
                    nodeArr[num]['x'] = x + e.deltaX
                    nodeArr[num]['y'] = y + e.deltaY
                }

                ctx.clearRect(0, 0, w, h);
                that.drawDragNode(ctx)
                that.drawDragEdge(ctx)


            } else {
                // 拖拽画布，所谓拖拽画布就是将画布上的元素规则移动
                let nodeArr = that.data && that.data['node']

                // 在这里判断拖拽的点是否在node内部
                let w = ctx.canvas.clientWidth;
                let h = ctx.canvas.clientHeight;


                let deltaX = e.deltaX
                let deltaY = e.deltaY
                for (let i = 0; i < nodeArr.length; i++) {


                    let addWidth = e.deltaX - nodeArr[i]['deltaX'] || 0
                    let addHeight = e.deltaY - nodeArr[i]['deltaY'] || 0

                    nodeArr[i]['deltaX'] = deltaX
                    nodeArr[i]['deltaY'] = deltaY

                    nodeArr[i]['x'] += addWidth
                    nodeArr[i]['y'] += addHeight

                }

                ctx.clearRect(0, 0, w, h);

                that.drawDragNode(ctx)
                that.drawDragEdge(ctx)
            }

        });

        that.hammer.on('panend', function (e) {
            EventManager.emitter('onTap', this.data);


            if (that.dragOldNodeArr) {
                that.dragOldNodeArr = []
                that.dragNodeArr = []
            }

            let nodeArr = that.data && that.data['node']


            for (let i = 0; i < nodeArr.length; i++) {

                nodeArr[i]['deltaY'] = 0
                nodeArr[i]['deltaX'] = 0
            }


        });
    }

    mouseWheel = (e) => {

        let zoomIntensity = 0.2;

        let width = this.options.width;
        let height = this.options.height;

        let scale = 1;
        let originx = 0;
        let originy = 0;
        let visibleWidth = width;
        let visibleHeight = height;


        event.preventDefault();
        // Get mouse offset.
        let mousex = event.clientX - this.container.offsetLeft;
        let mousey = event.clientY - this.container.offsetTop;
        // Normalize wheel to +1 or -1.
        let wheel = event.deltaY < 0 ? 1 : -1;

        // Compute zoom factor.
        let zoom = Math.exp(wheel * zoomIntensity);

        // Translate so the visible origin is at the context's origin.
        this.ctx.translate(originx, originy);

        // Compute the new visible origin. Originally the mouse is at a
        // distance mouse/scale from the corner, we want the point under
        // the mouse to remain in the same place after the zoom, but this
        // is at mouse/new_scale away from the corner. Therefore we need to
        // shift the origin (coordinates of the corner) to account for this.
        originx -= mousex / (scale * zoom) - mousex / scale;
        originy -= mousey / (scale * zoom) - mousey / scale;

        console.log('originx--', originx)
        console.log('originy--', originy)
        // Scale it (centered around the origin due to the trasnslate above).
        this.ctx.scale(zoom, zoom);
        // Offset the visible origin to it's proper position.
        this.ctx.translate(-originx, -originy);

        // Update scale and others.
        scale *= zoom;
        visibleWidth = width / scale;
        visibleHeight = height / scale;
        console.log('mouseWheel--', e)
        // 画高亮的node
        let w = this.options.width;
        let h = this.options.height;
        this.ctx.clearRect(-20000, -20000, 20000, 20000);

        this.drawDragNode(this.ctx)
        this.drawDragEdge(this.ctx)

    }

    // 设置node 和 toParam 高亮
    mouseMoveNodeAndToParamHover = (e) => {
        this.hoverNode = ''
        let nodeArr = this.data && this.data['node']
        let x = e.offsetX
        let y = e.offsetY

        // console.log('x--', x)
        // console.log('y--', y)
        this.hoverToParam = ''

        for (let i = 0; i < nodeArr.length; i++) {

            // 先在node里边查找，缩小范围，并且可以给node设置是否高亮的状态
            if (this.isInsideRect(nodeArr[i]['x'], nodeArr[i]['y'], nodeArr[i]['width'], nodeArr[i]['height'], x, y)) {
                nodeArr[i]['highLight'] = true
                for (let j = 0; j < nodeArr[i]['toParamArr'].length; j++) {

                    if (this.isInsideCircle(nodeArr[i]['toParamArr'][j]['x'], nodeArr[i]['toParamArr'][j]['y'], 6, x, y)) {
                        //设置是否高亮
                        nodeArr[i]['toParamArr'][j]['highLight'] = true
                        this.hoverToParam = nodeArr[i]['toParamArr'][j]
                    } else {
                        nodeArr[i]['toParamArr'][j]['highLight'] = false
                    }

                }
            } else {
                nodeArr[i]['highLight'] = false
            }
        }

        EventManager.emitter('onTap', this.data);

        // 画高亮的node
        let w = this.ctx.canvas.clientWidth;
        let h = this.ctx.canvas.clientHeight;
        this.ctx.clearRect(0, 0, w, h);

        this.drawDragNode(this.ctx)
        this.drawDragEdge(this.ctx)
    }

    // 设置node 和 fromParam高亮
    mouseMoveNodeAndFromParamHover = (e) => {
        let nodeArr = this.data && this.data['node']

        let x = e.offsetX
        let y = e.offsetY
        this.hoverFromParam = ''

        for (let i = 0; i < nodeArr.length; i++) {

            // 先在node里边查找，缩小范围，并且可以给node设置是否高亮的状态
            if (this.isInsideRect(nodeArr[i]['x'], nodeArr[i]['y'], nodeArr[i]['width'], nodeArr[i]['height'], x, y)) {
                nodeArr[i]['highLight'] = true
                for (let j = 0; j < nodeArr[i]['fromParamArr'].length; j++) {

                    if (this.isInsideCircle(nodeArr[i]['fromParamArr'][j]['x'], nodeArr[i]['fromParamArr'][j]['y'], 6, x, y)) {
                        //设置是否高亮
                        nodeArr[i]['fromParamArr'][j]['highLight'] = true
                        this.hoverFromParam = nodeArr[i]['fromParamArr'][j]
                    } else {
                        nodeArr[i]['fromParamArr'][j]['highLight'] = false
                    }

                }
            } else {
                nodeArr[i]['highLight'] = false
            }
        }

        // 画高亮的node
        let w = this.ctx.canvas.clientWidth;
        let h = this.ctx.canvas.clientHeight;
        this.ctx.clearRect(0, 0, w, h);

        this.drawDragNode(this.ctx)
        // 动态画线
        this.drawDragMoveEdge(e)

        this.drawDragEdge(this.ctx)
    }

    // 画移动的edge
    drawDragMoveEdge = (e) => {
        let x = e.offsetX
        let y = e.offsetY

        let fromPoint = {
            x: this.hoverToParam['x'],
            y: this.hoverToParam['y']
        }

        let toPoint = {
            x: x,
            y: y
        }

        this.drawEdgeFrame(toPoint, fromPoint, this.ctx)
    }

    // 这个是设置完坐标的，以后要合并
    drawDragNode = (ctx) => {
        let nodeArr = this.data && this.data['node']
        for (let i = 0; i < nodeArr.length; i++) {

            let height = nodeArr[i]['height']
            let width = nodeArr[i]['width']

            let x = nodeArr[i]['x']
            let y = nodeArr[i]['y']

            // node
            if (nodeArr[i] && nodeArr[i]['highLight']) {
                this.hoverNode = nodeArr[i]
                this.drawHighLightNodeFrame(x, y, width, height, ctx)
            } else {
                this.drawNodeFrame(x, y, width, height, ctx)
            }

            let titleX = x + 8
            let titleY = y + 20

            // draw title
            this.drawTitle(titleX, titleY, nodeArr[i]['title'], ctx)


            // from param
            for (let j = 0; j < nodeArr[i]['fromParamArr'].length; j++) {

                let fromParam = nodeArr[i]['fromParamArr'][j]

                let fromParamX = x + 10
                let fromParamY = y + 20 + j * 20 + 20

                if (nodeArr[i]['fromParamArr'][j] && nodeArr[i]['fromParamArr'][j]['highLight']) {
                    this.drawHighLightfromParam(fromParamX, fromParamY, fromParam, ctx)
                } else {
                    this.drawFromParam(fromParamX, fromParamY, fromParam, ctx)
                }


                // 注入坐标
                nodeArr[i]['fromParamArr'][j]['x'] = fromParamX
                nodeArr[i]['fromParamArr'][j]['y'] = fromParamY
            }

            // to param
            for (let j = 0; j < nodeArr[i]['toParamArr'].length; j++) {

                let toParam = nodeArr[i]['toParamArr'][j]

                let toParamX = x + width - 10
                let toParamY = y + 40 + j * 20 + 20

                if (nodeArr[i]['toParamArr'][j] && nodeArr[i]['toParamArr'][j]['highLight']) {
                    this.drawHighLightToParam(toParamX, toParamY, toParam, ctx)
                } else {
                    this.drawToParam(toParamX, toParamY, toParam, ctx)
                }

                // 注入坐标
                nodeArr[i]['toParamArr'][j]['x'] = toParamX
                nodeArr[i]['toParamArr'][j]['y'] = toParamY
            }
        }
    }

    drawDragEdge = (ctx) => {
        let edgeArr = this.data && this.data['edge']
        let nodeArr = this.data && this.data['node']
        for (let i = 0; i < edgeArr.length; i++) {

            // 根据from param 和 to param 的标识，来找到他们各自所在的node
            let toPoint = ''
            let fromPoint = ''

            for (let j = 0; j < nodeArr.length; j++) {

                // 通过分割，拿到 from nodeId
                let fromNodeId = edgeArr[i]['fromParam'].split('-')[0]
                if (nodeArr[j]['nodeId'] == fromNodeId) {

                    for (let k = 0; k < nodeArr[j]['fromParamArr'].length; k++) {
                        if (nodeArr[j]['fromParamArr'][k]['fromParamId'] == edgeArr[i]['fromParam']) {
                            toPoint = nodeArr[j]['fromParamArr'][k]
                        }
                    }
                }

                // 通过分割，拿到 to nodeId
                let toNodeId = edgeArr[i]['toParam'].split('-')[0]
                if (nodeArr[j]['nodeId'] == toNodeId) {

                    for (let k = 0; k < nodeArr[j]['toParamArr'].length; k++) {
                        if (nodeArr[j]['toParamArr'][k]['toParamId'] == edgeArr[i]['toParam']) {
                            fromPoint = nodeArr[j]['toParamArr'][k]
                        }
                    }
                }
            }

            this.drawEdgeFrame(toPoint, fromPoint, ctx)
        }
    }
    /**
     * draw edge
     * */
    drawEdge = (ctx) => {
        let edgeArr = this.data && this.data['edge']
        let nodeArr = this.data && this.data['node']
        for (let i = 0; i < edgeArr.length; i++) {

            // 根据from param 和 to param 的标识，来找到他们各自所在的node
            let toPoint = ''
            let fromPoint = ''

            for (let j = 0; j < nodeArr.length; j++) {

                // 通过分割，拿到 from nodeId
                let fromNodeId = edgeArr[i]['fromParam'].split('-')[0]
                if (nodeArr[j]['nodeId'] == fromNodeId) {

                    for (let k = 0; k < nodeArr[j]['fromParamArr'].length; k++) {
                        if (nodeArr[j]['fromParamArr'][k]['fromParamId'] == edgeArr[i]['fromParam']) {
                            toPoint = nodeArr[j]['fromParamArr'][k]
                        }
                    }
                }

                // 通过分割，拿到 to nodeId
                let toNodeId = edgeArr[i]['toParam'].split('-')[0]
                if (nodeArr[j]['nodeId'] == toNodeId) {

                    for (let k = 0; k < nodeArr[j]['toParamArr'].length; k++) {
                        if (nodeArr[j]['toParamArr'][k]['toParamId'] == edgeArr[i]['toParam']) {
                            fromPoint = nodeArr[j]['toParamArr'][k]
                        }
                    }
                }
            }

            this.drawEdgeFrame(toPoint, fromPoint, ctx)
        }
    }

    /**
     * draw edge frame
     * */
    drawEdgeFrame = (toPoint, fromPoint, ctx) => {
        ctx.moveTo(toPoint['x'], toPoint['y']);
        // ctx.lineWidth = 2
        ctx.strokeStyle = 'gray'
        let controlNode = this.contorlNode({x: toPoint['x'], y: toPoint['y']}, {x: fromPoint['x'], y: fromPoint['y']})
        ctx.bezierCurveTo(toPoint['x'], toPoint['y'], controlNode['x'], controlNode['y'], fromPoint['x'], fromPoint['y'])
        ctx.stroke()


        let dy = toPoint['y'] - fromPoint['y'];
        let dx = toPoint['x'] - fromPoint['x'];
        let angle = Math.atan2(dy, dx);
        let qqq = {
            point: {x: toPoint['x'], y: toPoint['y']},
            angle: angle,
            length: 10
        }
        this.myArrow(this.ctx, qqq)
    }

    /**
     * draw node
     * */
    drawNode = (ctx) => {
        let nodeArr = this.data && this.data['node']
        for (let i = 0; i < nodeArr.length; i++) {

            // 通过content， fromParam， toParam计算node的高度，宽度暂时固定。
            let fromParamLength = nodeArr[i]['fromParamArr'] && nodeArr[i]['fromParamArr'].length || 0
            let toParamLength = nodeArr[i]['toParamArr'] && nodeArr[i]['toParamArr'].length || 0
            let paramHeight = fromParamLength > toParamLength ? fromParamLength * 20 : toParamLength * 20
            let contentHeight = 50
            let height = paramHeight + contentHeight
            let width = 240

            let rightGap = 40
            let topGap = 20

            // 间隙
            let x = 100 + 240 * i + i * rightGap
            let y = 200 + topGap * i


            // node
            this.drawNodeFrame(x, y, width, height, ctx)

            // 注入坐标
            nodeArr[i]['x'] = x;
            nodeArr[i]['y'] = y;
            nodeArr[i]['width'] = width
            nodeArr[i]['height'] = height

            let titleX = x + 8
            let titleY = y + 20

            // draw title
            this.drawTitle(titleX, titleY, nodeArr[i]['title'], ctx)

            // from param
            for (let j = 0; j < nodeArr[i]['fromParamArr'].length; j++) {

                let fromParam = nodeArr[i]['fromParamArr'][j]

                let fromParamX = x + 10
                let fromParamY = y + 20 + j * 20 + 20

                this.drawFromParam(fromParamX, fromParamY, fromParam, ctx)

                // 注入坐标
                nodeArr[i]['fromParamArr'][j]['x'] = fromParamX
                nodeArr[i]['fromParamArr'][j]['y'] = fromParamY
            }

            // to param
            for (let j = 0; j < nodeArr[i]['toParamArr'].length; j++) {

                let toParam = nodeArr[i]['toParamArr'][j]

                let toParamX = x + width - 10
                let toParamY = y + 40 + j * 20 + 20

                this.drawToParam(toParamX, toParamY, toParam, ctx)
                // 注入坐标
                nodeArr[i]['toParamArr'][j]['x'] = toParamX
                nodeArr[i]['toParamArr'][j]['y'] = toParamY
            }
        }
    }

    /**
     * draw node frame
     * */
    drawNodeFrame = (x, y, width, height, ctx) => {
        ctx.fillStyle = '#FFFFFF'
        ctx.strokeStyle = '#919191'
        ctx.lineJoin = "round";
        // ctx.lineWidth = 2
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
    }

    // 高亮
    drawHighLightNodeFrame = (x, y, width, height, ctx) => {
        ctx.fillStyle = '#FFFFFF'
        ctx.strokeStyle = '#ADFF2F'
        ctx.lineJoin = "round";

        // ctx.lineWidth = 4
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
    }

    drawTitle = (titleX, titleY, title, ctx) => {
        ctx.beginPath();
        ctx.fillStyle = '#708090'
        ctx.font = '12px'
        ctx.fillText(title, titleX, titleY)
        ctx.closePath();
        ctx.fill();
    }

    /**
     * draw from param
     * */
    drawFromParam = (x, y, fromParam, ctx) => {
        ctx.beginPath();
        ctx.fillStyle = '#A2CD5A'
        ctx.arc(x, y, 6, 0, Math.PI * 2, true);
        ctx.font = '18px'
        ctx.fillText(`${fromParam && fromParam['content']}`, x + 10, y + 4)
        ctx.closePath();
        ctx.fill();
    }

    drawHighLightfromParam = (x, y, fromParam, ctx) => {
        ctx.beginPath();
        ctx.fillStyle = '#A2CD5A'
        ctx.font = '18px'
        ctx.fillText(`${fromParam && fromParam['content']}`, x + 10, y + 4)

        ctx.fillStyle = '#1E90FF'
        ctx.strokeStyle = '#FFFF00'
        ctx.arc(x, y, 6, 0, Math.PI * 2, true);

        ctx.closePath();
        ctx.fill();
    }

    /**
     * draw to param
     * */
    drawToParam = (x, y, toParam, ctx) => {

        let textWidth = this.getTextWidth(toParam, '18px', ctx)
        ctx.beginPath();

        ctx.fillStyle = '#CD5B45'
        ctx.font = '18px'
        ctx.fillText(`${toParam && toParam['content']}`, x - textWidth, y + 4)
        ctx.arc(x, y, 6, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    drawHighLightToParam = (x, y, toParam, ctx) => {

        let textWidth = this.getTextWidth(toParam, '18px', ctx)
        ctx.beginPath();

        ctx.fillStyle = '#CD5B45'
        ctx.font = '18px'
        ctx.fillText(`${toParam && toParam['content']}`, x - textWidth, y + 4)

        ctx.fillStyle = '#1E90FF'
        ctx.strokeStyle = '#FFFF00'
        // ctx.lineWidth = 2
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * get text width
     * */
    getTextWidth = (text, font, ctx) => {
        ctx.font = font
        let result = ctx.measureText(text)
        return result.width
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

    /**
     * 判断是否在圆内
     * */
    isInsideCircle = (x0, y0, r, x, y) => {
        return ((x - x0) * (x - x0) + (y - y0) * (y - y0)) < r * r;
    }

    /**
     * 判断是否在长方形内
     * */
    isInsideRect = (x0, y0, width, height, x, y) => {
        return x >= x0 && x <= (x0 + width) && y >= y0 && y <= (y0 + height);
    }


    canvasMouseMove = (e, ctx, canvas, toParam) => {
        let x = e.x;
        let y = e.y;
        let nodeArr = this.data && this.data['node']

        // from param
        for (let i = 0; i < nodeArr.length; i++) {

            for (let j = 0; j < nodeArr[i]['fromParamArr'].length; j++) {

                let fromParam = nodeArr[i]['fromParamArr'][j]
                let x0 = fromParam['x']
                let y0 = fromParam['y']
                let from = this.isInsideCircle(x0, y0, 6, x, y)

                if (from) {
                    ctx.moveTo(toParam['x'], toParam['y']);
                    // ctx.lineWidth = 2
                    ctx.strokeStyle = 'gray'
                    let controlNode = this.contorlNode({x: toParam['x'], y: toParam['y']}, {
                        x: fromParam['x'],
                        y: fromParam['y']
                    })
                    ctx.bezierCurveTo(toParam['x'], toParam['y'], controlNode['x'], controlNode['y'], fromParam['x'], fromParam['y'])
                    ctx.stroke()
                    // canvas.removeEventListener('mousedown', (e) => this.canvasMouseMove(e, ctx, canvas, toParam))
                }
            }
        }

        // let to = this.isInsideCircle(610, 410, 6, e.x, e.y)
        // if (to) {
        //     ctx.moveTo(440, 300);
        //     ctx.lineWidth = 2
        //     ctx.strokeStyle = 'gray'
        //     let controlNode = this.contorlNode({x: 440, y: 300}, {x: e.x, y: e.y})
        //     ctx.bezierCurveTo(440, 300, controlNode['x'], controlNode['y'], 610, 410)
        //     ctx.stroke()
        // }
    }

    // 设置数据
    setData = () => {

    }

    zoom(scale, pointer) {
        let scaleOld = this.body.view.scale;
        if (scale < 0.00001) {
            scale = 0.00001;
        }
        if (scale > 10) {
            scale = 10;
        }

        let preScaleDragPointer = undefined;
        if (this.drag !== undefined) {
            if (this.drag.dragging === true) {
                preScaleDragPointer = this.canvas.DOMtoCanvas(this.drag.pointer);
            }
        }
        // + this.canvas.frame.canvas.clientHeight / 2
        let translation = this.body.view.translation;

        let scaleFrac = scale / scaleOld;
        let tx = (1 - scaleFrac) * pointer.x + translation.x * scaleFrac;
        let ty = (1 - scaleFrac) * pointer.y + translation.y * scaleFrac;

        this.body.view.scale = scale;
        this.body.view.translation = {x: tx, y: ty};

        if (preScaleDragPointer != undefined) {
            let postScaleDragPointer = this.canvas.canvasToDOM(preScaleDragPointer);
            this.drag.pointer.x = postScaleDragPointer.x;
            this.drag.pointer.y = postScaleDragPointer.y;
        }

        this.body.emitter.emit('_requestRedraw');

        if (scaleOld < scale) {
            this.body.emitter.emit('zoom', {direction: '+', scale: this.body.view.scale, pointer: pointer});
        }
        else {
            this.body.emitter.emit('zoom', {direction: '-', scale: this.body.view.scale, pointer: pointer});
        }
    }

    onMouseWheel(event) {
        // retrieve delta
        let delta = 0;
        if (event.wheelDelta) { /* IE/Opera. */
            delta = event.wheelDelta / 120;
        }
        else if (event.detail) { /* Mozilla case. */
            // In Mozilla, sign of delta is different than in IE.
            // Also, delta is multiple of 3.
            delta = -event.detail / 3;
        }

        // If delta is nonzero, handle it.
        // Basically, delta is now positive if wheel was scrolled up,
        // and negative, if wheel was scrolled down.
        if (delta !== 0) {

            // calculate the new scale
            let scale = this.body.view.scale;
            let zoom = delta / 10;
            if (delta < 0) {
                zoom = zoom / (1 - zoom);
            }
            scale *= (1 + zoom);

            // calculate the pointer location
            let pointer = this.getPointer({x: event.clientX, y: event.clientY});

            // apply the new scale
            this.zoom(scale, pointer);
        }

        // Prevent default actions caused by mouse wheel.
        event.preventDefault();
    }

    getPointer(touch) {
        return {
            x: touch.x - util.getAbsoluteLeft(this.canvas.frame.canvas),
            y: touch.y - util.getAbsoluteTop(this.canvas.frame.canvas)
        };
    }

    myArrow = (ctx, arrowData) => {

        let points = [
            {x: 0, y: 0},
            {x: -1, y: 0.3},
            {x: -0.9, y: 0},
            {x: -1, y: -0.3},
        ];

        this.myTransform(points, arrowData);
        this.myDrawPath(ctx, points);
    }


    myTransform = (points, arrowData) => {
        if (!(points instanceof Array)) {
            points = [points];
        }

        let x = arrowData.point.x;
        let y = arrowData.point.y;
        let angle = arrowData.angle
        let length = arrowData.length;

        for (let i = 0; i < points.length; ++i) {
            let p = points[i];
            let xt = p.x * Math.cos(angle) - p.y * Math.sin(angle);
            let yt = p.x * Math.sin(angle) + p.y * Math.cos(angle);

            p.x = x + length * xt;
            p.y = y + length * yt;
        }
    }

    myDrawPath = (ctx, points) => {

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; ++i) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        // ctx.fillStyle="#0000ff";

        ctx.fill();

        ctx.closePath();
        ctx.stroke()

    }


}

export default Network















































