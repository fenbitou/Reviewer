module.exports = function (rest) {

  var mongoose = require('mongoose');
  var Paper = mongoose.model("Paper");

  //获得论文表
  rest.get('/db/paper', function (req, res) {
    Paper.find(function (err, paper) {
      res.ok(paper);
    });
  });

  rest.get('/db/paper/:id', function (req, res) {
    let id = req.params.id;
    Paper.findById(id, function (err, paper) {
      if (paper)
        res.ok(paper);
      else
        res.notFound();
    })
  });

  rest.get('/db/paper/:user_id/:status', function (req, res) {
    let user_id = req.params.user_id;
    let status = req.params.status;
    Paper.find({ paper_owner_id: user_id, paper_status: status }, function (err, paper) {
      if (paper)
        res.ok(paper);
      else
        res.notFound();
    })
  });

  //修改论文内容
  rest.put('/db/paper/:id', function (req, res) {
    let id = req.params.id;
    Paper.update({ _id: id }, req.body, function (err) {
      if (err) {
        return res.internalServerError();
      }
      return res.accepted('/db/paper/' + encodeURI(id));
    });
  });


  // 添加论文
  rest.post('/db/paper', function (req, res) {
    let paper = new Paper(req.body);
    paper.save();
    res.ok(paper);
  });


  // 删除论文
  rest.delete('/db/paper/:id', function (req, res) {
    let id = req.params.id;
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
