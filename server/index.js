const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		key: "userId",
		secret: "subscribe",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24,
		},
	})
);

app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "root1",
	database: "doglog",
});

app.post("/create", (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}
		db.query(
			"INSERT INTO userlogin (email, username, password) VALUES (?,?,?)",
			[email, username, hash],
			(err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.send("Values Inserted");
				}
			}
		);
	});
});

app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});
app.post("/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		"SELECT * FROM userlogin WHERE username = ?",
		username,
		(err, result) => {
			if (err) {
				res.send({ err: err });
			}

			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (response) {
						req.session.user = result;
						console.log(req.session.user);
						res.send(result);
					} else {
						res.send({ message: "Username doesn't exist" });
					}
				});
			} else {
				res.send({ message: "Wrong username or password combination." });
			}
		}
	);
});

app.post("/addDog", (req, res) => {
	const name = req.body.name;

	db.query(
		"INSERT INTO dogs (name) VALUES (?)",
		[name],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Dog Inserted");
			}
		}
	);
})
app.get("/dogs", (req, res) => {
	db.query(
		`SELECT d.dogsID, d.name, 
		(SELECT user from feedings as f WHERE f.dogsID = d.dogsID ORDER BY date DESC LIMIT 1) as user,
		(SELECT date from feedings as f WHERE f.dogsID = d.dogsID ORDER BY date DESC LIMIT 1) as date
	FROM dogs as d`,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
})

app.post("/addUser", (req, res) => {
	const name = req.body.name;

	db.query(
		"INSERT INTO users (name) VALUES (?)",
		[name],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("User Inserted");
			}
		}
	);
})
app.get("/users", (req, res) => {
	db.query(
		"SELECT * FROM users",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
})

app.post("/feeding", (req, res) => {
	const dog = req.body.dog;
	const user = req.body.user;
	const date = req.body.date

	db.query(
		"INSERT INTO feedings (dog, user, date) VALUES (?,?,?)",
		[dog, user, date],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values Inserted");
			}
		}
	);
})

app.post("/walks", (req, res) => {
	const dog = req.body.dog;
	const user = req.body.user;
	const date = req.body.date

	db.query(
		"INSERT INTO walks (dog, user, date) VALUES (?,?,?)",
		[dog, user, date],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values Inserted");
			}
		}
	);
})

app.post("/lastFeeding", (req, res) => {
	db.query(
		"SELECT * FROM feedings",
		
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
})

app.listen(3001, () => {
	console.log("yay");
});
