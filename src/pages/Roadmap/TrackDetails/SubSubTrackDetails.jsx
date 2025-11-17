









import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoWithModal from "./VideoModal";
import RoadmapSection from "./RoadmapLine";
import QuestionsList from "../TrackDetails/QuestionsList/QuestionsList";
import { useApi } from "../../../context/ApiContext";
import Loader from "../../../componants/ui/Loader";
import ErrorMessage from "../../../componants/ui/Error";


export default function SubSubTrackDetails() {
  const { trackId, categoryId, subCategoryId } = useParams();
  const {
    tracks,
    allTechnologies,
    categories,
    subCategories,
    loading,
    error
  } = useApi();

  const [activeTech, setActiveTech] = useState(null);

  const catId = parseInt(categoryId);
  const subId = parseInt(subCategoryId);
  const trkId = parseInt(trackId);

  if (isNaN(catId) || isNaN(subId) || isNaN(trkId)) {
    return <ErrorMessage message="Invalid URL parameters" />;
  }

  const track = tracks.find(t => t.trackId === trkId);
  if (!track) return <ErrorMessage message="Track not found" />;


  const category = categories.find(c => c.categoryId === catId);
  const subCategory = subCategories.find(s => s.subCategoryId === subId);

  const categoryName = category?.categoryName || "Unknown";
  const subCategoryName = subCategory?.subCategoryName || "Unknown";


  const trackTechnologies = allTechnologies
    .filter(tech => tech.trackId === trkId)
    .filter(tech => tech.technologyName && tech.technologyName !== "string");


  if (trackTechnologies.length > 0 && !activeTech) {
    setActiveTech(trackTechnologies[0]);
  }






  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white text-text flex flex-col">
      <main className="flex-1 container mx-auto px-6 mt-20 py-16 md:py-24 text-left space-y-12">

        {/* Header */}
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary border-l-6 border-primary pl-4 capitalize">
            {track.trackName}
          </h1>
          <p>{track.description}</p>

          {/* Breadcrumb */}
          <div className="flex flex-wrap gap-2 text-[12px] md:text-[15px] pb-2">
            <Link to="/roadmap/" className="text-gray-400">Roadmaps</Link>
            {' / '}
            <Link to={`/roadmap/${categoryId}`} className="text-gray-400">{categoryName}</Link>
            {' / '}
            <Link to={`/roadmap/${categoryId}/${subCategoryId}`} className="text-gray-400">{subCategoryName}</Link>
            {' / '}
            <span className="text-secondary font-medium">{track.trackName}</span>
          </div>
        </div>

        {/* Technology Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          {trackTechnologies.map(tech => (
            <button
              key={tech.technologyId}
              onClick={() => setActiveTech(tech)}
              className={`px-4 py-2 rounded-full font-bold cursor-pointer transition duration-300 ${activeTech?.technologyId === tech.technologyId
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {tech.technologyName}
            </button>
          ))}
        </div>

        {/* Video Section */}
        {activeTech && (
          <VideoWithModal
            slug={categoryId}
            subSlug={subCategoryId}
            title={activeTech.technologyName}
            description={activeTech.description || ""}
          />
        )}

      </main>

      {/* Roadmap Section */}
      {/* <RoadmapSection
        roadmap={roadmap}
        loading={false}
        error={null}
        displayTitle={activeTech?.technologyName || "Roadmap"}
      /> */}
      <RoadmapSection
        technologyId={activeTech?.technologyId}
        loading={false}
        error={null}
        displayTitle={activeTech?.technologyName || "Roadmap"}
      />

      {/* Questions Section */}
      {activeTech && (
        <QuestionsList
          technologyId={activeTech.technologyId}
          showSearch={true}
          showFilters={true}
        />
      )}
    </div>
  );
}