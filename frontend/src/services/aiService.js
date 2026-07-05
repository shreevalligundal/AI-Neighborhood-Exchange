import api from "../api/axios";

const aiService = {
  async generateDescription(data) {
    const response = await api.post(
      "/ai/generate-description",
      data
    );

    return response.data;
  },
};

export default aiService;