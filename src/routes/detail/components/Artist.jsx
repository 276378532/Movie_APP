import React from 'react';
import PropTypes from 'prop-types';

import '../../../css/Artist.css'

const Artist = ({ data }) => {
    
    return (
        <div className="mArtist">
            <ul className="mArtist__list">
                {
                    data.map(item => {
                        
                        return(
                        <li className="" key={item.name}>
                            <a href="" className="artistInfo">
                                <div className="artistInfo__image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                <div>
                                    <dl className="artistInfo__name">{item.name}</dl>
                                    <dd className="artistInfo__job">{item.job}</dd>
                                </div>
                            </a>
                        </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

Artist.propTypes = {
    data: PropTypes.array.isRequired,
}

export default Artist;