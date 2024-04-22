import express from "express";
import 'dotenv/config'
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from 'cors';
import { configDotenv } from "dotenv";




const url = process.env.mongo_uri;

const client = new MongoClient(url)

const dbname = 'passop';

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3000

client.connect();

const db = client.db(dbname);


// Get all passwords
app.get('/', async (req, res) => {
  const collection = db.collection('passwords');
  const findresults = await collection.find({}).toArray();
  res.json(findresults)
})
// SEnd Passwords

app.post('/', async (req, res) => {
  const data = req.body
  const collection = db.collection('passwords');
  const senddata = await collection.insertOne(data)
  res.send({success: true, senddata})
})


//Delete Passwords

app.delete('/', async (req, res) => {
  const data = req.body
  const collection = db.collection('passwords');
  const senddata = await collection.deleteOne(data)
  res.send({success: true, senddata})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})