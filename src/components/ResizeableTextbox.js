import React from 'react';
import axios from 'axios';
class ResizableTextarea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            rows: 5,
            minRows: 5,
            maxRows: 20,
            showPost: false,
            newPost: null,
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.replaceUrl =  this.replaceUrl.bind(this);
    }


    replaceUrl = (post) => {
        if(!post) return;
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return post.replace(urlRegex, function(url) {
            var link = url;
            if (!link.match('^https?:\/\/') ) {
                link = 'http://' + link;
            }
        return '<a href="' + link + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
        })
    }

    getUrl = (post) => {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return post.match(urlRegex);
    }

    handleChange = (event) => {
        const textareaLineHeight = 24;
        const { minRows, maxRows } = this.state;

        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }

        this.setState({
            post: event.target.value,
            rows: currentRows < maxRows ? currentRows : maxRows,
        });
    };

    handelSubmit = (e) => {
        e.preventDefault();
        let post = this.state.post;
        let urls = this.getUrl(post);
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        var self = this;


        axios.post('http://localhost:9000/create',
            { url: urls[0] })
            .then(function (res) {
                if (res.data) {
                    const url = res.data.data.short_url;
                    const newPost =   post.replace(urlRegex, res.data.data.short_url);
                  self.setState({
                    showPost: true, 
                    newPost: newPost
                });
                }
            })
    }

    
    render() {
        return (
            <div className="col-md-8">
                {!this.state.showPost && <form onSubmit={this.handelSubmit}>
                    <label className="form-label">Creat a Post</label>
                    <textarea
                        rows={this.state.rows}
                        value={this.state.post}
                        placeholder={'Enter your text here...'}
                        className={'textarea'}
                        onChange={this.handleChange}
                    />
                    <button type="submit" className="btn btn-warning">Publish</button>
                </form>}
                {this.state.showPost &&
                    <div className="card" style={{border: '1px', margin: "20px"}}>
                        <div className="card-body">
                            <p className="card-text m-4">
                            <span dangerouslySetInnerHTML={{__html: this.replaceUrl(this.state.newPost)}} />
                            </p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ResizableTextarea;