import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../css/CollapsibleText.css'
class CollapsibleText extends Component {
    state = {
        isCollapse: false,
        isNeedCollapse: false
    }
    
    // defaultProps = {
    //    height:84
    // }

    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this);
        const value = this.props.height;
        // console.log(dom.clientHeight);
        if (dom.clientHeight > value) {
            this.setState({
                isCollapse: true,
                isNeedCollapse: true
            });
        }
    }

    toggleStatus = () => {
        if (this.state.isNeedCollapse) {
            this.setState((prevState) => ({
                isCollapse: !prevState.isCollapse
            }));
            // this.setState({
            //     isCollapse: !this.state.isCollapse,
            // })
        }
    }
    render() {
        const { isCollapse } = this.state;
        const cls = isCollapse ? 'collapsibleText--collapse' : '';//collapsibleText--nocollapse
        const maxHeight = isCollapse ? this.props.height : 'none';
        
        return (
            <div className={`collapsibleText ${cls}`} style={{ maxHeight:maxHeight}} onClick={this.toggleStatus}>
                {this.props.children}
                {isCollapse && <div className='collapsibleText__label'>展开</div>}
            </div>
        )
    }
}

CollapsibleText.propTypes = {
    children: PropTypes.any,
    height: PropTypes.number
}

export default CollapsibleText;