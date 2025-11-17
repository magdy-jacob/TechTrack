
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../../componants/ui/Loader";
import ErrorMessage from "../../../componants/ui/Error";
import { useApi } from "../../../context/ApiContext";

export default function SubTrackDetails() {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();
  const { categories, subCategories, tracks, loading, error } = useApi();

  const catId = parseInt(categoryId);
  const subId = parseInt(subCategoryId);


  if (isNaN(catId) || isNaN(subId)) {
    return <ErrorMessage message="Invalid URL parameters" />;
  }


  const subCategory = subCategories.find(
    sub => sub.subCategoryId === subId && sub.categoryId === catId && sub.subCategoryName !== "string"
  );




  const category = categories.find(cat => cat.categoryId === catId);
  const categoryName = category?.categoryName || "Unknown Category";


  const filteredTracks = tracks
    .filter(track => track.subCategoryId === subId)
    .filter(track => track.trackName && track.trackName !== "string");

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen px-3 bg-white pt-16 sm:pt-20 flex flex-col items-center pb-20">
      {/* Header */}
      <section className="w-full mx-auto max-w-4xl px-2 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-15 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
          {subCategory.subCategoryName}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto">
          {subCategory.description}
        </p>
        <div className="flex gap-2 justify-center items-center pb-2">
          <Link to={"/roadmap/"} className="text-[12px] md:text-[15px] text-gray-600">
            Roadmaps
          </Link>
          /
          <Link to={`/roadmap/${categoryId}`} className="text-[12px] md:text-[15px] text-gray-600">
            {categoryName}
          </Link>
          /
          <Link to={`/roadmap/${categoryId}/${subCategoryId}`} className="text-[12px] md:text-[15px]">
            {subCategory.subCategoryName}
          </Link>
        </div>
        <div className="w-2xs md:w-lg h-px bg-black  mx-auto"></div>
      </section>
      {/* Tracks Grid */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTracks.map((track) => (
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
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${track.difficultyLevel <= 2 ? "bg-green-100 text-green-800" :
                    track.difficultyLevel === 3 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                    {track.difficultyLevel === 1 ? "Beginner" :
                      track.difficultyLevel === 2 ? "Beginner-Intermediate" :
                        track.difficultyLevel === 3 ? "Intermediate" :
                          track.difficultyLevel === 4 ? "Advanced" : "Expert"}
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