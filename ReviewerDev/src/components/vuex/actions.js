let axios = require("../axios");
var API_PAPER_ROUTER = "/db/paper";

const actions = {
  //初始化论文项目，实际上就是获取全部论文列表
  InitPaperItem({ commit }) {
    return new Promise((on_result) => {
      console.log('actions InitPaperItem');
      axios.get(API_PAPER_ROUTER)
        .then(function (response) {
          commit('initPaperItems', response.data);
          on_result({ result: true, message: response.data });
        })
        .catch(function (error) {
          console.log('error');
          on_result({ result: false, message: error });
        });
    });
  },

  //按照指定的作者和文章状态搜索指定的文章
  FindStatusItem({ commit }, user_info) {
    return new Promise((on_result) => {
      console.log('actions FindStatusItem : ' + user_info[0] + "  " + user_info[1]);
      axios.get(API_PAPER_ROUTER + "/users/" + user_info[0] + "/" + user_info[1])
        .then(function (response) {
          commit('findStatusItem', response.data);
          on_result({ result: true, message: response.data });
        })
        .catch(function (error) {
          console.log('error');
          on_result({ result: false, message: error });
        });
    });
  },

  //获取全部文章的总数
  GetAllPaperSum({ commit }) {
    console.log("getPaperSum success");
    return new Promise((on_result) => {
      axios.get(API_PAPER_ROUTER + "/paperSum/allpaper")
        .then(function (response) {
          commit('getPaperSum', response.data);
          on_result({ result: true, message: response.data });
        })
        .catch(function (error) {
          console.log('error');
          on_result({ result: false, message: error });
        });
    });
  },

  //获取符合搜索条件的文章总数
  GetPaperSumAfterSearch({ commit }, search_words) {
    return new Promise((on_result) => {
      axios.get(API_PAPER_ROUTER + "/paperSum/" + search_words)
        .then(function (response) {
          commit('getPaperSumAfterSearch', response.data);
          on_result({ result: true, message: response.data });
        })
        .catch(function (error) {
          console.log('error');
          on_result({ result: false, message: error });
        });
    });
  },

  //获取符合搜索条件的文章
  GetPaperAfterSearch({ commit }, search_words) {
    return new Promise((on_result) => {
      axios.get(API_PAPER_ROUTER + "/search/" + search_words)
        .then(function (response) {
          commit('getPaperAfterSearch', response.data);
          on_result({ result: true, message: response.data });
        })
        .catch(function (error) {
          console.log('error');
          on_result({ result: false, message: error });
        });
    });
  },

  //获取指定页的文章
  GetPagedPaper({ commit }, item) {
    let page_number = item.number;
    let search_words = item.words;
    return new Promise((on_result) => {
      axios.get(API_PAPER_ROUTER + "/paging/" + page_number, { words: search_words })
        .then(function (response) {
          commit('getPagedPaper', response.data);
          on_result({ result: true, message: response.data });
        })
        .catch(function (error) {
          console.log('error');
          on_result({ result: false, message: error });
        });
    });
  },

  // 添加文章修改历史记录 
  UpdatePaperContent({ commit }, item) {
    axios.put(API_PAPER_ROUTER + "/" + item.update_item_id, { slug: 'content', time: item.update_time, content: item.update_content })
      .then(function (response) {
        commit('updatePaperContent', response.data);
      })
      .catch(function (error) { console.log(error); });
  },

  // 修改文章状态 
  UpdatePaperStatus({ commit }, item) {
    axios.put(API_PAPER_ROUTER + "/" + item.update_item_id, { slug: 'status', status: item.update_status })
      .then(function (response) {
        commit('updatePaperStatus', response.data);
      })
      .catch(function (error) { console.log(error); });
  },


  AddPaperItem({ commit }, item) {
    axios.post(API_PAPER_ROUTER, item)
      .then(function (response) {
        commit('addPaperItem', response.data);
      })
      .catch(function (error) { console.log(error); });
  },

  DeletePaperItem({ commit }, id) {
    axios.delete(API_PAPER_ROUTER + "/" + id)
      .then(function (response) {
        commit('deletePaperItem', id);
      })
      .catch(function (error) { console.log(error); });
  }
};

export default actions
