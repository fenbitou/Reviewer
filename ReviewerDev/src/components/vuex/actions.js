let axios = require("../axios");
var API_PAPER_ROUTER ="/db/paper";

const actions = {
  InitPaperItem ({ commit }) {
    return new Promise((on_result) =>{
        console.log('actions InitPaperItem');
        axios.get(API_PAPER_ROUTER)
        .then(function (response){
          commit('initPaperItems', response.data);
          console.log(response);
          on_result({result:true, message:response.data});
        })
        .catch( function (error)   {
          console.log('error');
          on_result({result:false, message:error});
        } );
    });
  },

  AddPaperItem({ commit }, item) {
    axios.post(API_PAPER_ROUTER, item)
      .then(function (response){
        commit('addPaperItem', response.data);
      })
      .catch( function (error)   { console.log(error);  } );
  },

  DeletePaperItem ({ commit }, id) {
    axios.delete(API_PAPER_ROUTER+"/"+id)
      .then(function (response){
        commit('deletePaperItem', id);
      })
      .catch( function (error)   { console.log(error);  } );
  }

};

export default actions
