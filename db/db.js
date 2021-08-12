const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { user, pass } = require("../secrets.json");
    db = spicedPg(`postgres:${user}:${pass}@localhost:5432/videosboard`);
}

exports.insertVideo = (file) => {
    return db.query(
        `INSERT INTO videos (file) VALUES ($1) RETURNING *;`,
        [file.filename]
    );
};

exports.getVideos = () => {
    return db.query(
        `SELECT * FROM videos ORDER BY id DESC ;`
    );
};

exports.getOneVideo = (id) => {
    return db.query(
        `SELECT * FROM videos WHERE id = $1`,
        [id]
    );
};

exports.addingComments = (videos_id, comment) => {
    return db.query(
        `INSERT INTO comments (videos_id, comment) VALUES ($1, $2) RETURNING *`,
        [videos_id, comment]
    );
};

exports.gettingComments = (id) => {
    return db.query(
        `SELECT * FROM comments WHERE videos_id = $1 ORDER BY created_at DESC`,
        [id]
    );
};