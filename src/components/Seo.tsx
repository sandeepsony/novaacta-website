import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, metaForPath } from "@/site";

const setMeta = (selector: string, attribute: string, value: string) => {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

/**
 * Keeps the document head in step with client-side navigation.
 * The first load of every route already has the right tags baked in by
 * scripts/prerender.mjs; this covers moves between routes after that.
 */
const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    const url = absoluteUrl(meta.path);

    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[name="robots"]', "content", meta.noindex ? "noindex" : "index, follow");
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
  }, [pathname]);

  return null;
};

export default Seo;
