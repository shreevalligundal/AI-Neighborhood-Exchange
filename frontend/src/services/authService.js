import api from "../api/axios";

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const login = async (email, password) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

const authService = {
  register,
  login,
  getCurrentUser,
};

export default authService;