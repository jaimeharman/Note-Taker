const fs = require("fs");
const path = require("path");
const noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function (app) {
 
    //Get request from index.js
  app.get("/api/notes", function (req, res) {
    res.json(noteList);
  });


//Read json array
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

//called from index.js and will delete given file

  app.delete("/api/notes/:id", function (req, res) {
    let listId = req.params;

    for (let i = 0; i < noteList.length; i++) {
      noteList[i].id === listId.id ? noteList.splice(i, 1) : console.log("");
    }

    fs.writeFile("db/db.json", JSON.stringify(noteList),
      (err) => {
        if (err) {
          throw err;
        }

        console.log("Item deleted ... Database updated");
        res.json(noteList);
      }
    );
  });
};
