
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../../context/ApiContext';
import Loader from '../../../componants/ui/Loader';
import ErrorMessage from '../../../componants/ui/Error';

export default function CategoryPage() {
  const { categories, subCategories, loading, error } = useApi();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(categoryId);

  if (isNaN(id)) {
    return <ErrorMessage message="Invalid category ID" />;
  }


  const category = categories.find(cat => cat.categoryId === id);




  const filteredSubs = subCategories
    .filter(sub => sub.categoryId === id)
    .filter(sub => sub.subCategoryName && sub.subCategoryName !== "string");

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen px-3 bg-white pt-16 sm:pt-20 flex flex-col items-center pb-20">
      {/* Header */}
      <section className="w-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-15 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
          {category.categoryName}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto">
          {category.description}
        </p>
        <div className="flex gap-2 justify-center items-center pb-2">
          <Link to="/roadmap/" className="text-[15px] text-gray-600">
            Roadmaps
          </Link>
          {' / '}
          <span className="text-[15px] text-blue-600 font-medium">
            {category.categoryName}
          </span>
        </div>
        <div className="w-2xs md:w-lg h-px bg-black mx-auto"></div>
      </section>

      <h2 className="text-3xl font-bold text-center mb-10 sm:mb-12 lg:mb-15 text-gray-800">
        Specialization Tracks
      </h2>

      {/* SubCategories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {filteredSubs.map((sub) => (
          <Link
            key={sub.subCategoryId}
            to={`/roadmap/${categoryId}/${sub.subCategoryId}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
          >
            {sub.imageUrl && (
              <img
                src={sub.imageUrl}
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
      {filteredSubs.length === 0 && (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">Empty</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            No tracks available yet
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}