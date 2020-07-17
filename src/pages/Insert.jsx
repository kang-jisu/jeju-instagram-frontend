import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';

import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";


const Carousel = function(previewList){
    return (
        <MDBCarousel
        activeItem={1}
        length={previewList.length}
        showControls={true}
        showIndicators={true}
    >
        <MDBCarouselInner>
        {
            previewList.map((pre,index)=>{
                return(
                    <MDBCarouselItem itemId={index+1}>
                    <MDBView>
                    <img
                        className="img"
                        src={pre}
                        alt="First slide"
                    />
                    </MDBView>
                    </MDBCarouselItem>
                )
            })
        }
        </MDBCarouselInner>
    </MDBCarousel>
    )
}
class Insert extends Component {
    constructor(props){
        super(props);
        this.state={
            description:"",
            previewList:[],
        }
    }
    componentDidMount=()=>{
        let previewList =  [];
        for(let i =0; i<this.props.imagesList.length; i++){
            previewList.push(String(URL.createObjectURL(this.props.imagesList[i])))
        }
        this.setState({
            previewList : previewList,
        })
    }
    goBack=()=>{
        this.props.history.goBack();
    }

    handleTextChange=(e)=>{
        this.setState({
            description:e.target.value,
        })
    }

    insertForm=(e)=>{
        alert(String(this.props.imagesList.length)+this.state.description);
        

        // axios -> [POST] /boards 
        // 성공하면 this.props.history.push("/")
        // 실패 
    }
    render() {
        return (
            <Fragment>
                <div className="nav-bar header">
                    <div className="nav-block">
                        <Link to="#" onClick={this.goBack}>이전</Link>
                    </div>
                    <div className="nav-block">
                        <span >새로운 사진 게시물</span>
                    </div>
                    <div className="nav-block">
                        <Link to="#" onClick={this.insertForm}>등록</Link>
                    </div>
                </div>
                
                <div className="main-content">
                <form >
                    <div className="form-wrapper">
                        {Carousel(this.state.previewList)}
                        <div className="text-div">
                            <textarea name="description" value={this.state.description} onChange={this.handleTextChange}/>
                        </div>
                    </div>
                </form>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Insert);