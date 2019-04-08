import  React , { Component }from 'react';
import PropTypes from 'prop-types';
import {data} from '../mock/seat.json';
import { connect } from 'react-redux';
import { addSeat , removeSeat } from '../actions'
import '../../../css/SeatSelector.css';

const SEAT_WIDTH = 50;
const SEAT_HEIGHT = 50;
const ratio=window.devicePixelRatio;
const DRAW_SEAT_WIDTH=SEAT_WIDTH*ratio;
const DRAW_SEAT_HEIGHT=SEAT_HEIGHT*ratio;

const lastSeat = data[data.length-1];
const CAVANS_WIDTH = lastSeat.colIndex*SEAT_WIDTH;
const CAVANS_HEIGHT = lastSeat.rowIndex*SEAT_HEIGHT;
const DRAW_CAVANS_WIDTH=CAVANS_WIDTH*ratio;
const DRAW_CAVANS_HEIGHT=CAVANS_HEIGHT*ratio;
// console.log(CAVANS_HEIGHT,CAVANS_WIDTH)
// let col=1;
// let row=1;
// const CAVANS_WITH=data.forEach(seat => {
//     if(seat.rowIndex>row){
//         row=seat.rowIndex;
//     }
//     if(seat.colIndex>col){
//         col=seat.colIndex;
//     }
// });

class SeatSelectot extends Component{

    componentDidMount(){

        this.ctx=this.refs.canvas.getContext('2d');
        this.ctx.font = `${10 * ratio}px Arial`;
        this.ctx.fillStyle='#fff';
        this.ctx.textAlign='center'
        // console.log(this.ctx);
        //加载需要的图片资源
        const emptyImage = new Image();
        const selectImage = new Image();
        const soldImage = new Image();

        let count = 0;

        const loadCallback= () => {
            count++;
            // console.log(count);
            if(count === 3){
                this.emptyImage = emptyImage;
                this.selectImage = selectImage;
                this.soldImage = soldImage;
                this.drawAllSeat();
            }
        };

        emptyImage.onload = loadCallback;
        selectImage.onload = loadCallback;
        soldImage.onload = loadCallback;

        emptyImage.src='./source/seat-empty.png';
        selectImage.src='./source/seat-selected.png';
        soldImage.src='./source/seat-sold.png';
    }

    componentDidUpdate(prevProps,prevState){
        this.ctx.clearRect(0,0,DRAW_SEAT_WIDTH,DRAW_SEAT_HEIGHT);
        this.drawAllSeat();
        this.drawSelectSeat();
    }

    drawAllSeat = ()=>{
        const seatData = data;

        for(let i=0; i<seatData.length;i++){
            const { isSold, xPos, yPos} = seatData[i];
            const offsetLeft = (xPos - 1)* DRAW_SEAT_WIDTH;
            const offsetTop = (yPos - 1)*DRAW_SEAT_HEIGHT;
            if(!isSold){
                //绘制已售样式
                this.ctx.drawImage(this.soldImage,offsetLeft,offsetTop,DRAW_SEAT_WIDTH,DRAW_SEAT_HEIGHT)
            }else{
                //绘制空坐样式
                this.ctx.drawImage(this.emptyImage,offsetLeft,offsetTop,DRAW_SEAT_WIDTH,DRAW_SEAT_HEIGHT)
                
            }
        }
    }

    drawSelectSeat=()=>{
        const { selectSeat } = this.props;

        for(let i = 0; i < selectSeat.length; i++){
            const { xPos, yPos,rowIndex,colIndex } = selectSeat[i];
            const offsetLeft = (xPos - 1)* DRAW_SEAT_WIDTH;
            const offsetTop = (yPos - 1)*DRAW_SEAT_HEIGHT;
            this.ctx.drawImage(this.selectImage,offsetLeft,offsetTop,DRAW_SEAT_WIDTH,DRAW_SEAT_HEIGHT)
            this.ctx.fillText(`${rowIndex}排`,offsetLeft+DRAW_SEAT_WIDTH/2,offsetTop+DRAW_SEAT_HEIGHT/3);
            this.ctx.fillText(`${colIndex}座`,offsetLeft+DRAW_SEAT_WIDTH/2,offsetTop+DRAW_SEAT_HEIGHT*2/3);
        }
    }

    clickSeat = (e)=>{
        // console.log(e.pageX);
        // console.log(e.pageY);
        const offset = this.refs.canvas.getBoundingClientRect();
        const clickX = e.pageX-offset.left;
        const clickY = e.pageY-offset.top;
        const xPos = Math.ceil(clickX/SEAT_WIDTH);
        const yPos = Math.ceil(clickY/SEAT_HEIGHT);
        // console.log(xPos);
        // console.log(yPos);
        const seat = data.find(seat => seat.xPos === xPos && seat.yPos === yPos)
        
        //逻辑
        //如果未找到或者当前座位已售。则不响应

        if(!seat || !seat.isSold){
            return;
        }

        const seatIndex = this.props.selectSeat.findIndex(item => item.id === seat.id)

        if(seatIndex > -1){
            //如果已经选择了，需要取消选择。反之选择座位            
            this.props.onRemove(seat.id);
        }else{
            if((this.props.selectSeat.length >= 4)){
            //如果已经选择了四个座位，则不能再选
                
                alert('不能超过四个座位');
            }else{
                this.props.onAdd(seat);
            }
            
        }

        // console.log(seat)
    }

    render(){
        
        return(
            <canvas onClick={this.clickSeat} style={{width:CAVANS_WIDTH ,height:CAVANS_HEIGHT}}ref="canvas" width={DRAW_CAVANS_WIDTH} height={DRAW_CAVANS_HEIGHT}/>
        );
    }
}

SeatSelectot.propTypes={
    selectSeat:PropTypes.array.isRequired,
    onRemove:PropTypes.func.isRequired,
    onAdd:PropTypes.func.isRequired,

};
const mapStateToProps = state =>{
    return {
        selectSeat:state
    };
}

const mapDispatchToProps = dispatch=>{
    return{
        onAdd:seat=>{
            dispatch(addSeat(seat));
        },
        onRemove:id=>{
            dispatch(removeSeat(id));
        }
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(SeatSelectot);