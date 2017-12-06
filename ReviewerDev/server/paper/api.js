module.exports = function (rest) {

  var mongoose = require('mongoose');
  var Paper = mongoose.model("Paper");

  rest.get('/db/paper', function (req, res) {
    Paper.find(function (err, paper) {
      res.ok(paper);
    });
  });


  rest.get('/db/paper/:id', function (req, res) {
    var id = req.params.id;
    Paper.findById(id, function (err, paper) {
      if (paper)
        res.ok(paper);
      else
        res.notFound();
    })
  });

  rest.put('/db/paper/:id', function (req, res) {
    var id = req.params.id;
    Paper.update({ _id: id }, req.body, function (err) {
      if (err) {
        return res.internalServerError();
      }
      return res.accepted('/db/paper/' + encodeURI(id));
    });
  });

  rest.post('/db/paper', function (req, res) {
    var paper = new Paper(req.body);
    paper.save();
    res.ok(paper);
  });

  rest.delete('/db/paper/:id', function (req, res) {
    var id = req.params.id;
    Paper.findByIdAndRemove(id, function (err) {
      if (err) {
        console.log(err);
        return res.internalServerError();
      }
      return res.accepted();
    });
  });

  return rest;

};
