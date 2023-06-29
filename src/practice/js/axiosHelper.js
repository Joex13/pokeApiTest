import axios from 'axios';

/**
 * axiosのラッパー関数
 * @param {string} requestUrl リクエスト先URL
 * @return {Promise} プロミスオブジェクト
 */
export const $axios = (requestUrl) => {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl).then(res => {
      resolve(res);
    }).catch(error => {
      switch (error.response && error.response.status) {
        case 404:
          reject(error.message);
          break;
        default:
          reject('エラーが発生しました。時間をおいて再度お試しください。');
          break;
      }
    });
  });
};