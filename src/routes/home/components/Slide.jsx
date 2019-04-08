import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import '../../../css/Slide.css'

const PosterSlide = ({data}) => {
    //console.log(data); 怎么会输出[]而没有数据
    const settings = {
        dots: true,
        autoplay: true,
        className:'postSlide',
        dotsClass:'postSlide__dots',
        data:data
    };
    return (
        <Slider {...settings}>
        {
            
            data.map(item=>(
                <div key={item.image}>
                    <img className="postSlide__img" src={item.image} alt="" />
                </div>
            ))
        }
        </Slider> 
    );
};

Slider.propTypes={
    data:PropTypes.array.isRequired
}

export default PosterSlide;