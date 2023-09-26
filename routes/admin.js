var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("multer");
const { v4: uuid, parse } = require("uuid");
var imgname;
var aes256 = require("aes256");
var passkey = "ASSESMENTWork";
var imgname = "";
// var logger = require("../controller/logger");
var ip = require("ip");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const axios = require('axios');
const fs = require('fs');
const path = require ('path');
const nodemailer = require('nodemailer');
const { Parser } = require('json2csv');
const { jsPDF } = require("jspdf");
// var ExcelToCSV = require("../public/assets/mine/ExcelToCSV.js");





  module.exports = router;
  