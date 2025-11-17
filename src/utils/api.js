
import axios from 'axios';

const api = axios.create({
    // baseURL: '/api',
    baseURL: 'http://techtrack.runasp.net/api',
    timeout: 10000,
});

export const apiService = {

    getCompanies: () => api.get('/Company'),
    getCompanyById: (companyId) => api.get(`/Company/${companyId}`),
    getCompanyTechnologies: () => api.get(`/CompanyTechnology`),


    getCategories: () => api.get('/Category'),
    getCategoriesId: (categoryId) => api.get(`/Category/${categoryId}`),


    getSubCategories: () => api.get(`/SubCategory`),
    getSubCategoriesId: (subCategoryId) => api.get(`/SubCategory/${subCategoryId}`),
    getTracks: () => api.get(`/Track`),
    getTracksId: (trackId) => api.get(`/Track/${trackId}`),
    getTechnologies: () => api.get(`/Technology`),
    getTechnologiesId: (technologyId) => api.get(`/Technology/${technologyId}`),
    getInterviewQuestions: () => api.get(`/InterviewQuestion`),
    getRoadmap: () => api.get(`/Roadmap`),


};