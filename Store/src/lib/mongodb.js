// MongoDB API 클라이언트
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const api = {
  // Orders
  getOrder: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
    if (!response.ok) throw new Error('주문을 가져오는 중 오류가 발생했습니다.');
    return response.json();
  },

  getOrders: async (userId, status) => {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (status) params.append('status', status);
    const response = await fetch(`${API_BASE_URL}/api/orders?${params.toString()}`);
    if (!response.ok) throw new Error('주문을 가져오는 중 오류가 발생했습니다.');
    return response.json();
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('주문 상태 업데이트 중 오류가 발생했습니다.');
    return response.json();
  },

  // Store Managers
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/api/store-managers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '로그인에 실패했습니다.');
    }
    return response.json();
  },

  // Stadiums (주문에 stadium 정보 표시용)
  getStadiums: async () => {
    const response = await fetch(`${API_BASE_URL}/api/stadiums`);
    if (!response.ok) throw new Error('Stadiums를 가져오는 중 오류가 발생했습니다.');
    return response.json();
  },
};

