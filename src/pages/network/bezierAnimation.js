
/**
 * bezier animation
 * */

class BezierAnimation {

    /**
     * @param {int}     unitTime    单位时间，初始值为0，最大值为1
     * @param {arr}        fromArr      起点
     * @param {arr}        controlArr   控制点
     * @param {arr}        toArr        终点
     */
    constructor(fromArr, toArr, controlArr) {
        this.unitTime = 0
        this.fromArr = fromArr
        this.toArr = toArr
        this.controlArr = controlArr
    }

    /**
     * @param {canvas}     ctx          画布
     * @param {float}      speed        单位时间
     */
    drawBezierAnimation = (ctx, speed, arr) => {

        // let w = ctx.canvas.clientWidth;
        // let h = ctx.canvas.clientHeight;
        let t = this.unitTime;
        // 每间隔42ms
        this.unitTime += speed;
        if (this.unitTime > 1) {
            this.unitTime = 0;
        }
        ctx.clearRect(-10000, -10000, 20000, 20000);
        for (let i = 0; i < this.fromArr.length; i++) {

            if (arr[i]['success'] > 0) {
                let len = arr[i]['success']
                for (let k = 0; k < len; k++) {
                    let kt = t + speed * k * 16
                    for (let j = 0; j < 5; j++) {
                        let st = kt - speed * j * 1.5
                        let xt = (1 - st) * (1 - st) * this.fromArr[i].x + 2 * st * (1 - st) * this.controlArr[i].x + st * st * this.toArr[i].x;
                        let yt = (1 - st) * (1 - st) * this.fromArr[i].y + 2 * st * (1 - st) * this.controlArr[i].y + st * st * this.toArr[i].y
                        if (st < 0 || st > 1) {
                            ctx.fillStyle = `rgba(0, 0, 0, 0)`;
                        } else {
                            ctx.fillStyle = `rgba(255, 255, 255, ${1 - 0.2 * j})`;
                        }
                        ctx.beginPath();
                        ctx.arc(xt, yt, 4, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
        }
    }

}

export default BezierAnimation;