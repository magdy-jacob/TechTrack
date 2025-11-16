// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import QuestionsList from "../TrackDetails/QuestionsList/QuestionsList";
// import VideoWithModal from "./VideoModal";
// import RoadmapSection from "./RoadmapLine";
// import { Btn } from "../../../componants/ui/Btn";

// export default function SubSubTrackDetails() {
//   const { slug, subSlug, subSubSlug } = useParams();
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const title = subSubSlug?.replace(/-/g, " ") || "Topic";

//   // === Fetch roadmap data ===
//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "http://techtrack.runasp.net/api/Roadmap"
//         );


//         // Format URL slug for matching
//         const formattedSlug = subSubSlug?.replace(/-/g, " ").toLowerCase();

//         // Match roadmap: slug can be partial or simplified
//         const matched = response.data.find((r) =>
//           r.title?.toLowerCase().includes(formattedSlug)
//         );

//         setRoadmap(matched || null);
//       } catch (err) {
//         console.error("Error fetching roadmap:", err);
//         setError("Failed to load roadmap 😢");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoadmap();
//   }, [subSubSlug]);

//   // Clean display title without the word "Roadmap"
//   const displayTitle = roadmap?.title.replace(/roadmap/i, "").trim() || title;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-primary-light to-white text-text flex flex-col">
//       {/* === MAIN CONTENT === */}
//       <main className="flex-1 container mx-auto px-6 py-16 md:py-24 text-left">
//         {/* === HEADER SECTION === */}
//         <div className="max-w-5xl mx-auto space-y-8 mt-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-secondary border-l-6 border-primary pl-4 capitalize">
//             {title}
//           </h1>
//           <p className="text-text text-lg leading-relaxed max-w-3xl">
//             Here are the details for{" "}
//             <span className="font-semibold">{title}</span> in{" "}
//             <span className="font-semibold">{subSlug?.replace(/-/g, " ")}</span>{" "}
//             track of{" "}
//             <span className="font-semibold">{slug?.replace(/-/g, " ")}</span>.
//             Dive into the latest technologies and frameworks shaping the
//             future of development.
//           </p>
//         </div>



//         {/* === VIDEO SECTION WITH MODAL === */}
//         <VideoWithModal
//           title={title}
//           subSlug={subSlug}
//           slug={slug}
//         />
//       </main>

//       {/* === ROADMAP SECTION === */}
//       <RoadmapSection
//         roadmap={roadmap}
//         loading={loading}
//         error={error}
//         displayTitle={displayTitle}
//       />
//       {/* === QUESTIONS SECTION === */}
//       <QuestionsList
//         apiUrl="http://techtrack.runasp.net/api/InterviewQuestion"
//         limit={10}
//         showSearch={true}
//         showFilters={true}
//       />

//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import VideoWithModal from "./VideoModal";
import RoadmapSection from "./RoadmapLine";
import QuestionsList from "../TrackDetails/QuestionsList/QuestionsList";
import { useApi } from "../../../context/ApiContext";


export default function SubSubTrackDetails() {
  const { trackId, categoryId, subCategoryId } = useParams();
  const baseUrl = "http://techtrack.runasp.net/api";
  const { getTracksId, getTechnologies } = useApi();

  const [track, setTrack] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [activeTech, setActiveTech] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(true);
  const [errorRoadmap, setErrorRoadmap] = useState(null);

  // ===== 1️⃣ Fetch Track =====
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        // const res = await axios.get(`${baseUrl}/Track/${trackId}`);
        const res = await getTracksId(trackId);
        const trackData = res.data.data || res.data;
        setTrack(trackData);
      } catch (err) {
        console.error("Error fetching track:", err);
      }
    };
    fetchTrack();
  }, [trackId]);

  // ===== 2️⃣ Fetch Technologies for this Track =====
  useEffect(() => {
    const fetchTechnologiesForTrack = async () => {
      try {

        const res = await getTechnologies();
        const allTech = res.data.data || res.data;
        const trackTechnologies = allTech.filter(tech => {

          return tech.trackId === parseInt(trackId);
        });
        setTechnologies(trackTechnologies);
        // Set first technology as active
        if (trackTechnologies.length > 0) {
          setActiveTech(trackTechnologies[0]);
        }
      } catch (err) {
        console.error("Error fetching technologies:", err);
      }
    };

    if (track) {
      fetchTechnologiesForTrack();
    }
  }, [track, trackId]);

  // ===== 3️⃣ Handle Technology Button Click =====
  const handleTechClick = (tech) => {
    setActiveTech(tech);
  };

  // ===== 4️⃣ Fetch Roadmap =====
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoadingRoadmap(true);
        const res = await axios.get(`${baseUrl}/Roadmap`);
        const data = res.data.data || res.data;
        const matched = data.find(
          r => r.subCategoryId === parseInt(subCategoryId)
        );
        setRoadmap(matched || null);
      } catch (err) {
        console.error(err);
        setErrorRoadmap("Failed to load roadmap 😢");
      } finally {
        setLoadingRoadmap(false);
      }
    };
    fetchRoadmap();
  }, [subCategoryId]);

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    const getCategoryName = async () => {
      try {
        const res = await fetch(`http://techtrack.runasp.net/api/Category/${categoryId}`);
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
  useEffect(() => {
    const getSubCategoryId = async () => {
      try {
        const res = await fetch(`http://techtrack.runasp.net/api/SubCategory/${subCategoryId}`);
        const data = await res.json();
        if (data && data.data && data.data.subCategoryName) {
          setSubCategoryName(data.data.subCategoryName);
        }
      } catch (error) {
        console.error("Error fetching subCategoryName:", error);
      }
    };

    if (subCategoryId) getSubCategoryId();
  }, [subCategoryId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white text-text flex flex-col">
      <main className="flex-1 container mx-auto px-6 mt-20 py-16 md:py-24 text-left space-y-12">

        {/* ===== Header ===== */}
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary border-l-6 border-primary pl-4 capitalize">
            {track?.trackName || "Track Details"}
          </h1>
          <p>{track?.description}</p>
          <div className="flex flex-col md:flex-row gap-2 md:justify-start md:items-center pb-2">
            <div className="flex gap-2 justify-start items-center">
              <Link to={"/roadmap/"} className="text-[12px] md:text-[15px] text-gray-400">
                Roadmaps
              </Link>
              /
              <Link to={`/roadmap/${categoryId}`} className="text-[12px] md:text-[15px] text-gray-400">
                {categoryName}
              </Link>
              /
              <Link to={`/roadmap/${categoryId}/${subCategoryId}`} className="text-[12px] md:text-[15px] text-gray-400">
                {subCategoryName}
              </Link>
            </div>
            <div className="flex gap-2 justify-start items-center">

              /
              <Link to={`/roadmap/${categoryId}/${subCategoryId}/${subCategoryId}`} className="text-[12px] md:text-[15px] text-secondary">
                {track?.trackName || "Track Details"}
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Buttons for Technologies ===== */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          {technologies.map(tech => (
            <button
              key={tech.technologyId}
              onClick={() => handleTechClick(tech)}
              className={`px-4 py-2 rounded-full font-bold cursor-pointer transition duration-300 ${activeTech?.technologyId === tech.technologyId
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {tech.technologyName}
            </button>
          ))}
        </div>

        {/* ===== Active Technology Content ===== */}
        {/* {activeTech && (
          <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2">{activeTech.name}</h2>
            <p className=" line-clamp-1">{activeTech.description}</p>
          </div>
        )} */}

        {/* ===== Video Section ===== */}
        <VideoWithModal
          slug={categoryId}
          subSlug={subCategoryId}
          title={activeTech?.name || ""}
          description={activeTech?.description || ""}
        />

      </main>

      {/* ===== Roadmap Section ===== */}
      <RoadmapSection
        technologyId={activeTech?.technologyId}
        loading={loadingRoadmap}
        error={errorRoadmap}
        displayTitle={activeTech?.technologyName || "Roadmap"}
      />

      {/* ===== Questions Section ===== */}
      {activeTech && (
        <QuestionsList
          // apiUrl={`${baseUrl}/InterviewQuestion`}
          technologyId={activeTech?.technologyId}
          showSearch={true}
          showFilters={true}
        />
      )}
    </div>
  );
}











