import React from 'react';
import PropTypes from 'prop-types';
import '../css/Star.css'

const Star = ({ value, size = 15 }) => {


    return (
        <div className="star" style={{ height: size, width: size * 5 }}>
            <div className="star__Top" style={{ width: `${(value * 10)>100 ? 100 :value * 10 }%`,backgroundSize:`${size}px ${size}px` }}></div>
        </div>
    );
};

Star.propTypes = {
    value: PropTypes.number.isRequired,
    size: PropTypes.number
}

export default Star;