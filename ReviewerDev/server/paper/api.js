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
    Paper.find({ "paper_title": { $regex: words, $options: 'i' } })
      .exec(function (err, paper) {
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
      Paper.find({ "paper_title": { $regex: words, $options: 'i' } })
        .count({})
        .exec(function (err, sum) {
          res.ok(sum);
        })
    }
  });

  // 处理文章列表翻页
  rest.get('/db/paper/paging/:search_words/:paper_num', function (req, res) {
    let num = req.params.paper_num;
    let words = req.params.search_words;
    if (words == "all") {
      Paper.find({})
        .skip((num - 1) * 10)
        .limit(10)
        .exec(function (err, paper) {
          res.ok(paper);
        })
    }
    else {
      Paper.find({ "paper_title": { $regex: words, $options: 'i' } })
        .skip((num - 1) * 10)
        .limit(10)
        .exec(function (err, paper) {
          res.ok(paper);
        })
    }
  });

  //  按用户ID和状态搜索相应状态的论文
  rest.get('/db/paper/users/:user_id/:status', function (req, res) {
    let user_id = req.params.user_id;
    let status = req.params.status;

    // 学生可以查看处于commit三个子状态的全部文章
    if (status == "mycommit") {
      Paper.find({ paper_owner_id: user_id, paper_status: { $regex: "commit", $options: 'i' } })
        .sort({ 'update_date': -1 })
        .exec(function (err, paper) {
          if (paper)
            res.ok(paper);
          else
            res.notFound();
        })
    }
    else {
      Paper.find({ paper_owner_id: user_id, paper_status: status })
        .sort({ 'update_date': -1 })
        .exec(function (err, paper) {
          if (paper)
            res.ok(paper);
          else
            res.notFouynd();
        })
    }
  });

  //修改论文内容
  rest.put('/db/paper/:id', function (req, res) {
    let id = req.params.id;
    let time = req.body.time;
    let content = req.body.content;

    Paper.update({ _id: id }, {
      $push: {
        "paper_content": {
          "current_content": content,
          "update_time": time
        }
      },
      $set: {
        "update_date": time
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
  });

  // 修改论文主要状态
  // init-->commit以及commit--->final 都会删除历史记录,只保留最新的内容  
  rest.put('/db/paper/status/:id', function (req, res) {
    let id = req.params.id;

    let current_status = req.body.paper_status;
    let paperContent = [];
    paperContent[0] = req.body.paper_content;
    let time = req.body.paper_time;
    let comment = req.body.paper_comment;

    if (current_status == "init") {
      Paper.update({ _id: id }, {
        $set: {
          "paper_status": "commit",
          "update_paper_sum": 1,
          "paper_content": paperContent,
          "update_date": time
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
          "paper_status": "final",
          "update_paper_sum": 1,
          "paper_content": paperContent,
          "update_date": time,
          "paper_comment": {
            "comment_content": comment,
            "comment_time": time,
            "comment_teacher_id": 1,
            "comment_teacher_name": "人民教师"
          }
        }
      }
        , function (err) {
          if (err) {
            return res.internalServerError();
          }
          return res.accepted('/db/paper/' + encodeURI(id));
        });
    }
  });

  // 修改论文commit的子状态
  // beforeCommit : 修改尚未提交  commit: 提交尚未评阅  afterCommit: 已给出评审意见，但通过没有定稿
  // beforeCommit / afterCommit --> beforeCommit 修改并保存论文，但未提交评审
  // beforeCommit --> commit 提交论文等待评审
  // commit --> afterCommit 教师已评审，但未通过，等待学生重新提交评审
  rest.put('/db/paper/commitStatus/:id', function (req, res) {
    let id = req.params.id;
    let dest_status = req.body.status;

    Paper.update({ _id: id }, {
      $set: { "paper_status": dest_status }
    }
      , function (err) {
        if (err) {
          console.log(res.internalServerError())
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

  //test
  // rest.put('/db/paper/test/:id', function (req, res) {
  //   let id = req.params.id;
  //   let item = '';
  //   Paper.findById(id).exec()
  //     .then(function (paper) {
  //       let current_status = item.paper_status;
  //       let num = item.update_paper_num;
  //       let lastedId = item.paper_content[num - 1]._id;
  //       console.log(lastedId);
  //       return res.accepted('/db/paper/' + encodeURI(id));
  //     }).catch(function (e) {
  //       console.log(res.internalServerError());
  //       return res.internalServerError();
  //     })
  // });


  return rest;

};