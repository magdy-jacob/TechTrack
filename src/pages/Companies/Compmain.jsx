import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Filter from "./Filter";
import Card from "../../components/ui/Card.jsx";

const Companies = () => {
  const cardsPerPage = 6; //
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const totalCards = 12;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;

  const visibleCards = Array.from(
    { length: Math.min(cardsPerPage, totalCards - startIndex) },
    (_, index) => (
      <Card
        key={startIndex + index}
        companyIndex={startIndex + index}
        searchTerm={searchTerm}
      />
    )
  );
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-25">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-3xl mx-auto mt-10 border border-gray-300 rounded-full px-3 py-2 focus-within:shadow-md transition">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search for a company"
          className="flex-1 outline-none text-gray-700 text-sm sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Filter + Cards */}
      <div className="mt-10 mb-20 flex flex-col md:flex-row gap-6">
        {/* Filter */}
        <Filter />

        <div className="flex-1">
          {/* Cards Grid مع animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8 place-items-center"
            >
              {visibleCards.map((card, index) => (
                <motion.div key={index} variants={itemVariants}>
                  {card}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-2 mt-12 text-sm text-gray-600"
              variants={paginationVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Previous Button */}
              <motion.button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 border border-gray-300"
                }`}
              >
                Previous
              </motion.button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {page}
                  </motion.button>
                )
              )}

              {/* Next Button */}
              <motion.button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 border border-gray-300"
                }`}
              >
                Next
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;

// // Compmain.jsx (محدث)
// import React, { useState, useEffect, useMemo } from 'react';
// import { Search } from "lucide-react";
// import { motion, AnimatePresence } from 'framer-motion';
// import Card from '../../Components/ui/Card';
// import Loader from '../../Components/ui/Loader'; // ملفك
// import ErrorMessage from '../../Components/ui/Error'; // ملفك
// import { useApi } from '../../context/ApiContext';

// const Companies = () => {
//   const { getCompanies } = useApi();
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const cardsPerPage = 6;

//   // جلب الداتا مرة واحدة
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await getCompanies();
//         setCompanies(res.data);
//       } catch (err) {
//         setError("Failed to load companies. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCompanies();
//   }, [getAllCompanies]);

//   // فلترة حسب البحث
//   const filteredCompanies = useMemo(() => {
//     if (!searchTerm.trim()) return companies;
//     return companies.filter(c =>
//       c.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [companies, searchTerm]);

//   // الباجينيشن
//   const totalPages = Math.ceil(filteredCompanies.length / cardsPerPage);
//   const startIndex = (currentPage - 1) * cardsPerPage;
//   const visibleCompanies = filteredCompanies.slice(startIndex, startIndex + cardsPerPage);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//   };

//   // لو لسه بيحمل
//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage message={error} />;

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-25">
//       {/* Search Bar */}
//       <div className="flex items-center w-full max-w-3xl mx-auto mt-10 border border-gray-300 rounded-full px-3 py-2 focus-within:shadow-md transition">
//         <Search className="text-gray-500 w-5 h-5 mr-2" />
//         <input
//           type="text"
//           placeholder="Search for a company"
//           className="flex-1 outline-none text-gray-700 text-sm sm:text-base"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//         />
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm transition"
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//       </div>

//       {/* Filter + Cards */}
//       <div className="mt-10 mb-20 flex flex-col md:flex-row gap-6">
//         <Filter />

//         <div className="flex-1">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentPage}
//               variants={{
//                 hidden: { opacity: 0 },
//                 visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
//               }}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8 place-items-center"
//             >
//               {visibleCompanies.map((company, index) => (
//                 <motion.div
//                   key={company.id || index}
//                   variants={{
//                     hidden: { y: 20, opacity: 0 },
//                     visible: { y: 0, opacity: 1 }
//                   }}
//                 >
//                   <Card company={company} index={startIndex + index} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <motion.div
//               className="flex justify-center items-center gap-2 mt-12 text-sm text-gray-600"
//               variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.button
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
//                 whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
//                 className={`px-5 py-2 rounded-lg font-medium transition ${currentPage === 1
//                   ? 'text-gray-400 cursor-not-allowed'
//                   : 'hover:bg-gray-100 border border-gray-300'
//                   }`}
//               >Previous</motion.button>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                 <motion.button
//                   key={page}
//                   onClick={() => goToPage(page)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className={`w-10 h-10 rounded-lg font-medium transition ${currentPage === page
//                     ? 'bg-blue-600 text-white'
//                     : 'hover:bg-gray-100 border border-gray-300'
//                     }`}
//                 >{page}</motion.button>
//               ))}

//               <motion.button
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
//                 whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
//                 className={`px-5 py-2 rounded-lg font-medium transition ${currentPage === totalPages
//                   ? 'text-gray-400 cursor-not-allowed'
//                   : 'hover:bg-gray-100 border border-gray-300'
//                   }`}
//               >Next</motion.button>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Companies;
