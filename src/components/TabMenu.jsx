import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../css/TabMenu.css'

const TabMenu=({ current })=>{
    
    return(
        <div className='tabMenu'>
            <Link to='/' className={`tabMenu__btn  ${current==='movie' && 'tabMenu__btn--active'}`}>
                <i className="tabMenu__icon tabMenu__icon--movie"></i>
                <span className="tabMenu__text">电影</span>    
            </Link>
            <Link to='/user' className={`tabMenu__btn  ${current==='user' && 'tabMenu__btn--active'}`}>
                <i className="tabMenu__icon tabMenu__icon--user"></i>
                <span className="tabMenu__text">我的</span>  
            </Link>
        </div>
    );
};

TabMenu.propTypes={
    current:PropTypes.string.isRequired
};


export default TabMenu;
