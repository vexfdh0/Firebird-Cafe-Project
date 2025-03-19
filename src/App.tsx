import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after 5 seconds for a more immersive experience
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {showLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
