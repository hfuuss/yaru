export default {
  namespace: 'menu',

  state: {
    menukey: "home",//home myupload
  },

  reducers: {
    chageMenukey(state, action) {
      return {
        ...state,
        menukey: action.payload,
      };
    },
  },
};