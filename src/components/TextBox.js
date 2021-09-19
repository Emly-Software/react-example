import React, {Component} from 'react';


class TextBox extends Component{
    constructor(props){
        super(props);
        this.state = {post: ""};

        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    handelChange(e){
        this.setState({post: e.target.value});
    }

    handelSubmit(e){
        console.log(this.state.post)
        e.prventDefault()
    }

    render(){
        return(
            <div className="col-md-8">
            <label className="form-label">Creat a Post</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
            <button className="btn btn-primary mt-6">Publish</button>
          </div>
        )
    }

}

export default TextBox;