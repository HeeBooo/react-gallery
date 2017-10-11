import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// 图片相关信息
import imageDatas from '../data/imageDatas.json';

// 引入 ECharts 主模块
// import echarts from 'echarts/lib/echarts';
// import  'echarts/lib/chart/bar';
// import  'echarts/lib/chart/line';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/legend';


import '../scss/index.scss';

// 获取区间内的一个随机值
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

// 获取0到30度之间的任意正负值
function get30DegRandom() {
    const baseDeg = 30;
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * baseDeg));
}
// 将图片信息转为图片URL路径信息
function genImageURL (imageDatasArr) {
    let singleImageData;
    for (let i = 0; i < imageDatasArr.length; i++) {
        singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
};

// 单个图片组件
class ImgFigure extends Component {
    
    handleClick = (e) => {
        // console.log('123')
        this.props.inverse();
        e.stopPropagation();
        e.preventDefault(); 
    };

    render () {
        const { arrange, data } = this.props;
        let styleObj = {};
        let imgFigureClassName = "img-figure";
        //  如果props属性中指定了这张图片的位置，则使用
        if (arrange) {
            styleObj = arrange.pos;
            // 如果图片的旋转角度有值并且不为0，添加旋转角度
            ['Moz', 'ms', 'Webkit', ''].forEach(value => {
                styleObj['transform'] = 'rotate(' + arrange.rotate + 'deg)';
			});
	        //设置图片翻转样式  正面 .img-figure   反面 .img-figure is-inverse
            imgFigureClassName += arrange.isInverse ? ' is-inverse' : '';
        }
        
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={data.imageURL} alt={data.title} />    
                <figcaption>
                    <h2 className="img-title">{data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

class Gallery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            imgsArrangeArr: [
                // {
                //     pos: {
                //         left: '0',
                //         top: '0'
                //     },
                //     rotate: 0,  // 旋转角度
                //     isInverse: false // 正反面
                // }
            ]
        };
        this.constant = {
            centerPos: {
                left: 0,
                right: 0
            },
            // 水平方向取值范围
            hPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            // 垂直方向取值范围
            vPosRange: {
                x: [0, 0],
                topY: [0, 0]
            }
        };
    };

    // 重新布局所有图片 centerIndex指定居中哪个图片
    rearrange (centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr;
        
        let constant = this.constant,
            centerPos = constant.centerPos,
            hPosRange = constant.hPosRange,
            vPosRange = constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), // 取一个或者不取
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        console.log(imgsArrangeCenterArr)
        
        // 首先居中centerIndex的图片,不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isInverse: false
        };
        
        console.log('中心图片:');
        console.log(imgsArrangeCenterArr);
        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        
        // 布局上侧图片
        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isInverse: false
            }
        })
        console.log('顶部有' + topImgNum + '张图片:');
        console.log(imgsArrangeTopArr[0])
        
        // 布局左右两侧的图片
        for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            let hPosRangeLORX = null;
            if (i < k) {
                // 前半部分布局左边，后半部分布局右边
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isInverse: false
            }
        }
        
        // 把取出来的顶部图片放回imgsArrangeArr数组中
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        })
    };

    // 翻转图片，输入当前被执行inverse操作的图片对应的图片信息数组的index值
    inverse = (index) => {
        return () => {
            let imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        };
    };

    componentDidMount () {
        // 组件加载以后，为每张图片计算其位置的范围,
        // 获取stage的节点，不能在render中和render之前使用ReactDOM.findDOMNode

        // scrollWidth实际宽度，不包含滚动条, 会随着内容的宽度变大
        // clientWidth可视区域的宽度，不包含滚动条，会随对象显示大小而改变
        // offestWidth整体的宽度，包含滚动条，会随对象显示大小而改变
        let stageDom = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDom.scrollWidth, // 宽
            stageH = stageDom.scrollHeight, // 高
            halfStageW = Math.ceil(stageW / 2), // 一半宽
            halfStageH = Math.ceil(stageH / 2); // 一半高

        // 获取单个imgFigure的大小
        let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDom.scrollWidth,
            imgH = imgFigureDom.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        this.constant = {
            // 计算中心图片的位置点
            centerPos: {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            },
            // 计算左右两侧图片排布位置的取值范围
            hPosRange: {
                leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
                rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
                y: [-halfImgH, stageH - halfImgH]
            },
            // 计算上侧图片排布位置的取值范围
            vPosRange: {
                topY: [-halfImgH, halfStageH - halfImgH * 3],
                x: [halfStageW - imgW, halfStageW]
            }        
        }
  
        // 随机生成一个0-16的整数在最中间展示
        const randomNum = Math.floor(Math.random() * 16);
        this.rearrange(randomNum);
    };
    
    render () {
        let controllerUnits = [],
            imgFigures = [],
            data = genImageURL(imageDatas),
            imgsArrangeArr = this.state.imgsArrangeArr;
        // 将单个图片插入到数组中,再将数组imgFigures放入section中
        data.forEach((value, index) => {
            // 如果当前没对象，则初始化
            for (let i = 0; i < data.length; i++) {
                if (!imgsArrangeArr[i]) {
                    imgsArrangeArr.push({
                        pos: {
                            left: 0,
                            top: 0
                        },
                        rotate: 0,
                        isInverse: false
                    })
                }
            }

            imgFigures.push(
                <ImgFigure 
                    data={value} 
                    key={'imgFigure' + index} 
                    ref={'imgFigure' + index} 
                    arrange={imgsArrangeArr[index]}
                    inverse={this.inverse(index)}
                />
            )
        })
        
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        )
    }
}

export default Gallery;

// 左分区 0 - ImgFigure.width/2 < x < stage.width/2 - ImgFigure.width/2*3
//       0 - ImgFigure.height/2 < y < stage.height - ImgFigure.height/2
// 右分区 stage.width/2 + ImgFigure.width/2 < x < stage.width - ImgFigure.width/2
//       0 - ImgFigure.height/2 < y < stage.height - ImgFigure.height/2
// 上分区 stage.width/2 - ImgFigure.width < x < stage.width/2
//       0 - ImgFigure.height/2 < y < stage.height - ImgFigure.height/2*3
