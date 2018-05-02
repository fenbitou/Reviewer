let axios = require("../axios");
var API_PAPER_ROUTER = "/db/paper";

const actions = {
  /**
   * 初始化论文项目
   * 
   * @param {any} { commit } 
   * @returns 获取全部论文列表
   */
  InitPaperItem({ commit }) {
    return new Promise((on_result) => {
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

  /**
   * 按照指定的作者和文章状态搜索指定的文章
   * 
   * @param {any} { commit } 
   * @param {any} info  用户ID + 文章状态 
   * @returns 满足搜索条件的文章
   */
  FindStatusItem({ commit }, item) {
    let user_id = item.id;
    let paper_status = item.status;
    return new Promise((on_result) => {
      axios.get(API_PAPER_ROUTER + "/users/" + user_id + "/" + paper_status)
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

  /**
   * 获取全部文章的总数
   * 
   * @param {any} { commit } 
   * @returns 文章总数
   */
  GetAllPaperSum({ commit }) {
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

  /**
   * 获取符合搜索条件的文章总数
   * 
   * @param {any} { commit } 
   * @param {any} search_words 搜索关键字
   * @returns 符合搜索条件的文章总数
   */
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

  /**
   * 获取符合搜索条件的文章
   * 
   * @param {any} { commit } 
   * @param {any} search_words 搜索关键字
   * @returns 符合搜索条件的文章
   */
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

  /**
   * 获取符合搜索关键字的某页文章
   * 
   * @param {any} { commit } 
   * @param {any} { words, number } 关键字，页号
   * @returns 当前页的文章
   */
  GetPagedPaper({ commit }, { words, number }) {
    let search_words = words;
    let page_number = number;
    return new Promise((on_result) => {
      axios.get(API_PAPER_ROUTER + "/paging/" + search_words + "/" + page_number)
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

  /**
   * 修改文章内容或添加文章内容
   * 
   * @param {any} { commit } 
   * @param {any} item 修改后的文章内容和文章ID
   */
  UpdatePaperContent({ commit }, item) {
    axios.put(API_PAPER_ROUTER + "/" + item.update_item_id, { time: item.update_time, content: item.update_content })
      .then(function (response) {
        commit('updatePaperContent', response.data);
      })
      .catch(function (error) { console.log(error); });
  },

  /**
   * 更新文章状态
   * init-commit 学生提交，commit-final 老师处理
   * @param {any} { commit } 
   * @param {any} item 需要更新的文章ID
   */
  UpdatePaperStatus({ commit }, item) {
    axios.put(API_PAPER_ROUTER + "/status/" + item.id, {
      paper_status: item.status,
      paper_content: item.paper,
      paper_time: item.time,
      paper_comment: item.comment || ""
    })
      .then(function (response) {
        commit('updatePaperStatus', response.data);
      })
      .catch(function (error) { console.log(error); });
  },

  /**
   * 添加一篇文章
   * 
   * @param {any} { commit } 
   * @param {any} item 添加的文章内容
   */
  AddPaperItem({ commit }, item) {
    axios.post(API_PAPER_ROUTER, item)
      .then(function (response) {
        commit('addPaperItem', response.data);
      })
      .catch(function (error) { console.log(error); });
  },

  /**
   * 删除一篇文章
   * 
   * @param {any} { commit } 
   * @param {any} id 需要删除的文章ID
   */
  DeletePaperItem({ commit }, id) {
    axios.delete(API_PAPER_ROUTER + "/" + id)
      .then(function (response) {
        commit('deletePaperItem', id);
      })
      .catch(function (error) { console.log(error); });
  }
};

export default actions
