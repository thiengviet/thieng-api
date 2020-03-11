var axios = require('axios');

/**
 * Facebook authentication 
 */
const facebookClient = {
  verifyIdToken: function (token) {
    return axios({
      method: 'get',
      url: 'https://graph.facebook.com/v6.0/debug_token',
      params: { input_token: token, access_token: token }
    });
  },
  getUserData: function (userId, token) {
    return axios({
      method: 'get',
      url: 'https://graph.facebook.com/v6.0/' + userId,
      params: { fields: 'id,name,email,picture', access_token: token }
    });
  }
}

/**
 * Constructor
 */
var facebookJS = {}

facebookJS.verifyToken = function (token) {
  var data = {}
  return new Promise((resolve, reject) => {
    facebookClient.verifyIdToken(token).then(re => {
      let payload = re.data;
      if (!payload) return reject('No data');

      data.userId = payload.data.user_id;
      data.exp = payload.data.data_access_expires_at;
      return facebookClient.getUserData(data.userId, token)
    }).then(re => {
      let payload = re.data;
      if (!payload) return reject('No data');

      data.email = payload.email;
      data.name = payload.name;
      data.picture = payload.picture.data.url;
      return resolve(data);
    }).catch(er => {
      return reject(er);
    })
  })
}

module.exports = facebookJS;