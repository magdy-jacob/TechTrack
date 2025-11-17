// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
});
// http://techtrack.runasp.net/api/Company

// API Endpoints (كل واحد function بسيطة)
export const apiService = {
    // Companies
    getCompanies: () => api.get('/Company'),
    getCompanyById: (companyId) => api.get(`/Company/${companyId}`),
    getCompanyTechnologies: () => api.get(`/CompanyTechnology`),

    // Roadmap
    getCategories: () => api.get('/Category'),
    getCategoriesId: (categoryId) => api.get(`/Category/${categoryId}`),


    getSubCategories: () => api.get(`/SubCategory`),
    getSubCategoriesId: (subCategoryId) => api.get(`/SubCategory/${subCategoryId}`),
    getTracks: () => api.get(`/Track`),
    getTracksId: (trackId) => api.get(`/Track/${trackId}`),
    getTechnologies: () => api.get(`/Technology`),
    getTechnologiesId: (technologyId) => api.get(`/Technology/${technologyId}`),
    getInterviewQuestions: () => api.get(`/InterviewQuestion`),


};