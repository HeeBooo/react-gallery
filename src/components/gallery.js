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


// 单个图片
const ImgFigure = (props) =>{
    return (
        <figure className="img-figure">
            <img src={props.data.imageURL}
                 alt={props.data.title} />
            <figcaption>
                <h2 className="img-title">{props.data.desc}</h2>
            </figcaption>
        </figure>
    )
}


class Gallery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            constant: {
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
                    topy: [0, 0]
                }
            }
        }
    };
    
    componentDidMount () {
        // 将图片信息转为图片URL路径信息
        let data = (function genImageURL (imageDatasArr) {
            let singleImageData;
            for (let i = 0; i < imageDatasArr.length; i++) {
                singleImageData = imageDatasArr[i];
                singleImageData.imageURL = require('../images/' + singleImageData.fileName);
                imageDatasArr[i] = singleImageData;
            }
            return imageDatasArr;
        })(imageDatas);
        // 组件加载以后，为每张图片计算其位置的范围
        // 获取stage的节点
        let stageDom = ReactDOM.findDOMNode(this.refs.stage);
        // stageW = stageDom.scrollWidth,
        // stageH = stageDom.scrollHeight;
        console.log(stageDom)
        return data;
    };
    componentDidUpdate () {

    }
    render () {
        let controllerUnits = [],
            imgFigures = [],
            data = this.componentDidMount();

        // 将单个图片插入到数组中,再将数组imgFigures放入section中
        data.forEach((value, index) => {
            imgFigures.push(<ImgFigure data={value} key={'imgFigures'+index} />)
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
// 左分区 0 - ImgFigure.width/2 < x < stage.width/2 - ImgFigure.width/2*3
//       0 - ImgFigure.height/2 < y < stage.height - ImgFigure.height/2
// 右分区 stage.width/2 + ImgFigure.width/2 < x < stage.width - ImgFigure.width/2
//       0 - ImgFigure.height/2 < y < stage.height - ImgFigure.height/2
// 上分区 stage.width/2 - ImgFigure.width < x < stage.width/2
//       0 - ImgFigure.height/2 < y < stage.height - ImgFigure.height/2*3
export default Gallery;
