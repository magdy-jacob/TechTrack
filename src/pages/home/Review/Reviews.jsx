



import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import ReviewCard from "./ReviewCard";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    const fetchReviews = async () => {

      const fakeData = [
        {
          id: 1,
          name: "Ahmed Khaled",
          role: "Frontend Developer",
          text: "The track helped me understand React deeply and build real projects confidently.",
          image: "https://i.pravatar.cc/150?img=12",
          rating: 5,
        },
        {
          id: 2,
          name: "Mariam Hussein",
          role: "UI/UX Designer",
          text: "Loved the learning path and hands-on projects — it made learning design tools fun!",
          image: "https://i.pravatar.cc/150?img=20",
          rating: 4,
        },
        {
          id: 3,
          name: "Omar Saeed",
          role: "Backend Engineer",
          text: "The backend track with Node.js was very practical and helped me land my internship.",
          image: "https://i.pravatar.cc/150?img=32",
          rating: 5,
        },
        {
          id: 4,
          name: "Sara Mostafa",
          role: "Full Stack Developer",
          text: "Everything was clear and structured. I could finally connect frontend and backend easily.",
          image: "https://i.pravatar.cc/150?img=45",
          rating: 5,
        },
        {
          id: 5,
          name: "Youssef Ali",
          role: "Data Analyst",
          text: "Great community and mentors. I learned Python and visualization in a simple way.",
          image: "https://i.pravatar.cc/150?img=27",
          rating: 4,
        },
        {
          id: 6,
          name: "Nouran Fawzy",
          role: "React Developer",
          text: "Amazing structured content that made me confident to apply for real frontend jobs!",
          image: "https://i.pravatar.cc/150?img=9",
          rating: 5,
        },
      ];
      setReviews(fakeData);

    };

    fetchReviews();
  }, []);

  // 🌀 Animation
  useEffect(() => {
    if (reviews.length) {
      controls.start({
        x: ["0%", "-50%"],
        transition: { duration: 20, repeat: Infinity, ease: "linear" },
      });
    }
  }, [reviews, controls]);



  return (
    <section className="py-16 bg-gray-50 text-center overflow-hidden">
      {/* Header */}
      <div className="mb-10 px-4">
        <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
          What Our Learners Say
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          Hear from People Who Grew with TechTrack
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Real experiences from learners who explored tech tracks and built
          careers in Egypt’s tech scene.
        </p>
      </div>

      {/* Slider */}
      <div className="overflow-hidden relative px-4 sm:px-8 md:px-16">
        <motion.div
          className="flex gap-6 sm:gap-8"
          animate={controls}
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() =>
            controls.start({
              x: ["0%", "-50%"],
              transition: { duration: 20, repeat: Infinity, ease: "linear" },
            })
          }
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="flex-shrink-0">
              <ReviewCard {...review} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;