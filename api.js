// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { customerRequest, adminRequest } = require('./config');

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  try {
    const data = await customerRequest.get('/products');
    return data.products;
  } catch (error) {
    return error;
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    const data = await customerRequest.get('/carts');
    return { carts: data.carts, total: data.total, finalTotal: data.finalTotal };
  } catch (error) {
    return error;
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  try {
    const data = await customerRequest.post('/carts', {
      data: { productId, quantity }
    });
    return { carts: data.carts, total: data.total, finalTotal: data.finalTotal };
  } catch (error) {
    return error;
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  try {
    const data = await customerRequest.patch('/carts', {
      data: { id: cartId, quantity }
    });
    return { carts: data.carts, total: data.total, finalTotal: data.finalTotal };
  } catch (error) {
    return error;
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  try {
    const data = await customerRequest.delete(`/carts/${cartId}`);
    return { carts: data.carts, total: data.total, finalTotal: data.finalTotal };
  } catch (error) {
    return error;
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  try {
    const data = await customerRequest.delete('/carts');
    return { carts: data.carts, total: data.total, finalTotal: data.finalTotal };
  } catch (error) {
    return error;
  }
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try {
    const data = await customerRequest.post('/orders', {
      data: { userInfo }
    });
    return data;
  } catch (error) {
    return error;
  }
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
    const data = await adminRequest.get('/orders');
    return data.orders;
  } catch (error) {
    return error;
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  try {
    const data = await adminRequest.put('/orders', {
      data: { id: orderId, paid: isPaid }
    });
    return data;
  } catch (error) {
    return error;
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  try {
    const data = await adminRequest.delete(`/orders/${orderId}`);
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
