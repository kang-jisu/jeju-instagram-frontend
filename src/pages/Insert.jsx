import React, { Component } from 'react';

class Insert extends Component {
    constructor(props){
        super(props);
        this.state={
            imagesList:[],
            description:"",
        }
    }
    insertForm=(e)=>{
        e.preventDefault();
        this.setState({
            imagesList:e.target.imagesList.files,
            description:e.target.description.value,
        })
    }
    render() {
        return (
            <div>
                <h1>게시글 등록</h1>
                <form onSubmit={this.insertForm}>
                    <input type="file" name="imagesList" multiple/><br/>
                    <textarea name="description"/><br/>
                    <input type="submit" value="등록" />
                </form>
                {String(this.state.imagesList.length)} <br/>
                {this.state.description}
            </div>
        );
    }
}

export default Insert;