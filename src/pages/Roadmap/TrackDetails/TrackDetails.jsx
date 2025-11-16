// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import axios from "axios";
// import Loader from "../../../componants/ui/Loader";
// import ErrorMessage from "../../../componants/ui/Error";

// export default function FrontendPage() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const [subCategories, setSubCategories] = useState([]);
//   const [currentCategory, setCurrentCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);


//         const categoriesResponse = await axios.get('http://techtrack.runasp.net/api/Category');

//         if (categoriesResponse.data.success && Array.isArray(categoriesResponse.data.data)) {
//           const categories = categoriesResponse.data.data.filter(item =>
//             item.categoryName !== "string"
//           );

//         } else {
//           throw new Error('Unexpected API response');
//         }




//         const foundCategory = categories.find(cat =>
//           createSlug(cat.categoryName) === slug
//         );

//         if (!foundCategory) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCurrentCategory(foundCategory);


//         const subCategoriesResponse = await axios.get('http://techtrack.runasp.net/api/SubCategories');
//         const filteredSubCategories = subCategoriesResponse.data.data.filter(item =>
//           item.categoryId === foundCategory.categoryId &&
//           item.subCategoryName !== "string" &&
//           item.description !== "string"
//         );

//         setSubCategories(filteredSubCategories);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [slug]);


//   const createSlug = (name) => {
//     return name
//       .toLowerCase()
//       .replace(/ & /g, '-')
//       .replace(/ /g, '-')
//       .replace(/[^\w-]+/g, '');
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <ErrorMessage message={error} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-16 px-6">
//       <div className="max-w-4xl mx-auto text-center mt-4">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           {currentCategory?.categoryName || "Developer Roadmap"}
//         </h1>
//         <p className="text-gray-900 text-sm text-center mb-8">
//           {currentCategory?.description || "Choose your specialization and start your learning journey"}
//         </p>

//         <div className="w-32 h-1 bg-gray-900 mx-auto mb-10"></div>
//       </div>

//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Specialization Tracks
//       </h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
//         {subCategories.map((subCategory) => (
//           <Link
//             key={subCategory.subCategoryId}
//             to={`/trackdetails/${slug}/${createSlug(subCategory.subCategoryName)}`}
//             className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 flex flex-col h-full"
//           >
//             <h2 className="text-xl font-bold text-blue-500 mb-3">
//               {subCategory.subCategoryName}
//             </h2>

//             <p className="text-gray-600 text-sm mb-4 flex-grow">
//               {subCategory.description}
//             </p>

//             <div className="space-y-3">
//               <div>
//                 <div className="text-blue-500 font-semibold text-sm mb-1">Difficulty:</div>
//                 <p className="text-gray-700 text-xs">
//                   {subCategory.difficultyLevel || "Various Levels"}
//                 </p>
//               </div>

//               {subCategory.estimatedDuration > 0 && (
//                 <div>
//                   <div className="text-blue-500 font-semibold text-sm mb-1">Duration:</div>
//                   <p className="text-gray-700 text-xs">
//                     {subCategory.estimatedDuration} hours
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Empty State */}
//       {subCategories.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-6xl mb-4">📚</div>
//           <h3 className="text-xl font-semibold text-gray-600 mb-2">
//             No Specializations Available
//           </h3>
//           <p className="text-gray-500 max-w-md mx-auto">
//             Currently there are no specialization tracks available for this category.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../componants/ui/Loader";
import ErrorMessage from "../../../componants/ui/Error";
import { useApi } from '../../../context/ApiContext';

export default function CategoryPage() {
  const { getCategoriesId, getSubCategories } = useApi();
  const { categoryId } = useParams(); // الـ ID من الـ URL
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = parseInt(categoryId);
        if (isNaN(id)) {
          setError("Invalid category ID");
          setLoading(false);
          return;
        }


        // const catRes = await axios.get("http://techtrack.runasp.net/api/Category");
        const catRes = await getCategoriesId(id);
        const categories = catRes.data.success ? catRes.data.data : [];

        // 2. ابحث عن الكاتيجوري بالـ ID
        // const foundCategory = categories.find(cat => cat.categoryId === id);

        if (!categories) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        setCategory(categories);


        // const subRes = await axios.get("http://techtrack.runasp.net/api/SubCategory");
        const subRes = await getSubCategories();
        const filteredSubs = (subRes.data.success ? subRes.data.data : [])
          .filter(sub => sub.categoryId === id)
          .filter(sub => sub.subCategoryName !== "string");

        setSubCategories(filteredSubs);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen px-3 bg-white pt-16 sm:pt-20 flex flex-col items-center">
      {/* Header */}
      <section className="w-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-15 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
            {category.categoryName}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto">
            {category.description}
          </p>
          <div className="flex gap-2 justify-center items-center pb-2">
            <Link to={"/roadmap/"} className="text-[15px] text-gray-600">
              Roadmaps
            </Link>
            /
            <Link to={`/roadmap/${category.categoryId}`} className="text-[15px]">
              {category.categoryName}
            </Link>
          </div>
          <div className="w-2xs md:w-lg h-px bg-black  mx-auto"></div>
      </section>
      

      <h2 className="text-3xl font-bold text-center mb-10 sm:mb-12 lg:mb-15 text-gray-800">
        Specialization Tracks
      </h2>

      {/* SubCategories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {subCategories.map((sub) => (
          <Link
            key={sub.subCategoryId}
            to={`/roadmap/${categoryId}/${sub.subCategoryId}`} // رابط بالـ ID فقط
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
          >
            {sub.imageUrl && (
              <img
                src={sub.imageUrl || "/src/assets/image/software.webp"}
                alt={sub.subCategoryName}
                className="w-full h-48 object-cover"

              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-blue-600 mb-3">
                {sub.subCategoryName}
              </h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {sub.description}
              </p>

              {/* <div className="space-y-3 mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-semibold text-sm">Difficulty:</span>
                  <span className="text-gray-700 font-medium">
                    {sub.difficultyLevel === 1 && "Beginner"}
                    {sub.difficultyLevel === 2 && "Beginner-Intermediate"}
                    {sub.difficultyLevel === 3 && "Intermediate"}
                    {sub.difficultyLevel === 4 && "Advanced"}
                    {sub.difficultyLevel === 5 && "Expert"}
                  </span>
                </div>

                {sub.estimatedDuration > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-blue-500 font-semibold text-sm">Duration:</span>
                    <span className="text-gray-700 font-medium">
                      {sub.estimatedDuration} hours
                    </span>
                  </div>
                )}
              </div> */}

              <div className="mt-6 text-center">
                <span className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                  Explore
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {subCategories.length === 0 && (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">Empty</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            No tracks available yet
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}









