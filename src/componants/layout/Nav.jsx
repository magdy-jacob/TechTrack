import React, { useEffect, useState } from "react";
import { Btn } from "../ui/Btn";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Nav() {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 767);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const links = [
    { name: t("nav.links.home"), path: "" },
    { name: t("nav.links.roadmaps"), path: "roadmap" },
    { name: t("nav.links.companies"), path: "companies" },
    // { name: "Reviews", path: "/reviews" },
  ];


  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0.5 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0.5, transition: { duration: 0.3 } },
  };

  return (
    <nav className="bg-[var(--color-white)] shadow-sm fixed w-full top-0 left-0 z-50 ">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-3 px-6">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/src/assets/image/logo1.png"
            alt="Logo"
            className="w-11 h-12"
          />
          <span className="text-[var(--color-secondary)] text-2xl font-bold">
            TechTrack
          </span>
        </a>


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100"
        >
          <svg
            className="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>


        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)} // لو ضغطت على الخلفية تتقفل
              className="fixed inset-0 bg-[#0000008c]  z-20 md:hidden"
            />
          )}
        </AnimatePresence>


        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobileMenu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-[72px] right-0 w-full h-fit bg-white shadow-lg z-40 flex flex-col justify-center items-start ps-10 py-10 space-y-6 text-lg font-medium text-[--color-text] md:hidden rounded-l-3xl"
            >
              {links.map((link, index) => {
                const fullPath = "/" + link.path; // "/roadmap" أو "/companies" أو "/"

                const isActive =
                  fullPath === "/" 
                    ? active === "/"                     // Home
                    : active.startsWith(fullPath);       // باقي الصفحات

                return (
                  <a
                    key={index}
                    href={fullPath}
                    onClick={() => {
                      setActive(fullPath);
                      setIsOpen(false);
                    }}
                    className={`relative pb-2 hover:text-[var(--color-primary)] ${
                      isActive ? "text-[var(--color-primary)] font-semibold active-link" : ""
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}



              {/* <div className="flex gap-5">
                <Btn content={t("nav.signup")} arrow={false} px="11" />
                <button
                  onClick={() =>
                    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
                  }
                >
                  {i18n.language === "en" ? "AR" : "EN"}
                </button>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>


        <div className="hidden md:flex items-center space-x-8">
        {links.map((link, index) => {
            const fullPath = "/" + link.path; // "/roadmap" أو "/companies" أو "/"

            const isActive =
              fullPath === "/" 
                ? active === "/"                     // Home
                : active.startsWith(fullPath);       // باقي الصفحات

            return (
              <a
                key={index}
                href={fullPath}
                onClick={() => {
                  setActive(fullPath);
                  setIsOpen(false);
                }}
                className={`relative pb-2 hover:text-[var(--color-primary)] ${
                  isActive ? "text-[var(--color-primary)] font-semibold active-link" : ""
                }`}
              >
                {link.name}
              </a>
            );
          })}

        </div>
        {isLargeScreen ? (
          <div className="sm:hidden lg:block lg:w-40 xl:w-60"></div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
