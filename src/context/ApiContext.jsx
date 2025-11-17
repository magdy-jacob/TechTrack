
import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../utils/api';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

    const [companies, setCompanies] = useState([]);
    const [CompanyTechnologies, setCompanyTechnologies] = useState([]);
    const [allTechnologies, setAllTechnologies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [interviewQuestions, setInterviewQuestions] = useState([]);
    const [roadmaps, setRoadmaps] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    compRes,
                    compTechRes,
                    techRes,
                    catRes,
                    subCatRes,
                    trackRes,
                    iqRes,
                    roadmapRes
                ] = await Promise.all([
                    apiService.getCompanies(),
                    apiService.getCompanyTechnologies(),
                    apiService.getTechnologies(),
                    apiService.getCategories(),
                    apiService.getSubCategories(),
                    apiService.getTracks(),
                    apiService.getInterviewQuestions(),
                    apiService.getRoadmap(),
                ]);

                setCompanies(compRes.data || [] || compRes.data.data);
                setCompanyTechnologies(compTechRes.data || [] || compTechRes.data.data);
                setAllTechnologies(techRes.data.data || [] || techRes.data);
                setCategories(catRes.data.data || [] || catRes.data);
                setSubCategories(subCatRes.data.data || [] || subCatRes.data);
                setTracks(trackRes.data.data || [] || trackRes.data);
                setInterviewQuestions(iqRes.data || [] || iqRes.data.data);
                setRoadmaps(roadmapRes.data || [] || roadmapRes.data.data);
            } catch (err) {
                setError('Data loading failed. Please try again.');
                console.error('API Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const value = {
        companies,
        CompanyTechnologies,
        allTechnologies,
        categories,
        subCategories,
        tracks,
        interviewQuestions,
        roadmaps,
        loading,
        error,


    };

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);