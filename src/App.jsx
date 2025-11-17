import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import RoadmapPage from "./pages/Roadmap/RoadmapPage";
import CategoryPage from "./pages/Roadmap/TrackDetails/TrackDetails";
import SubTrackDetails from "./pages/Roadmap/TrackDetails/SubTrackDetails";
import SubSubTrackDetails from "./pages/Roadmap/TrackDetails/SubSubTrackDetails";
// import QuestionsList from './pages/Roadmap/TrackDetails/QuestionsList/QuestionsList';
// import Reviews from './pages/Reviews/Reviews';
import Nav from "./components/layout/Nav.jsx";
import Footer from "./components/layout/Footer.jsx";
import Companies from "./pages/Companies/Compmain.jsx";
function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<RoadmapPage />} />

        <Route path="/roadmap/:categoryId" element={<CategoryPage />} />

        <Route
          path="/roadmap/:categoryId/:subCategoryId"
          element={<SubTrackDetails />}
        />

        <Route
          path="/roadmap/:categoryId/:subCategoryId/:trackId"
          element={<SubSubTrackDetails />}
        />

        <Route path="/companies" element={<Companies />} />

        {/* <Route path='/reviews' element={<Reviews />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
