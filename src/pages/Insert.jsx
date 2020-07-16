import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';

class Insert extends Component {
    constructor(props){
        super(props);
        this.state={
            imagesList:[],
            description:"",
        }
    }
    goBack=()=>{
        this.props.history.goBack();
    }

    handleTextChange=(e)=>{
        this.setState({
            description:e.target.value,
        })
    }

    handleFilesChange=(e)=>{
        /* 해야될것
         * 개수 10개 이하 설정
         * 미리보기같은거 . .? 
         */
        console.log(e.target.files);
        this.setState({
            imagesList:e.target.files,
        })
    }

    insertForm=(e)=>{
        alert(String(this.state.imagesList.length)+this.state.description);
        

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
                        <div className="image-div">
                            {this.props.imagesList.map(image=>{
                                return (<h1 key={image.name}>{image.name}</h1>)
                            })}
                            {String(this.props.imagesList.length)} 
                        </div>
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