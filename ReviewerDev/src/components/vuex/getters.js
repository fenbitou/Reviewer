var axios= require('../axios');

const getters = {
  paperItems: (state) => {
    return state.paperItems
  },
  temp: (state) => {
    return state.temp
  }
};

export default getters
