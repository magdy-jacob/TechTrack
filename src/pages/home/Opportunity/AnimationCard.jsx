// src/components/AnimationCard.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Card from "../../../componants/ui/Card";
import { useApi } from "../../../context/ApiContext";
import Loader from "../../../componants/ui/Loader";
import ErrorMessage from "../../../componants/ui/Error";

const AnimationCard = () => {
  const { companies = [], CompanyTechnologies = [], loading, error } = useApi();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1025);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 1025);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const safeCompanies = Array.isArray(companies) ? companies : [];
  const safeTechs = Array.isArray(CompanyTechnologies) ? CompanyTechnologies : [];

  const getCompanyTechs = (companyId) => {
    return safeTechs
      .filter(t => t.companyId === companyId)
      .map(t => t.notes?.trim())
      .filter(Boolean);
  };

  const validCompanies = safeCompanies.slice(0, 6);

  const leftCards = useMemo(() =>
    validCompanies.filter((_, i) => i < 3).map(c => ({
      company: c,
      techs: getCompanyTechs(c.companyId)
    })), [validCompanies, safeTechs]
  );

  const rightCards = useMemo(() =>
    validCompanies.filter((_, i) => i >= 3).map(c => ({
      company: c,
      techs: getCompanyTechs(c.companyId)
    })), [validCompanies, safeTechs]
  );

  const mobileCards = useMemo(() =>
    validCompanies.filter((_, i) => i < 3).map(c => ({
      company: c,
      techs: getCompanyTechs(c.companyId)
    })), [validCompanies, safeTechs]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      {isLargeScreen ? (
        <div className="w-[calc(100%-30px)] sm:w-1/2 flex justify-center items-center gap-3 h-[580px] overflow-hidden">
          {leftCards.length > 0 && (
            <motion.div
              className="flex flex-col justify-center items-center gap-3"
              animate={{ y: ["80%", "-80%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex flex-col gap-3">
                {leftCards.map(({ company, techs }) => (
                  <Card key={company.companyId} company={company} companyTechs={techs} />
                ))}
              </div>
            </motion.div>
          )}
          {rightCards.length > 0 && (
            <motion.div
              className="flex flex-col justify-center items-center gap-3"
              animate={{ y: ["-80%", "80%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex flex-col gap-3">
                {rightCards.map(({ company, techs }) => (
                  <Card key={company.companyId} company={company} companyTechs={techs} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="w-[calc(100%-30px)] sm:w-1/2 flex justify-center items-center gap-3 h-[580px] overflow-hidden">
          {mobileCards.length > 0 && (
            <motion.div
              className="flex flex-col justify-center items-center gap-3"
              animate={{ y: ["100%", "-100%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex flex-col gap-6">
                {mobileCards.map(({ company, techs }) => (
                  <Card key={company.companyId} company={company} companyTechs={techs} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};

export default AnimationCard;