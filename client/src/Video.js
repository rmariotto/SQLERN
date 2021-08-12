import React from 'react';
import CommentBox from "./CommentBox";
import axios from "axios";

export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/video/${this.props.id}.json`)
            .then((result) => {
                this.setState({
                    video: result.data
                });
            })
            .catch((err) => {
                console.log("Error in get one video axios: ", err);
            });
    }

    render() {
        return (
            <div>
                <div className="container-single-video">
                    {this.state.video &&
                        <div>
                            <video
                                width="700"
                                height="350"
                                display="block"
                                controls autoPlay loop muted>
                                <source
                                    src={"/uploads/" + this.state.video.file}
                                    type="video/mp4" />
                            </video>
                            <CommentBox
                                videos_id={this.state.video.id}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}