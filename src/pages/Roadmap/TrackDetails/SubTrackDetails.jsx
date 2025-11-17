// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Loader from "../../../Components/ui/Loader";
// import ErrorMessage from "../../../Components/ui/Error";

// export default function TrackListPage() {
//   const { slug, subSlug } = useParams();
//   const navigate = useNavigate();

//   const [subCategory, setSubCategory] = useState(null);
//   const [tracks, setTracks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Helper: Convert names to slugs
//   const createSlug = (name) => {
//     return name
//       ?.toLowerCase()
//       .replace(/ & /g, "-")
//       .replace(/ /g, "-")
//       .replace(/[^\w-]+/g, "");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // 1️⃣ Get all subcategories
//         const subResponse = await axios.get("http://techtrack.runasp.net/api/SubCategories");
//         // const allSubs = subResponse.data.filter(item =>
//         //   item.subCategoryId !== "string" && item.description !== "string"
//         // );
//         const allSubs = subResponse.data.success ? catRes.data.data : [];

//         // 2️⃣ Find current subcategory
//         // const foundSub = allSubs.find(
//         //   (sub) => createSlug(sub.subCategoryName) === subSlug
//         // );
//         const foundSub = allSubs.find(cat => cat.subCategoryId === id);

//         if (!foundSub) {
//           setError("Subcategory not found");
//           setLoading(false);
//           return;
//         }

//         setSubCategory(foundSub);

//         // 3️⃣ Get all tracks and filter them by subCategoryId
//         const trackResponse = await axios.get("http://techtrack.runasp.net/api/Track");
//         // const filteredTracks = trackResponse.data.filter(
//         //   (track) => track.subCategoryId === foundSub.subCategoryId
//         // );
//         const filteredTracks = (trackResponse.data.success ? trackResponse.data.data : [])
//           .filter(sub => sub.subCategoryId === id)
//           .filter(sub => sub.trackName !== "string");

//         setTracks(filteredTracks);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching tracks:", err);
//         setError("Failed to load tracks. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [subSlug]);

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage message={error} />;

//   return (
//     <div className="min-h-screen bg-gray-50 py-16 px-6">
//       {/* Header Section */}
//       <div className="max-w-4xl mx-auto text-center mt-4">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           {subCategory?.subCategoryName || "Specialization"}
//         </h1>
//         <p className="text-gray-700 text-sm mb-8">
//           {subCategory?.description || "Explore learning tracks for this specialization"}
//         </p>
//         <div className="w-32 h-1 bg-gray-900 mx-auto mb-10"></div>
//       </div>

//       {/* Tracks Section */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
//         {tracks.map((track) => (
//           <div
//             key={track.trackId}
//             className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 flex flex-col h-full"
//           >
//             <h2 className="text-xl font-bold text-blue-500 mb-2">
//               {track.trackName}
//             </h2>

//             <p className="text-gray-600 text-sm mb-4 flex-grow">
//               {track.description || "No description available."}
//             </p>

//             <div className="text-gray-700 text-xs mb-3">
//               <span className="font-semibold text-blue-500">Difficulty:</span>{" "}
//               {track.difficultyLevel || "Various Levels"}
//             </div>

//             {track.estimatedDuration && (
//               <div className="text-gray-700 text-xs mb-3">
//                 <span className="font-semibold text-blue-500">Duration:</span>{" "}
//                 {track.estimatedDuration} hours
//               </div>
//             )}

//             <Link
//               // to={`/trackdetails/${slug}/${subSlug}/${createSlug(track.trackName)}`}
//               to={`/roadmap/${subCategory}/${track.trackId}`} // رابط بالـ ID فقط

//               className="mt-auto inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               View Track Details
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {tracks.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-6xl mb-4">🧩</div>
//           <h3 className="text-xl font-semibold text-gray-600 mb-2">
//             No Tracks Found
//           </h3>
//           <p className="text-gray-500 max-w-md mx-auto">
//             This subcategory doesn’t have any tracks yet.
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

// src/pages/TrackListPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/ui/Error";
import { useApi } from "../../../context/ApiContext";

export default function SubTrackDetails() {
  const { categoryId, subCategoryId } = useParams(); // نستخدم الـ ID مباشرة
  const navigate = useNavigate();
  const { getSubCategoriesId, getTracks } = useApi();
  const [categoryName, setCategoryName] = useState("");

  const [subCategory, setSubCategory] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const catId = parseInt(categoryId);
        const subId = parseInt(subCategoryId);

        if (isNaN(catId) || isNaN(subId)) {
          setError("Invalid URL parameters");
          setLoading(false);
          return;
        }

        // const subRes = await axios.get("http://techtrack.runasp.net/api/SubCategory");
        const subRes = await getSubCategoriesId(subId);
        if (!subRes.data.success)
          throw new Error("Failed to fetch subcategories");

        const foundSub = subRes.data.data;

        // تحقق إنها تابعة للـ category الصح
        if (
          foundSub.categoryId !== catId ||
          foundSub.subCategoryName === "string"
        ) {
          setError("Subcategory not found in this category");
          return;
        }

        setSubCategory(foundSub);

        // 2. جيب الـ Tracks وفلترها بالـ subCategoryId
        // const trackRes = await axios.get("http://techtrack.runasp.net/api/Track");
        const trackRes = await getTracks();
        if (!trackRes.data.success) throw new Error("Failed to fetch tracks");

        const filteredTracks = trackRes.data.data
          .filter((track) => track.subCategoryId === subId)
          .filter((track) => track.trackName && track.trackName !== "string");

        setTracks(filteredTracks);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    const getCategoryName = async () => {
      try {
        const res = await fetch(
          `/api/Category/${categoryId}`
        );
        const data = await res.json();
        if (data && data.data && data.data.categoryName) {
          setCategoryName(data.data.categoryName);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (categoryId) getCategoryName();
  }, [categoryId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen px-3 bg-white pt-16 sm:pt-20 flex flex-col items-center">
      {/* Header */}
      <section className="w-full mx-auto max-w-4xl px-2 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-15 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
          {subCategory.subCategoryName}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto">
          {subCategory.description}
        </p>
        <div className="flex gap-2 justify-center items-center pb-2">
          <Link
            to={"/roadmap/"}
            className="text-[12px] md:text-[15px] text-gray-600"
          >
            Roadmaps
          </Link>
          /
          <Link
            to={`/roadmap/${categoryId}`}
            className="text-[12px] md:text-[15px] text-gray-600"
          >
            {categoryName}
          </Link>
          /
          <Link
            to={`/roadmap/${categoryId}/${subCategoryId}`}
            className="text-[12px] md:text-[15px]"
          >
            {subCategory.subCategoryName}
          </Link>
        </div>
        <div className="w-2xs md:w-lg h-px bg-black  mx-auto"></div>
      </section>
      {/* Tracks Grid */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tracks.map((track) => (
            <Link
              key={track.trackId}
              to={`/roadmap/${categoryId}/${subCategoryId}/${track.trackId}`}
              className="group block bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100"
            >
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl xl:text-3xl font-bold drop-shadow-lg">
                    {track.trackName}
                  </h3>
                </div>
              </div>

              <div className="p-5 xl:p-8 relative">
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {track.description || "No description available."}
                </p>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-indigo-600 font-bold">Difficulty</span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      track.difficultyLevel <= 2
                        ? "bg-green-100 text-green-800"
                        : track.difficultyLevel === 3
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {track.difficultyLevel === 1
                      ? "Beginner"
                      : track.difficultyLevel === 2
                        ? "Beginner-Intermediate"
                        : track.difficultyLevel === 3
                          ? "Intermediate"
                          : track.difficultyLevel === 4
                            ? "Advanced"
                            : "Expert"}
                  </span>
                </div>

                {track.estimatedDuration > 0 && (
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-indigo-600 font-bold">Duration</span>
                    <span className="text-2xl font-bold text-gray-800">
                      {track.estimatedDuration} hours
                    </span>
                  </div>
                )}

                {/* <div className="text-center">
                  <span className="inline-block px-10 py-4 bg-black text-white text-xl font-bold rounded-full hover:bg-gray-800 transition shadow-lg">
                    Start This Track
                  </span>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {tracks.length === 0 && (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">No tracks</div>
          <h3 className="text-3xl font-bold text-gray-600 mb-4">
            No Tracks Available Yet
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-4 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}
