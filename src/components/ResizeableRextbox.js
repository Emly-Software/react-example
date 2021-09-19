import React from 'react';

class ResizableTextarea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            rows: 5,
            minRows: 5,
            maxRows: 20,
        };
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
            value: event.target.value,
            rows: currentRows < maxRows ? currentRows : maxRows,
        });
    };

    render() {
        return (
            <div className="col-md-8">
            <label className="form-label">Creat a Post</label>
            <textarea
                rows={this.state.rows}
                value={this.state.value}
                placeholder={'Enter your text here...'}
                className={'textarea'}
                onChange={this.handleChange}
            />
            <button className="btn btn-warning">Publish</button>
            </div>
        );
    }
}

export default ResizableTextarea;