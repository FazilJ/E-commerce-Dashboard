import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com"; // Replace with your actual API URL

// Create an instance of Axios with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock orders data since FakeStore API doesn't have orders endpoint
const mockOrders = [
  {
    id: 1,
    userId: 1,
    date: "2023-01-01",
    products: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }],
    total: 499.98,
    status: "completed"
  },
  {
    id: 2,
    userId: 2,
    date: "2023-01-02",
    products: [{ productId: 3, quantity: 1 }],
    total: 299.99,
    status: "pending"
  },
  {
    id: 3,
    userId: 3,
    date: "2023-01-03",
    products: [{ productId: 4, quantity: 3 }],
    total: 899.97,
    status: "processing"
  },
  {
    id: 4,
    userId: 1,
    date: "2023-01-04",
    products: [{ productId: 5, quantity: 1 }],
    total: 199.99,
    status: "completed"
  },
  {
    id: 5,
    userId: 2,
    date: "2023-01-05",
    products: [{ productId: 6, quantity: 2 }],
    total: 399.98,
    status: "pending"
  }
];

// Fetch Products
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch Users
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch Orders
export const getOrders = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Add a New Product
export const addProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update a Product
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await api.put(`/products/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a Product
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export default api;
