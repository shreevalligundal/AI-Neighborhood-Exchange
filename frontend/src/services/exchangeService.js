import api from "../api/axios";

const exchangeService = {
  // Send Exchange Request
  async sendRequest(exchangeData) {
    const response = await api.post("/exchange/request", exchangeData);
    return response.data;
  },

  // Get Received Requests
  async getReceivedRequests() {
    const response = await api.get("/exchange/received");
    return response.data;
  },

  // Get Sent Requests
  async getSentRequests() {
    const response = await api.get("/exchange/sent");
    return response.data;
  },

  // Accept Request
  async acceptRequest(requestId) {
    const response = await api.put(
      `/exchange/${requestId}/accept`
    );
    return response.data;
  },

  // Reject Request
  async rejectRequest(requestId) {
    const response = await api.put(
      `/exchange/${requestId}/reject`
    );
    return response.data;
  },

  // Cancel Request
  async cancelRequest(requestId) {
    const response = await api.delete(
      `/exchange/${requestId}`
    );
    return response.data;
  },
};

export default exchangeService;