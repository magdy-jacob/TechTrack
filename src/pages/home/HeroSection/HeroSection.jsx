
import heroImg from "/src/assets/image/bg.png";
import heroVector from "/src/assets/image/Vector.png";
import arrowVector from "/src/assets/image/arrow-up-right.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // import navigation hook

function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // initialize it

  const head = t("HeroSection.head");
  const title = t("HeroSection.title");
  const paragraph = t("HeroSection.paragraph");
  const Primary_Button = t("HeroSection.Primary_Button");
  const Explore_Companies = t("HeroSection.Explore_Companies");

  //  Navigation handlers
  const handleStartJourney = () => {
    navigate("/roadmap");
  };

  const handleExploreCompanies = () => {
    navigate("/companies");
  };

  return (
    <>
      <section
        className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center"
        aria-label="Hero section - TechTrack"
      >
        {/* Animation styles */}
        <style>{`
        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .hero-bg {
          display: flex;
          width: 200%;
          height: 100%;
          animation: scroll 7s linear infinite;
        }

        .hero-bg img {
          width: 50%;
          height: 100%;
          object-fit: cover;
          display: block;
          margin-right: -1px;
        }
      `}</style>

        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="hero-bg">
            <img src={heroImg} alt="tech icons background" draggable="false" />
            <img src={heroImg} alt="" aria-hidden="true" draggable="false" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-3xl px-6 text-center text-[#333333] mt-2">
          {/* Tag */}
          <div className="mb-8 flex items-center justify-center gap-2 rounded-full bg-blue-600/10 px-6 py-3 text-sm font-medium text-blue-900 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md backdrop-saturate-150 w-fit m-auto">
            <img
              src={heroVector}
              alt="Hero background"
              className="h-auto w-4 object-cover opacity-90"
            />
            {head}
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-Roboto leading-normal mb-6">
            {title}
          </h1>

          {/* Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-[#000000] font-semibold max-w-3xl mx-auto mb-8 font-Roboto">
            {paragraph}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {/* 🚀 Start Your Journey */}
            <button
              onClick={handleStartJourney}
              className="inline-flex items-center justify-center gap-3 px-10 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-lg shadow-lg transition-all duration-300 hover:brightness-125 focus:outline-none focus:ring-4"
              aria-label="Explore roadmaps"
            >
              {Primary_Button}
              <img
                src={arrowVector}
                alt="arrow"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Explore Companies */}
            <button
              onClick={handleExploreCompanies}
              className="inline-flex items-center justify-center gap-3 px-10 py-2 rounded-full border-3 border-[#1E58F9] text-[#1E58F9] font-medium transition-all duration-300 hover:border-[#1e58f9d3] hover:text-[#1e58f9b7]"
              aria-label="Explore companies"
            >
              {Explore_Companies}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;