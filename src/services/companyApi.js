// services/companyApi.js
import axios from 'axios';

class CompanyApiService {
  constructor() {
    // Create axios instance for company operations
    this.api = axios.create({
      baseURL: process.env.SERVER_URL || "http://localhost:5000/api",
      withCredentials: true,
      timeout: 10000,
    });

    // Store reference for getState access
    this.store = null;
    
    // Setup interceptors
    this.setupInterceptors();
  }

  // Set Redux store reference
  setStore(store) {
    this.store = store;
  }

  // Get auth headers from Redux state
  getAuthHeaders() {
    if (!this.store) return {};
    
    const state = this.store.getState();
    const token = state.auth?.accessToken;
    
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Setup request interceptor
  setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        // Auto-add auth headers to every request
        const authHeaders = this.getAuthHeaders();
        config.headers = {
          ...config.headers,
          ...authHeaders,
        };
        
        console.log(`🏢 Company API: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Company API Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        console.log(`✅ Company API Success: ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`❌ Company API Error: ${error.config?.url}`, error.response?.data);
        return Promise.reject(error);
      }
    );
  }

  // **CRUD Operations for Company**

  // Create Company
  async createCompany(companyData) {
    const response = await this.api.post('/companies', companyData);
    return response.data;
  }

  // Get All Companies
  async getAllCompanies() {
    const response = await this.api.get('/companies');
    return response.data;
  }

  // Get Company By ID
  async getCompanyById(companyId) {
    const response = await this.api.get(`/companies/${companyId}`);
    return response.data;
  }

  // Update Company
  async updateCompany(companyId, updateData) {
    const response = await this.api.patch(`/companies/${companyId}`, updateData);
    return response.data;
  }

  // Delete Company
  async deleteCompany(companyId) {
    const response = await this.api.delete(`/companies/${companyId}`);
    return response.data;
  }

  // **Additional Utility Methods**

  // Search Companies
  async searchCompanies(searchTerm) {
    const response = await this.api.get(`/companies?search=${encodeURIComponent(searchTerm)}`);
    return response.data;
  }

  // Get Companies by Status
  async getCompaniesByStatus(status) {
    const response = await this.api.get(`/companies?status=${status}`);
    return response.data;
  }
}

// Create and export singleton instance
const companyApiService = new CompanyApiService();
export default companyApiService;
