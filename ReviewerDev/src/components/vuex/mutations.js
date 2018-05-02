/**
 * 根据ID找到文章索引
 * 
 * @param {any} state 
 * @param {any} id 文章ID
 * @returns 文章索引
 */
function getIndexbyId(state, id) {
  for (let i in state.paperItems) {
    let item = state.paperItems[i];
    if (item._id === id) {
      return i;
    }
  }
  return -1;
}

/**
 * 根据id搜索文章内容
 * 
 * @param {any} state 
 * @param {any} id 文章ID
 * @returns 文章内容
 */
function getItembyId(state, id) {
  var index = getIndexbyId(state, id);
  if (index === -1)
    return null;
  return state.paperItems[index];
}

const mutations = {
  initPaperItems(state, paperItems) {
    state.paperItems = paperItems
  },

  /*-------获取文章总数-------*/
  getPaperSum(state, paperSum) {
    state.temp = paperSum;
  },

  getPaperSumAfterSearch(state, paperSum) {
    state.temp = paperSum;
  },

  /*-------获取文章-------*/
  getPagedPaper(state, paperItems) {
    state.paperItems = paperItems
  },

  getPaperAfterSearch(state, paperItems) {
    state.paperItems = paperItems
  },

  /*-------查询符合状态的文章-------*/
  findStatusItem(state, paperItems) { 
    state.paperItems = paperItems
  },

  updatePaperContent(state, paperItems) { 
    state.temp = paperItems
  },
  
  updatePaperStatus(state, paperItems) { 
    state.temp = paperItems
  },

  addPaperItem(state, item) {
    if (typeof (item) === 'string') {
      item = JSON.parse(item);
    }
    state.paperItems.push(item);
  },

  deletePaperItem(state, id) {
    let index = getIndexbyId(state, id);
    if (index === -1) {
      return;
    }
    state.paperItems.splice(index, 1);
  },

  saveTempValue(state, tempValue) {
    state.temp = tempValue;
  }

};

export default mutations
