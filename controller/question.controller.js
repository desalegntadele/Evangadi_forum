const allQuestions = function (req, res) {
  res.send('All Questions');
};

module.exports = allQuestions;


const express = require("express");
const dbConnection = require("../db/dbConfig");
const { format } = require("date-fns");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

async function postquestion(req, res) {
  const questionid = uuidv4();
  const { title, description, tag } = req.body;
  console.log(title);

  if (!title || !description || !tag) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide all required fields",
    });
  }
  try {
    const username = req.user.username;
    const userid = req.user.userid;

    console.log(
      `User ID: ${userid}, Question ID: ${questionid}, Title: ${title}, Description: ${description}`
    );

    await dbConnection.query(
      "INSERT INTO questions (username,userid,questionid,title,description,tag) VALUES (?,?,?,?,?,?)",
      [username,userid, questionid, title, description, tag]
    );
    return res.status(StatusCodes.CREATED).json({
      msg: "Question created successfully",
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "An unexpected error occurred",
    });
  }
}

module.exports = { postquestion };
