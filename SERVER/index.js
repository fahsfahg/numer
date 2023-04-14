const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const http = require("http");
const jwt = require("jsonwebtoken");
const app = express();

const port = 8081;

app.use(cors());
app.use(express.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "token not found" });
  token = token.split(" ")[1];

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) return res.status(401).json({ message: "token error" });

    req.userId = decoded.id;
    next();
  });
}

app.get("/login", function (req, res, next) {
  // Check the user's credentials and get the user's ID
  const userId = 1207;
  // Generate a token with the user's ID
  const token = jwt.sign({ id: userId }, "your_secret_key", {
    expiresIn: "1h",
  });
  // Return the token to the client
  res.json({ token });
});

app.post("/ques/add", async (req, res) => {
  const ques = req.body;
  const client = new MongoClient(uri);
  await client.connect();

  await client
    .db("mydb")
    .collection("ques")
    .insertOne({
      id: parseInt(ques.id),
      title: ques.title,
      question: ques.question,
    });
  await client.close();
  res.status(200).send({
    status: "ok",
    message: "Question with id " + ques.id + " is created",
    ques: ques,
  });
});

app.get("/ques", verifyToken, async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  const ques = await client.db("mydb").collection("ques").find({}).toArray();
  await client.close();
  res.status(200).send(ques);
});

app.get("/question", async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  const ques = await client.db("mydb").collection("ques").find({}).toArray();
  await client.close();
  res.status(200).send(ques);
});

app.get("/ques/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const ques = await client.db("mydb").collection("ques").findOne({ id: id });
  res.status(200).send(ques);
});

app.put("/ques/update", async (req, res) => {
  const ques = req.body;
  const id = parseInt(ques.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client
    .db("mydb")
    .collection("ques")
    .updateOne(
      { id: id },
      {
        $set: {
          id: parseInt(user.id),
          title: ques.title,
          question: ques.question,
        },
      }
    );
  res.status(200).send({
    status: "ok",
  });
});

app.delete("/ques/delete", async (req, res) => {
  const id = parseInt(req.body.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client.db("mydb").collection("ques").deleteOne({ id: id });
  res.status(200).send({
    status: "ok",
  });
});

app.get("/", (req, res) => {
  res.send("hello server");
});

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

 module.exports = app
