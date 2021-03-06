const express = require('express');
const mongoose = require('mongoose');
var http = require('http');
var fs = require('fs');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });

const db = mongoose.connection;

db.on("open", () => console.log("connection established"));
db.on("error", () => console.log("failed to connect to db"));