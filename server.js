// Import and require mysql2
const mysql = require('mysql2');
const questions = require('./questions');

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);
db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
});

module.exports = db;

questions.mainMenu();