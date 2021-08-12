import React from "react";
import axios from "axios";

export default class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            created_at: '',
            submit: false,
            error: '',
            data: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadComment = this.uploadComment.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleChange(e) {
        this.setState({
            comment: e.target.value,
            created_at: e.target.value.created_at,
            submit: true
        });
    }

    componentDidMount() {
        axios
            .get(`/video/${this.props.videos_id}/comments/.json`)
            .then((result) => {
                this.setState(
                    {
                        data: result.data
                    }
                );
            })
            .catch((err) => {
                console.log("Error in get comments with axios: ", err);
            });
    }

    uploadComment(e) {
        e.preventDefault();

        let self = this;

        axios
            .post('/comment', {
                videos_id: this.props.videos_id,
                comment: this.state.comment
            })
            .then((result) => {
                this.state.data.unshift(result.data);
                self.setState({
                    comment: '',
                    submit: false,
                });
            })
            .catch(function (err) {
                this.setState({
                    submit: false,
                    error:
                        "Ops! Something went wrong and We were unable to post your comment."
                });
            });
    }

    render() {
        return (
            <div className="container-comments">
                <div className="container-text-area" >
                    <textarea
                        placeholder="Add a comment..."
                        onChange={e => this.handleChange(e)}
                        value={this.state.comment}>
                    </textarea>
                    <div className="container-btn">
                        {this.state.submit && (
                            <input className="btn"
                                type="submit"
                                value="comment"
                                onClick={e => this.uploadComment(e)} />
                        )}
                    </div>
                    <div className="container-show-comments">
                        {this.state.data.map((comment) => (
                            <div key={comment.id} className="comments">
                                {comment.comment}
                                <p> posted at:
                                    {new Date(comment.created_at)
                                        .toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}