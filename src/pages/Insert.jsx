import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import {Carousel} from '../components';

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

    renderInsertButton=(text)=>{
        if(text==="") {
            return (
            <Tooltip title="글을 작성해주세요" placement="bottom" onClick={e=>document.getElementById("description").focus()}>
                <span >등록</span>
            </Tooltip>
            )
        }   
        else return <Link to="#" onClick={this.insertForm}>등록</Link> 
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
        // 성공하면 
        // this.props.history.push("/")
        // 실패 
    }
    render() {
        return (
            <Fragment>
                <div className="nav-bar header">
                    <div className="nav-block">
                        <Link to="#" onClick={this.goBack}>이전</Link>
                    </div>
                    <div className="nav-block font-smaller">
                        <span >새로운 사진 게시물</span>
                    </div>
                    <div className="nav-block">
                        {this.renderInsertButton(this.state.description)}
                    </div>
                </div>
                
                <div className="main-content">
                <form >
                    <div className="form-wrapper">
                        {Carousel(this.state.previewList)}
                        <div className="text-div">
                            <textarea 
                            name="description" 
                            id = "description"
                            value={this.state.description} 
                            onChange={this.handleTextChange}
                            placeholder="문구 입력..."
                            />
                        </div>
                    </div>
                </form>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Insert);