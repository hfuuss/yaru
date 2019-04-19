export default {
  namespace: 'config',

  state: {
    accessKey: 'NryKyLkX_nWeFeAQU4DNbReLMNosrD4FQgBMJ9Jd',
    secretKey: 'HajXVRe_UiLkY6LjgbFocCxKWXf4PLe9VTJ8w4xp',
    bucket: 'zhangsan',
    host:'https://images.hfuusec.cn/',
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