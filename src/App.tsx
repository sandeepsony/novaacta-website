import { Suspense, useEffect, type ComponentType } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import { redirects } from "@/site";

export type PageMap = Record<string, ComponentType>;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Leave in-page links such as /scenarios#bridge to the page itself.
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

/**
 * The whole app below the router. The client passes lazy page components,
 * the prerender build passes eager ones, so both render the same tree.
 */
const App = ({ pages }: { pages: PageMap }) => (
  <>
    <Seo />
    <ScrollToTop />
    <a href="#main" className="skip-link">
      Skip to content
    </a>
    <Navbar />
    <main id="main">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          {Object.entries(pages).map(([path, Page]) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          {Object.entries(redirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </>
);

export default App;
