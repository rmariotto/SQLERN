import React from "react";
import axios from "axios";

export default class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            submit: false,
            videoUpload: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadVideo = this.uploadVideo.bind(this);
    }

    handleChange(e) {
        if (e.target.files[0]) {
            this.setState({
                file: e.target.files[0],
                videoUpload: e.target.files[0].name,
                submit: true,
            });
        }
    }

    uploadVideo(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('file', this.state.file);

        axios
            .post('/upload', formData)
            .then((result) => {
                window.location = '/video/' + result.data.id;
            })
            .catch(function (err) {
                console.log('err in axios POST /upload: ', err);
                this.setState({
                    submit: false,
                    error:
                        "We were unable to upload your video."
                });
            });
    }

    render() {
        return (
            <div className="form-container">
                <div className="sub-input">
                    <input className="inputfile"
                        type="file"
                        name="file"
                        id="file"
                        accept="video/*" 
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="file">
                        {this.state.videoUpload || "select video files to upload"}
                    </label>
                    {this.state.submit && (
                        <input className="btn"
                            type="button"
                            value="send"
                            onClick={(e) => this.uploadVideo(e)}
                        />
                    )}
                </div>
                {this.state.error && (
                    <p className="error">
                        {this.state.error}
                    </p>
                )}
            </div>
        );
    }
}