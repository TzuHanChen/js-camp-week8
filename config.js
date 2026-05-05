// ========================================
// API 設定
// ========================================

// 載入環境變數
require('dotenv').config({ path: '.env' });
const axios = require('axios');

// API 設定（從 .env 讀取）
const API_PATH = process.env.API_PATH;
const BASE_URL = 'https://livejs-api.hexschool.io/api/livejs/v1';
const ADMIN_TOKEN = process.env.API_KEY;

// 客戶和管理者各一個 axios instance
const customerRequest = axios.create({
  baseURL: `${BASE_URL}/customer/${API_PATH}`,
  timeout: 5000
});

const adminRequest = axios.create({
  baseURL: `${BASE_URL}/admin/${API_PATH}`,
  timeout: 5000,
  headers: {
    'Authorization': ADMIN_TOKEN
  },
});

customerRequest.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 統一處理所有的錯誤（4xx, 5xx）
    if (error.response) {
      console.error(`錯誤代碼: ${error.response.status}`, error.response.data);
      // 可以在這裡根據狀態碼做不同處理，例如 401 跳轉登入頁
    } else {
      console.error('網路連線異常或伺服器無回應');
    }
    // 繼續拋出錯誤，讓呼叫的地方決定是否要另外處理
    return Promise.reject(error);
  }
)

adminRequest.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 統一處理所有的錯誤（4xx, 5xx）
    if (error.response) {
      console.error(`錯誤代碼: ${error.response.status}`, error.response.data);
      // 可以在這裡根據狀態碼做不同處理，例如 401 跳轉登入頁
    } else {
      console.error('網路連線異常或伺服器無回應');
    }
    // 繼續拋出錯誤，讓呼叫的地方決定是否要另外處理
    return Promise.reject(error);
  }
)

module.exports = {
  API_PATH,
  BASE_URL,
  ADMIN_TOKEN,
  customerRequest,
  adminRequest
};