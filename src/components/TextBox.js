import React, {Component} from 'react';


class TextBox extends Component{
    constructor(props){
        super(props);
        this.state = {post: "", url: ""};
        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.getUrl  = this.getUrl.bind(this);
    }

    handelChange(e){
        this.setState({post: e.target.value});
        let post = e.target.value;
        console.log(this.getUrl(post));
    }

   getUrl(post) {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return post.match(urlRegex);
    }

    handelSubmit(e){
        console.log(this.state.post)
        e.prventDefault()
    }

    render(){
        return(
            <div className="col-md-8">
            <label className="form-label">Creat a Post</label>
            <textarea className="form-control" value={this.state.post} onChange={this.handelChange} id="exampleFormControlTextarea1" rows={3}/>
            <button type="submit" className="btn btn-warning">Publish</button>
          </div>
        )
    }

}

export default TextBox;