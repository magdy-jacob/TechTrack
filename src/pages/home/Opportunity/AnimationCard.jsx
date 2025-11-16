// src/components/AnimationCard.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Card from "../../../componants/ui/Card";

const AnimationCard = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1025);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1025);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <div className="w-[calc(100%-30px)] sm:w-1/2 flex justify-center items-center gap-3 h-[580px] overflow-hidden">

          <motion.div
            className="left flex flex-col justify-center items-center gap-3"
            animate={{ y: ["80%", "-80%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="flex flex-col gap-3">
              <Card companyIndex={0} />
              <Card companyIndex={1} />
              <Card companyIndex={2} />
            </div>
          </motion.div>


          <motion.div
            className="right flex flex-col justify-center items-center gap-3"
            animate={{ y: ["-80%", "80%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="flex flex-col gap-3">
              <Card companyIndex={3} />
              <Card companyIndex={4} />
              <Card companyIndex={5} />
            </div>
          </motion.div>
        </div>
      ) : (

        <div className="w-[calc(100%-30px)] sm:w-1/2 flex justify-center items-center gap-3 h-[580px] overflow-hidden">
          <motion.div
            className="left flex flex-col justify-center items-center gap-3"
            animate={{ y: ["100%", "-100%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="flex flex-col gap-6">
              <Card companyIndex={0} />
              <Card companyIndex={1} />
              <Card companyIndex={2} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AnimationCard;