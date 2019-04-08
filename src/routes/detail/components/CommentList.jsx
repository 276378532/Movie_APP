import React from 'react';
import PropTypes from 'prop-types';
import Star from '../../../components/Star'
import CollapsibleText from '../../../components/CollapsibleText'
import '../../../css/CommentList.css'

const CommentList = ({ data,onClickZan}) => {
    return (
        <ul className="commentList">
            {
                data.map(item => (
                    <li key={item.id}>
                        <div className="commentItem">
                            <div className="commentUser">
                                <div className="commentUser__avatar" style={{ backgroundImage: 'url(/source/default-avatar.jpg)' }}></div>
                                <div className="commentUser__detail">
                                    <div className="commentUser__name">{item.name}</div>
                                    <div className="commentUser__score">
                                        <Star value={item.score} />
                                        <span className="commentUser__value">{item.score}</span>
                                    </div>
                                </div>
                            </div>
                            <CollapsibleText height={112}>{item.content}</CollapsibleText>
                            <div className="commentItem__detail">
                                <div className="commentItem__time">{item.time}</div>
                                <div className={`commentItem__zan ${item.isZan && 'commentItem__zan--active'} `}>
                                    <i onClick={() => onClickZan(item.id)}/> {item.zan}
                                </div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

CommentList.propTypes = {
    data: PropTypes.array.isRequired,
    onClickZan:PropTypes.func.isRequired,
};

export default CommentList;