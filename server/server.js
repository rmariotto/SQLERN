const express = require('express');
const app = express();
const cors = require('cors');
const {
    insertVideo,
    getVideos,
    getOneVideo,
    addingComments,
    gettingComments,
} = require("./../db/db.js");

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

//------------Multer
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../client/public/uploads/');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage
});

// Upload Endpoint

app.post('/upload', uploader.single('file'), (req, res) => {

    if (req.file) {
        insertVideo(req.file)
            .then(({ rows }) => {
                res.json(rows[0]);
            })
            .catch((err) => {
                console.log('err in uploading:', err);
            });
    } else {
        res.status(400).json({ msg: 'No file uploaded :(' });
    }
});

// List Videos

app.get('/videos', (req, res) => {
    getVideos()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error in getting videos: ", err);
        });
});

// List one video when clicked

app.get("/video/:id.json", (req, res) => {

    getOneVideo(req.params.id)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("err in /video/:id :", err);
        });
});

// Post Comments

app.post('/comment', (req, res) => {

    const { videos_id, comment } = req.body;

    addingComments(videos_id, comment)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log('err in post comments server:', err);
        });
});

// List comments

app.get(`/video/:id/comments/.json`, (req, res) => {

    gettingComments(req.params.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log("err in GET /comment/:id server :", err);
        });
});

// Server Endpoint

app.get("/api", (req, res) => {
    res.json({ message: "Server is connected! :D" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});