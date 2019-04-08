import React , { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from 'react-slick';
import '../../../css/ImageSlide.css';

class ImageSlide extends Component{
    state={
        index:1
    }
    changeIndex = index => {
        this.setState({
            index:index+1
        });
    }
   
    render(){
        const setting = {
            className : 'imageSlide__content',
            afterChange :this.changeIndex
        }

        return(
            <div className="imageSlide" onClick={this.props.onClose}>
                    <div className="imageSlide__index">
                        {this.state.index}/6
                    </div>
                <Slide {...setting}>
                    <div className="imageSlide__item">
                        <img className="imageSlide__img" src="/source/image/asset1.jpeg" alt="/"/>
                    </div>
                    <div className="imageSlide__item">
                        <img className="imageSlide__img" src="/source/image/asset2.jpeg" alt="/"/>
                    </div>
                    <div className="imageSlide__item">
                        <img className="imageSlide__img" src="/source/image/asset3.jpeg" alt="/"/>
                    </div>
                    <div className="imageSlide__item">
                        <img className="imageSlide__img" src="/source/image/asset4.jpeg" alt="/"/>
                    </div>
                    <div className="imageSlide__item">
                        <img className="imageSlide__img" src="/source/image/asset5.jpeg" alt="/"/>
                    </div>
                    <div className="imageSlide__item">
                        <img className="imageSlide__img" src="/source/image/asset6.jpeg" alt="/"/>
                    </div>
                </Slide>
            </div>
        );
    }
}

ImageSlide.propTypes={
    onClose:PropTypes.func.isRequired
};

export default ImageSlide;