import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopBar from './components/TopBar';
import Slide from './components/Slide';
import MovieItem from './components/Movieltem';
import TabMenu from '../../components/TabMenu'
import RenderToBody from '../../components/RenderToBody'
import CityLayer from './components/CityLayer'
import request from '../../helpers/request'
import { Link } from 'react-router-dom'


class Home extends Component {

    state = {
        city: '',//当前城市
        poster: [],//slide海报
        movie: [],//当前热映电影
        cityLayerVisible: false//城市浮层是否展现

    }

    //切换到城市界面
    showCityLayer = () => {
        this.setState({
            cityLayerVisible:true
        });
    }
    //关闭城市界面
    hideCityLayer=()=>{
        this.setState({
            cityLayerVisible:false
        })
    }
    //更改城市
    onChangeCity=(city)=>{
        this.setState({
            city,
        });
        this.hideCityLayer();
    }

    //钩子函数
    componentWillMount() {
        this.getData();
        // this.getCity();
    }
    //得到首页数据
    getData = async () => {
        const data = await request('/index');
        const { city, poster, movie } = data;
        this.setState({
            city,
            poster,
            movie
        });
    }
    //得到城市信息
    // getCity = async () => {
    //     const data = await request('/city');
    // }

    render() {
        const { city, poster, movie,cityLayerVisible } = this.state;

        return (
            <div className="home">
                <TopBar city={city} showCityLayer={this.showCityLayer} />
                <div className="home__slide">
                    <div className="home__sliderWrap">
                        <Slide data={poster} />
                    </div>
                </div>
                <ul className="home__content">
                    { movie.map(item =>{return <li key={item.name} ><Link to='/detail'><MovieItem data={item} /></Link></li>}) }
                </ul>
                <TabMenu current="movie" />
                { cityLayerVisible && <RenderToBody><CityLayer onClose={this.hideCityLayer} onSelect={this.onChangeCity}/></RenderToBody> }
            </div>
        );
    }
}

Home.propTypes = {};
export default Home;