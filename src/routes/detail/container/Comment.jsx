import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScoreDistrubute from '../components/ScoreDistrubute';
import TagList from '../components/TagList';
import CommentList from '../components/CommentList';
import request from '../../../helpers/request';
import '../../../css/Comment.css';

class Comment extends Component {
    state = {
        tags: [],
        comments: [],
        current: ''//当前选中的标签
    }

    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const { tags, list } = await request('/comment');
        // console.log(data);
        this.setState({
            tags,
            comments: list,
            current: tags[0] ? tags[0].text : ' '
        });
    }
    changeTag = value => {
        this.setState({
            current: value
        })
    }

    toggleZan = id => {
        this.setState((prevState) => ({
            comments:prevState.comments.map(comment => {
                if(comment.id===id){
                    return{
                        ...comment,
                        isZan:!comment.isZan,
                        zan:comment.isZan ? --comment.zan : ++comment.zan
                    };
                }
                return {...comment};
            })
        }));
    }

    render() {
        const { tags, comments, current } = this.state;
        const filterComments = comments.filter(comment => comment.tag === current);
        return (
            <div className="mComment">
                <ScoreDistrubute />
                <div style={{ marginTop: 16 }}>
                    <TagList data={tags} current={current} onClick={this.changeTag} />
                </div>
                <div style={{ marginTop: 16 }}>
                    <CommentList data={filterComments} onClickZan={this.toggleZan} />
                </div>
            </div>
        )
    }
}
Comment.propTypes = {

};

export default Comment;