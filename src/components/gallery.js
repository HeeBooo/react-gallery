import React from 'react';
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
import ImgFigure from './imgFigure';

class Gallery extends React.Component {
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
        return data;
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
            <section className="stage">
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
