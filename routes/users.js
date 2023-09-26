var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("multer");
const { v4: uuid, parse } = require("uuid");
var imgname;
var aes256 = require("aes256");
var passkey = "EXAMPORTAL";
var imgname = "";
// var ExcelToCSV = require("../public/assets/js/ExcelToCSV.js");
// var logger = require("../controller/logger");
var ip = require("ip");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const axios = require('axios');
const fs = require('fs');
const path = require ('path');
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rahulrawat31r@gmail.com',
      pass: 'yyovxputsyodvdyy'
    }
  });




module.exports = router;
