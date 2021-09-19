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
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea className="form-control" value={this.state.post} rows={90} />
          </div>
        )
    }

}

export default TextBox;