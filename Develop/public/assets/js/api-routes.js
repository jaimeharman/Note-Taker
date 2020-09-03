const fs = require('fs');


module.exports = function(app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            let db = JSON.parse(data);
            res.json(db);
        });
    });
//API POST request
    app.post("/api/notes", function(req, res) {
    //Receive a new note to save on request body, add it to the db.json file
        db.push(req.body);
    //Add unique id to each note
        db.forEach((obj, i) => {
            obj.id = i + 1; 
        });
//Return new note to user
        fs.writeFile("db/db.json", JSON.stringify(db), function() {
            res.json(db);
        });
      
    });

//API Delete Request
app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    db.splice(id - 1, 1);
    db.forEach((obj, i) => {
        obj.id = i + 1; 
    });
//Return remaining notes
fs.writeFile("./db/db.json", JSON.stringify(db), function () {
    res.json(db)
        });
    });
};