/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 15:22:19
 * @LastEditors: your name
 * @LastEditTime: 2020-07-07 15:40:18
 */ 
export default {
    init () {
        // 基准大小
        const baseSize = 14
        // 设置 rem 函数
        function setRem () {
            // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
            const scale = document.documentElement.clientWidth / 750
            // 设置页面根节点字体大小
            document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
        }
        // 初始化
        setRem()
        // 改变窗口大小时重新设置 rem
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
            setRem()
        }, false)
    }
}