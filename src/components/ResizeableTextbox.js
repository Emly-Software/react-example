import React from 'react';
class ResizableTextarea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            rows: 5,
            minRows: 5,
            maxRows: 20,
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getUrl = this.getUrl.bind(this);
    }

    getUrl= (post) =>{
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

    handelSubmit = (e) =>{
        e.preventDefault();
        let post =  this.state.post;
        let urls = this.getUrl(post);
        let newUrls;
        for (let l = 0; l < urls.length; l++) {
            const element = urls[l];
        }

    }

    render() {
        return (
            <div className="col-md-8">
                <form onSubmit={this.handelSubmit}>
                    <label className="form-label">Creat a Post</label>
                    <textarea
                        rows={this.state.rows}
                        value={this.state.post}
                        placeholder={'Enter your text here...'}
                        className={'textarea'}
                        onChange={this.handleChange}
                    />
                    <button type="submit" className="btn btn-warning">Publish</button>
                </form>
            </div>
        );
    }
}

export default ResizableTextarea;