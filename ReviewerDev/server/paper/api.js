module.exports = function (rest) {

  var mongoose = require('mongoose');
  var Paper = mongoose.model("Paper");

  // 获得论文表
  rest.get('/db/paper', function (req, res) {
    Paper.find(function (err, paper) {
      res.ok(paper);
    })
  });

  // 按ID获得指定论文
  rest.get('/db/paper/:id', function (req, res) {
    let id = req.params.id;
    Paper.findById(id, function (err, paper) {
      if (paper)
        res.ok(paper);
      else
        res.notFound();
    })
  });

  // 按照标题搜索符合要求的文章
  rest.get('/db/paper/search/:search_words', function (req, res) {
    let words = req.params.search_words;
    Paper.find({ "paper_title": { $regex: words, $options: 'i' } }).exec(function (err, paper) {
      if (paper)
        res.ok(paper);
      else
        res.notFound();
    })
  });

  // 按条件返回符合要求的文章总数
  rest.get('/db/paper/paperSum/:search_words', function (req, res) {
    let words = req.params.search_words;
    if (words == "allpaper") {
      Paper.count({}, function (err, sum) {
        res.ok(sum);
      })
    }
    else {
      Paper.find({ "paper_title": { $regex: words, $options: 'i' } }).count({}).exec(function (err, sum) {
        res.ok(sum);
      })
    }
  });

  // 处理文章列表翻页
  rest.get('/db/paper/paging/:paperNum', function (req, res) {
    let paper_num = req.params.paperNum;
    let words = req.body.search_words;
    if (words == "") {
      Paper.find({}).skip((paper_num - 1) * 10).limit(10).exec(function (err, paper) {
        res.ok(paper);
      })
    }
    else {
      Paper.find({ "paper_title": { $regex: words, $options: 'i' } }).skip((paper_num - 1) * 10).limit(10).exec(function (err, paper) {
        res.ok(paper);
      })
    }
  });

  //  按用户ID和状态搜索相应状态的论文
  rest.get('/db/paper/users/:user_id/:status', function (req, res) {
    let user_id = req.params.user_id;
    let status = req.params.status;
    Paper.find({ paper_owner_id: user_id, paper_status: status }).sort({ 'update_Date': -1 }).exec(function (err, paper) {
      if (paper)
        res.ok(paper);
      else
        res.notFound();
    })
  });

  //修改论文内容
  rest.put('/db/paper/:id', function (req, res) {
    let change_slug = req.body.slug;
    if (change_slug == "content") {
      let id = req.params.id;
      let time = req.body.time;
      let content = req.body.content;
      Paper.update({ _id: id }, {
        $push: {
          "paper_content": { "current_content": content, "update_time": time }
        },
        $set: {
          "update_Date": time
        },
        $inc: {
          "update_paper_sum": 1
        }
      }
        , function (err) {
          if (err) {
            return res.internalServerError();
          }
          return res.accepted('/db/paper/' + encodeURI(id));
        });
    }

    else if (change_slug == "status") {
      let id = req.params.id;
      let status = req.body.status;
      if (status == "init") {
        Paper.update({ _id: id }, {
          $set: {
            "paper_status": "commit"
          }
        }
          , function (err) {
            if (err) {
              return res.internalServerError();
            }
            return res.accepted('/db/paper/' + encodeURI(id));
          });
      }
      else {
        Paper.update({ _id: id }, {
          $set: {
            "paper_status": "final"
          }
        }
          , function (err) {
            if (err) {
              return res.internalServerError();
            }
            return res.accepted('/db/paper/' + encodeURI(id));
          });
      }
    }

  }
  );

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
