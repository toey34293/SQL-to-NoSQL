const express = require("express");
const mysql = require("mysql");
const mongoose = require("mongoose");
const Model1 = require("./model/TestNoSQL.js");

const app = express();
app.use(express.json());

// MySQL Connnection
const MySqlConnnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "express-db",
});

MySqlConnnection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL database =", err);
    return;
  }
  console.log("MySQL successflly connected!");
});

// MongoDB Connnection
const connectNoSQL = async () => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/NoSql", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("MongoDB successflly connected!"));
  } catch (err) {
    console.log(err);
  }
};
connectNoSQL();

//Create Routes
// app.post("/create", async (req, res) => {
//   const { user_id, content } = req.body;
//   try {
//     MySqlConnnection.query(
//       "INSERT INTO tweet(user_id, content) VALUES(?,?)",
//       [user_id, content],
//       (err, results, fields) => {
//         if (err) {
//           console.log("Error while inserting a tweet into database =", err);
//           return res.status(400).send();
//         }
//         return res
//           .status(201)
//           .json({ message: "New tweet successfully create!" });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

//Read Mysql
app.get("/readMysQl", async (req, res) => {
  try {
    MySqlConnnection.query("SELECT * FROM tweet", (err, results, fields) => {
      if (err) {
        console.log("Error while Select tweets =", err);
        return res.status(400).send();
      }
      console.log("Get tweet from MySQL");
      return res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Read Structure Mysql table
app.get("/readStructureMysQl", async (req, res) => {
  try {
    MySqlConnnection.query(
      "SELECT COLUMN_NAME AS `name`, COLUMN_TYPE AS `type` FROM information_schema.COLUMNS WHERE TABLE_NAME = 'tweet'",
      (err, results, fields) => {
        if (err) {
          console.log("Error while Select Structure tweets =", err);
          return res.status(400).send();
        }
        console.log("Get Structure tweet from MySQL");
        return res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Read MongoDB
app.get("/readMongoDB", async (req, res) => {
  try {
    console.log("am in");
    const data = await Model1.find();
    console.log(data);
    return res.status(400).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Read MongoDB
app.post("/WriteMongoDB", async (req, res) => {
  try {
    const data = new Model1({
      id: 4,
      user_id: 555,
      content: "FFFFF",
    });
    data.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    // console.log(data);
    return res.status(400);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log("Sever is running on port 3000"));
