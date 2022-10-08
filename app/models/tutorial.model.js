const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.eid = tutorial.eid;
  this.name = tutorial.name;
  this.email = tutorial.email;
  this.password = tutorial.password;
  this.admin = tutorial.admin;
  this.cadmin=tutorial.cadmin;
  this.clogin=tutorial.clogin;
  this.cname=tutorial.cname;
};

const Tutorialc = function(tutorial) {
  this.cadmin=tutorial.cadmin;
  this.clogin=tutorial.clogin;
  this.cname=tutorial.cname;
};


Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO user SET eid = ?, name = ?,email = ?,admin = ?,password = ?",[newTutorial.eid,newTutorial.name,newTutorial.email,newTutorial.admin,newTutorial.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { eid: res.insertId, ...newTutorial });
    result(null, { eid: res.insertId, ...newTutorial });
  });
};




Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE eid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.findByIdCurrent = (id, result) => {
  sql.query(`SELECT * FROM current WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM data";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};


Tutorial.getAlluser = (title, result) => {
  let query = "SELECT * FROM user";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.getAllAdmin = result => {
  sql.query("SELECT * FROM user WHERE admin=1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.getCurrent = result => {
  sql.query("SELECT * FROM current", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};


Tutorial.getAllHr = result => {
  sql.query("SELECT * FROM user WHERE admin=0", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};



Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE user SET eid = ?, name = ?, email = ?, admin = ?, password = ?  WHERE eid = ?",
    [tutorial.eid, tutorial.name, tutorial.email, tutorial.admin, tutorial.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.updateByIdCurrent = (id, tutorialc, result) => {
  sql.query(
    "UPDATE current SET clogin = ?, cname = ?, cadmin = ?  WHERE id = 1",
    [tutorialc.clogin, tutorialc.cname, tutorialc.cadmin],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { admin: tutorialc.cadmin, name: tutorialc.cname, login: tutorialc.clogin, });
      result(null, { id: id, ...tutorialc });
    }
  );
};




Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE eid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorialc;
module.exports = Tutorial;