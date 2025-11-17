
import React, { useState, useEffect, useMemo } from 'react';
import Loader from './Loader';
import ErrorMessage from './Error';
import { useApi } from '../../context/ApiContext';

const Card = ({ companyIndex = 0, searchTerm = '' }) => {
  const { getCompanies, getCompanyTechnologies } = useApi();

  const [companies, setCompanies] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await getCompanies();
        setCompanies(res.data);
      } catch (err) {
        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [getCompanies]);


  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const res = await getCompanyTechnologies();
        setAllTechnologies(res.data);
      } catch (err) {
        console.error("Failed to load technologies:", err);
        <ErrorMessage message={err} />;
      }
    };
    fetchAllTechnologies();
  }, [getCompanyTechnologies]);


  const filteredCompanies = useMemo(() => {
    if (!searchTerm.trim()) return companies;
    return companies.filter(company =>
      company.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companies, searchTerm]);

  const currentCompany = filteredCompanies[companyIndex];
  const bgColor = '#fff';


  const companyTechs = useMemo(() => {
    if (!currentCompany || !allTechnologies.length) return [];

    return allTechnologies
      .filter(tech => tech.companyId === currentCompany.companyId)
      .map(tech => tech.notes?.trim())


  }, [currentCompany, allTechnologies]);

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <Loader />;
  if (!currentCompany) return null;

  return (
    <a
      href={currentCompany.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div

        className={`border-2 border-[#042B95] shadow-2xl  rounded-3xl py-8 px-3 xl:p-8
                   h-[350px] flex flex-col
                   w-full md:w-[250px] xl:w-[286px] 2xl:w-[350px]
                   justify-center items-center
                   hover:shadow-xl transition-shadow duration-300`}
        style={{ backgroundColor: bgColor }}
      >

        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {currentCompany.companyName?.charAt(0) || 'C'}
        </div>


        <p className="titleBrand text-lg mt-3 font-[500] text-center text-gray-900">
          {currentCompany.companyName}
        </p>


        <div className="flex justify-center items-center bg-[#CDDAFE] mt-2 px-3 py-1 rounded-full">
          <p className="text-sm text-indigo-700 font-medium">
            {currentCompany.industry}
          </p>
        </div>


        <div className="contentCard my-4 text-center flex-1 overflow-hidden">
          <p className="text-[14px] font-[400] leading-[150%] line-clamp-3 text-gray-700">
            {currentCompany.description}
          </p>
        </div>


        <div className="stackCompany flex justify-center items-center gap-2 flex-wrap mt-2">
          {companyTechs.slice(0, 2).map((tech, index) => (
            <div
              key={index}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700 shadow-sm"
            >
              {tech}
            </div>
          ))}
          {companyTechs.length > 2 && (
            <div className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-600">
              +{companyTechs.length - 2}
            </div>
          )}
          {companyTechs.length === 0 && (
            <p className="text-xs text-gray-500">No tech stack</p>
          )}
        </div>


        {/* <div className="mt-auto pt-3">
          <span className="text-xs text-blue-600 font-medium hover:underline hover:text-blue-900 transition duration-100">
            Visit Website
          </span>
        </div> */}
      </div>
    </a>
  );
};

export default Card;






















// import React, { useState, useEffect, useMemo } from 'react';

// import Loader from './Loader';
// import ErrorMessage from './Error';
// import { useApi } from '../../context/ApiContext';
// import { col } from 'framer-motion/client';


// // const colorBg = [
// //   '#ff8383', '#ff81bc', '#70ffe0',
// //   '#D2F0E4', '#adadff', '#7bff8d',
// //   '#ffd891', '#faf05f', '#d99fff'
// // ];

// const Card = ({ companyIndex = 0, searchTerm = '' }) => {
//   const { getCompanies, getCompanyTechnologies } = useApi();
//   const [companies, setCompanies] = useState([]);
//   const [technology, setTechnology] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         // setCompanies(response.data);
//         const res = await getCompanies();
//         setCompanies(res.data);
//       } catch (err) {

//         setError("Failed to load companies. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   useEffect(() => {
//     const filterTechnologies = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await getCompanyTechnologies();
//         let technologiesData = response.data;
//         const Technologies = technologiesData.filter(tech => {
//           return tech.companyId === parseInt(companyId);
//         });
//         setTechnology(Technologies);
//       } catch (err) {
//         setError("Failed to load companies. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     filterTechnologies();
//   }, [companyId]);

//   const filteredCompanies = useMemo(() => {
//     if (!searchTerm.trim()) return companies;

//     return companies.filter(company =>
//       company.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [companies, searchTerm]);

//   const currentCompany = filteredCompanies[companyIndex];



//   const bgColor = '#FAFAFA';


//   // const bgColor = colorBg[companyIndex % colorBg.length];

//   // const isBlackBg = bgColor === '#000000' || bgColor === '#0000ff' || bgColor === '#261B53';
//   // const textColorClass = isBlackBg ? 'text-white' : 'text-gray-900';
//   // const descriptionColorClass = isBlackBg ? 'text-gray-300' : 'text-gray-700';

//   if (error) {
//     return <ErrorMessage message={error} />;
//   }

//   if (loading) {
//     return <Loader />;
//   }


//   if (!currentCompany) return null;

//   return (
//     <a
//       href={currentCompany.websiteUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="block"
//     >
//       <div
//         className={`border-2 border-black rounded-3xl py-8 px-3 xl:p-8
//                    h-[350px]
//                    flex flex-col
//                    w-full md:w-[250px] xl:w-[286px] 2xl:w-[350px]
//                    justify-center items-center
//                    hover:shadow-xl transition-shadow duration-300`}
//         style={{ backgroundColor: bgColor }}
//       >
//         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
//           {currentCompany.companyName?.charAt(0) || 'C'}
//         </div>

//         <p className={`titleBrand text-lg mt-3 font-[500] text-center`}>
//           {currentCompany.companyName}
//         </p>

//         <div className="flex justify-center items-center bg-[#CDDAFE] mt-2 px-3 py-1 rounded-full">
//           <p className="text-sm text-indigo-700 font-medium">
//             {currentCompany.industry}
//           </p>
//         </div>

//         <div className="contentCard my-4 text-center flex-1 overflow-hidden">
//           <p className={`text-[14px] font-[400] leading-[150%] line-clamp-3`}>
//             {currentCompany.description}
//           </p>
//         </div>

//         <div className="mt-auto">
//           <span className="text-xs text-blue-600 font-medium hover:underline hover:text-blue-900 transition duration-100">
//             Visit Website
//           </span>
//         </div>
//       </div>
//     </a>
//   );
// };

// export default Card;





// // Card.jsx (محدث)
// import React from 'react';

// const colorBg = [
//   '#000000', '#FFFF00', '#5757E8',
//   '#D2F0E4', '#09090B', '#2A2537',
//   '#FFFFFF', '#261B53', '#FEFEFE'
// ];

// const Card = ({ company, index = 0 }) => {
//   if (!company) return null;

//   const bgColor = colorBg[index % colorBg.length];
//   const isBlackBg = ['#000000', '#09090B', '#261B53'].includes(bgColor);
//   const textColor = isBlackBg ? 'text-white' : 'text-gray-900';
//   const descColor = isBlackBg ? 'text-gray-300' : 'text-gray-700';

//   return (
//     <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
//       <div
//         className={`border-2 border-black rounded-3xl py-8 px-3 xl:p-8 h-[350px] flex flex-col w-full md:w-[250px] xl:w-[286px] 2xl:w-[350px] justify-center items-center hover:shadow-xl transition-shadow duration-300`}
//         style={{ backgroundColor: bgColor }}
//       >
//         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
//           {company.companyName?.charAt(0) || 'C'}
//         </div>

//         <p className={`titleBrand text-lg mt-3 font-[500] text-center ${textColor}`}>
//           {company.companyName}
//         </p>

//         <div className="flex justify-center items-center bg-[#CDDAFE] mt-2 px-3 py-1 rounded-full">
//           <p className="text-sm text-indigo-700 font-medium">{company.industry}</p>
//         </div>

//         <div className="contentCard my-4 text-center flex-1 overflow-hidden">
//           <p className={`text-[14px] font-[400] leading-[150%] line-clamp-3 ${descColor}`}>
//             {company.description}
//           </p>
//         </div>

//         <div className="mt-auto">
//           <span className="text-xs text-blue-600 font-medium hover:underline">
//             Visit Website
//           </span>
//         </div>
//       </div>
//     </a>
//   );
// };

// export default Card;