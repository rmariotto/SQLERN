import React from "react";
import axios from "axios";
import Video from "./Video";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            data: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {

        axios
            .get("/videos")
            .then((result) => {
                this.setState(
                    {
                        data: result.data
                    });
            })
            .catch((err) => {
                console.log('err in getting /videos axios:', err);
            });
    }

    render() {
        return (
            <div>
                <h4> Youtvideos </h4>
                <div className="container">
                    {this.state.data.map((video) => (
                        <Link key={video.id} to={"/video/" + video.id}>
                            <li>
                                <video
                                    width="300"
                                    height="220"
                                    src={"uploads/" + video.file}
                                    alt=""
                                />
                            </li>
                        </Link>
                    ))}
                </div>
                {
                    this.state.video &&
                    (<Video video={this.state.video} />)
                }
            </div>
        );
    }
}