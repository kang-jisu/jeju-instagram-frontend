import React, { Component } from 'react';
import {Route, Switch,withRouter} from 'react-router-dom';

import {Feed,Profile,Insert,Detail} from '../pages';
import {MenuBar,InsertMenuBar} from '../components';

const maxFileNumber = 5; // 인스타 한 게시글에 올릴 수 있는 파일 개수 . 일단 3개정도로만 해둠
class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            page:'feed',
            selectedFiles:[],
        }
    }
    componentDidMount=()=>{ 
      this.refreshPage();
    }

    componentDidUpdate=(prevProps,prevState)=>{
        if(this.props.location.pathname!==prevProps.location.pathname){
            this.refreshPage();
        }
        if(this.state.selectedFiles!==prevState.selectedFiles){
            if(this.state.selectedFiles.length!==0){ 
                // console.log("Add버튼 눌리고 파일도 선택됨");
                this.props.history.push("/insert");
            }
        }
    }

    refreshPage=()=>{
        if(this.props.location.pathname==="/"){
            this.setState({
                page:"feed",
            })
        }
        // 게시글 등록중에 새로고침되면 메인화면으로 나가짐 (파일 리셋돼서) 
        else if(this.props.location.pathname==="/insert" && this.state.selectedFiles.length===0){ 
            this.props.history.push("/");
        }
        else if(this.props.location.pathname==="/profile"){
            this.setState({
                page:"profile",
            })
        }
        else {
            this.setState({
                page:"detail",
            })
        }
    }
    changePage=(page)=>{
        this.setState({
            page,
        })
    }

    handleFilesChange=(e)=>{
        // 선택된 사진은 앞에서 (maxFileNumber)장까지만 선택됨
        let fileList = [];
        for(let i=0; i<Math.min(e.target.files.length,maxFileNumber); i++){
            fileList.push(e.target.files[i]);
        }
        this.setState({
            selectedFiles:fileList,
        })
    }

    clickAddButton=()=>{
        document.getElementById("file").click();
    }
    
    render() {
        return (
            <div >
                <section className="main">
                    <input type="file" id="file" name="imagesList" accept="image/*" multiple onChange={this.handleFilesChange} hidden/>
                    <Switch>
                    <Route path="/insert" render={props=>{ return(<Insert imagesList={this.state.selectedFiles}/>)}}/>
                    <Route path="/board/:boardId" component={Detail}/>
                    <Route path="/:nickname" component={Profile}/>
                    <Route path="/" component={Feed}/>
                    </Switch>
                </section>
                <Switch>
                    <Route path="/insert" component={InsertMenuBar}/>
                    <Route render={props=>{ return(<MenuBar changePage={this.changePage} page={this.state.page} clickAddButton={this.clickAddButton}/>)}}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Main);