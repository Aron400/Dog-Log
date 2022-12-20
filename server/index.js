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
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
// 	next();
//   });

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
  password: "password",
  database: "sys",
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
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM userlogin WHERE email = ?", email, (err, result) => {
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
          res.send({ message: "Email doesn't exist" });
        }
      });
    } else {
      res.send({ message: "Wrong email or password combination." });
    }
  });
});

app.post("/addDog", (req, res) => {
  const name = req.body.name;

  db.query("INSERT INTO dogs (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Dog Inserted");
    }
  });
});
app.get("/dogs", (req, res) => {
  db.query(
    `SELECT d.dogsID, d.name, 
			(SELECT feedingUser from feedings as f WHERE f.dogsID = d.dogsID ORDER BY feedingDate DESC LIMIT 1) as feedingUser,
			(SELECT feedingDate from feedings as f WHERE f.dogsID = d.dogsID ORDER BY feedingDate DESC LIMIT 1) as feedingDate,
			(SELECT walkUser from walks as w WHERE w.dogsID = d.dogsID ORDER BY walkDate DESC LIMIT 1) as walkUser,
			(SELECT walkDate from walks as w WHERE w.dogsID = d.dogsID ORDER BY walkDate DESC LIMIT 1) as walkDate
		FROM dogs as d`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addUser", (req, res) => {
  const name = req.body.name;

  db.query("INSERT INTO users (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("User Inserted");
    }
  });
});
app.get("/users", (req, res) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/feeding", (req, res) => {
  const dog = req.body.dog;
  const dogsID = req.body.dogsID;
  const user = req.body.user;
  const usersID = req.body.usersID;
  const date = req.body.date;

  db.query(
    "INSERT INTO feedings (dog, dogsID, feedingUser, usersID, feedingDate) VALUES (?,?,?,?,?)",
    [dog, dogsID, user, usersID, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/feedingHistory", (req, res) => {
  db.query(
    `SELECT dog, feedingUser, feedingDate 
		FROM feedings
		ORDER BY feedingsID DESC
		LIMIT 10`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/walks", (req, res) => {
  const dog = req.body.dog;
  const dogsID = req.body.dogsID;
  const user = req.body.user;
  const usersID = req.body.usersID;
  const date = req.body.date;

  db.query(
    "INSERT INTO walks (dog, dogsID, walkUser, usersID, walkDate) VALUES (?,?,?,?,?)",
    [dog, dogsID, user, usersID, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/walkHistory", (req, res) => {
  db.query(
    `SELECT dog, walkUser, walkDate 
		FROM walks
		ORDER BY walksID DESC
		LIMIT 10`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

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
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM users WHERE usersID = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.send(result);
    }
  });
});

//add a note
// app.post("/addNote", (req, res) => {
//   const note_text = req.body.note_text;

//   db.query(
//     "INSERT INTO notes (note_text) VALUES (?)",
//     [note_text],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Note Added");
//       }
//     }
//   );
// });

// app.get("/notes", (req, res) => {
//   db.query(`SELECT * FROM notes`, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.get("/getVaccine", (req, res) => {
  const sqlGet = "SELECT* FROM vaccineList";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/newVaccine", (req, res) => {
  const { name, givenDate, expireDate } = req.body;
  const sqlInsert =
    "INSERT INTO vaccineList(name,givenDate,expireDate) VALUES (?,?,?)";
  db.query(sqlInsert, [name, givenDate, expireDate], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/removeVaccine/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM vaccineList WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/getVaccine/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT* FROM vaccineList WHERE id =?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.post("/updateVaccine/:id", (req, res) => {
  const { id } = req.params;
  const { name, givenDate, expireDate } = req.body;
  const sqlUpdate =
    "UPDATE vaccineList SET name=?, givenDate=?, expireDate=? WHERE id=?";
  db.query(sqlUpdate, [name, givenDate, expireDate, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.delete("/deleteDog/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM dogs WHERE dogsID = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.send(result);
    }
  });
});

//notes
app.get("/getNotes", (req, res) => {
  const sqlGet = "SELECT* FROM notes";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/newNote", (req, res) => {
  const { name } = req.body;
  const sqlInsert = "INSERT INTO notes (name) VALUES (?)";
  db.query(sqlInsert, [name], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/removeNote/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM notes WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/getNotes/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT* FROM notes WHERE id =?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.post("/updateNote/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sqlUpdate = "UPDATE notes SET name=? WHERE id=?";
  db.query(sqlUpdate, [name, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("yay");
});
