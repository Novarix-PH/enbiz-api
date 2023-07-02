/* eslint-disable */
const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = admin.firestore();

// REGISTER BUSINESS
app.post("/register-business", async (req, res) => {
  const response = await db.collection("businesses").add(req.body);
  res.status(201).send(response);
});

// GET BUSINESSES
app.get("/businesses", async (req, res) => {
  const snapshot = await db.collection("businesses").get();

  let businesses = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    businesses.push({ id, ...data });
  });

  res.status(200).send(businesses);
});

// REGISTER ASSOCIATION
app.post("/register-association", async (req, res) => {
  const response = await db.collection("associations").add(req.body);
  res.status(201).send(response);
});

// GET ASSOCIATIONS
app.get("/associations", async (req, res) => {
  const snapshot = await db.collection("associations").get();

  let associations = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    associations.push({ id, ...data });
  });

  res.status(200).send(associations);
});

// GET GROWTH TRACKS
app.get("/growth-tracks", async (req, res) => {
  const snapshot = await db.collection("growth-tracks").get();

  let growthTracks = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    growthTracks.push({ id, ...data });
  });

  res.status(200).send(growthTracks);
});

// ADD GROWTH TRACKS
app.post("/add-growth-tracks", async (req, res) => {
  const response = await db.collection("growth-tracks").add(req.body);
  res.status(201).send(response);
});

exports.enbiz = functions.https.onRequest(app);
