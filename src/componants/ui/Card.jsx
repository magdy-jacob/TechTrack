// src/componants/ui/Card.jsx
import React from 'react';

const Card = ({ company, companyTechs = [] }) => {
  if (!company) return null;

  return (
    <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
      <div className={`
        border-2 border-[#042B95] shadow-2xl rounded-3xl py-8 px-3 xl:p-8
        h-[350px] flex flex-col w-[300px] md:w-[300px] xl:w-[286px] 2xl:w-[350px]
        justify-center items-center hover:shadow-xl transition-shadow duration-300
      `} style={{ backgroundColor: '#fff' }}>

        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {company.companyName?.charAt(0) || 'C'}
        </div>

        <p className="titleBrand text-lg mt-3 font-[500] text-center text-gray-900">
          {company.companyName}
        </p>

        <div className="flex justify-center items-center bg-[#CDDAFE] mt-2 px-3 py-1 rounded-full">
          <p className="text-sm text-indigo-700 font-medium">{company.industry}</p>
        </div>

        <div className="contentCard my-4 text-center flex-1 overflow-hidden">
          <p className="text-[14px] font-[400] leading-[150%] line-clamp-3 text-gray-700">
            {company.description}
          </p>
        </div>

        <div className="stackCompany flex justify-center items-center gap-2 flex-wrap mt-2">
          {companyTechs.slice(0, 2).map((tech, i) => (
            <div key={i} className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700 shadow-sm">
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
      </div>
    </a>
  );
};

export default Card;