import base64 from 'base-64'
import CryptoJS from 'crypto-js';

/**
 * 上传凭证算法实现参考
 * 请注意External Resources项中引用的第三方CryptoJS库
 */
const genUpToken = (accessKey, secretKey, putPolicy) => {
  //SETP 2
  var put_policy = JSON.stringify(putPolicy);
  //SETP 3
  var encoded = base64.encode(put_policy);
  //SETP 4
  // console.log(encoded,'encoded',secretKey)
  var hash = CryptoJS.HmacSHA1(encoded, secretKey);
  var encoded_signed = hash.toString(CryptoJS.enc.Base64);
  //SETP 5
  var upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
  return upload_token;
};


const safe64 = function(base64) {
  base64 = base64.replace(/\+/g, "-");
  base64 = base64.replace(/\//g, "_");
  return base64;
};
export default genUpToken