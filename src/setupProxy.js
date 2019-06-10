const express = require("express");

module.exports = function(app) {
  const options = {
    root: __dirname + "/../public",
    maxAge: "1 year"
  };

  app.use("/1.png", (req, res) => {
    res.sendFile("1.png", options);
  });
  app.use("/2.png", (req, res) => {
    res.sendFile("2.png", options);
  });
  app.use("/3.png", (req, res) => {
    res.sendFile("3.png", options);
  });
};
