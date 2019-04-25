export default {
  namespace: 'config',

  
  state: {
    accessKey: localStorage.getItem('yaccessKey') || '',
    secretKey: localStorage.getItem('ysecretKey') || '',
    bucket: localStorage.getItem('ybucket') || '',
    host:localStorage.getItem('yhost') || '',
  },

  reducers: {
    chageConfigKey(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};