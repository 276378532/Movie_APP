import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import BaseInfo from '../detail/components/BaseInfo';
import ScoreSummary from '../detail/components/ScoreSummary';
import CollapsibleText from '../../components/CollapsibleText';
import Artist from '../detail/components/Artist';
import request from '../../helpers/request';
import Commment from '../detail/container/Comment';
import Linelink from '../../components/LineLink';
import { Link } from 'react-router-dom';
import ImageSlider from '../detail/container/ImageSlide';
import '../../css/datail-index.css';


class Detail extends Component{

    state={
        artist:[],
        showImage:false
    }
    componentWillMount(){
        this.getArtist();
    }   

    getArtist = async () => {
        const data =  await request('/artist');
        
        if(data && data.length){
            this.setState({
                artist:data
            });
        }
    }

    toggleImage = () => {
        this.setState({
          showImage:!this.state.showImage  
        })
    }


    render(){
        const { artist } = this.state;
        return(
            <div className="detail">
                <div className="detail__top">
                    <div className="tOperator">
                        <div className="tOperator__icon tOperator__icon--back" onClick={()=>{window.history.back()}}></div>
                        <div className="tOperator__icon tOperator__icon--share"></div>
                    </div>
                    <BaseInfo onShowImage={this.toggleImage}/>
                </div>
                <div className="detail__content">
                    <div className="detail__module">
                        <ScoreSummary/>
                    </div>
                    <div className="detail__module">
                    <CollapsibleText height={112}>
                        <div className="detail__overview">的
                            唐仁（王宝强 饰）为巨额奖金欺骗秦风（刘昊然 饰）到纽约参加世界名侦探大赛，然而随着和世界各国侦探们啼笑皆非较量，
                            唐仁（王宝强 饰）为巨额奖金欺骗秦风（刘昊然 饰）到纽约参加世界名侦两人却发现了隐藏在这次挑战背后的更大秘展开,两人却发现了隐藏在这次挑战背后的更大秘展开
                        </div>
                    </CollapsibleText>
                    </div>
                    <div className="detail__module">
                        <h3 className="detail__moduleTitle">演职人员</h3>
                        <Artist data={artist}/>
                    </div>
                    <div className="detail__module">
                        <h3 className="detail__moduleTitle">热门评论</h3>
                        <Commment/>
                    </div>
                    <div className="detail__module">
                        <h3 className="detail__moduleTitle">影片资料</h3>
                        <div>
                            <Linelink href='' title='幕后花絮'/>
                            <Linelink href='' title='台词精选'/>
                            <Linelink href='' title='出品发行'/>
                        </div>
                    </div>
                </div>
                <Link to='/seat' className='detail__buyBtn'>选座购票</Link>
                {this.state.showImage &&<ImageSlider onClose={this.toggleImage}/>}
            </div>
        );
    }
}

Detail.propTypes = {

};

export default Detail;