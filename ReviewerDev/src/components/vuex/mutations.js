function getIndexbyId(state, id) {
  for (var i in state.paperItems) {
    var item = state.paperItems[i];
    if (item._id === id) {
      return i;
    }
  }
  return -1;
}

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

  addPaperItem(state, item) {
    if (typeof (item) === 'string') {
      item = JSON.parse(item);
    }
    state.paperItems.push(item);
  },

  deletePaperItem(state, id) {
    var index = getIndexbyId(state, id);
    if (index === -1) {
      return;
    }
    state.paperItems.splice(index, 1);
  },

  redirectToShowPDF(state, pdfUrl) {
    state.temp = pdfUrl;
  }
};

export default mutations
