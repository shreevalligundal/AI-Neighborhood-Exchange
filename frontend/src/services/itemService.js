import api from "../api/axios";

const itemService = {
  async getAllItems() {
    const response = await api.get("/items");
    return response.data;
  },

  async getMyItems() {
    const response = await api.get("/items/my-items");
    return response.data;
  },

  async getItemById(itemId) {
    const response = await api.get(`/items/details/${itemId}`);
    return response.data;
  },

  async createItem(itemData) {
    const response = await api.post("/items", itemData);
    return response.data;
  },

  async updateItem(itemId, itemData) {
    const response = await api.put(`/items/${itemId}`, itemData);
    return response.data;
  },

  async deleteItem(itemId) {
    const response = await api.delete(`/items/${itemId}`);
    return response.data;
  },

  async searchItems(keyword) {
    const response = await api.get(`/items/search?keyword=${keyword}`);
    return response.data;
  },

  async getItemsByCategory(category) {
    const response = await api.get(`/items/category/${category}`);
    return response.data;
  },
};

export default itemService;