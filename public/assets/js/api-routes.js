//Dependencies
const fs = require("fs");
const path = require("path");
const noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

//Exports API routes to app.js
module.exports = function (app) {
 
//Get request from the databse to the page
  app.get("/api/notes", function (req, res) {
    res.json(noteList);
  });


//Posts a new note to the database with an id
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    noteList.push(newNote);

    noteList.forEach((element) => {
      let noteId = noteList.length.toString();
      newNote.id = noteId;
    });

    fs.writeFile("db/db.json", JSON.stringify(noteList), (err) => {
      if (err) {
        throw err;
      }
      console.log("Database updated");
      res.json(noteList);
    });
  });

// Deletes a note by way of the note's id

 app.delete("/api/notes/:id", function (req, res) {
      let noteId = req.params;
      for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].id === noteId.id) {
          noteList.splice(i, 1);
        }
      }
  
      fs.writeFile("db/db.json", JSON.stringify(noteList), function (error) {
        if (error) {
          throw error;
        }
        res.json(noteList);
      });
    });
  };