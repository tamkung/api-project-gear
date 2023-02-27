
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions = {
    origin: '*',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var admin = require("firebase-admin");

var serviceAccount = require("./firebase-config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-ae784-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.delete('/users/:id', (req, res) => {
    const uid = req.params.id;
    admin.auth().deleteUser(uid)
        .then(() => {
            res.send(`User ${uid} deleted`);
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
            res.status(500).send(`Error deleting user ${uid}`);
        });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});