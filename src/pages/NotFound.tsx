import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { pages } from "@/site";

const NotFound = () => (
  <section className="flex min-h-[80vh] items-center pb-20 pt-36">
    <div className="site-container text-center">
      <p className="eyebrow">Error 404</p>
      <div className="rule mx-auto my-6" aria-hidden="true" />
      <h1 className="text-5xl leading-tight text-foreground md:text-6xl">
        This page is <span className="italic text-accent">off the map.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
        The address may have changed, or the page may never have existed. These will get you back on course.
      </p>
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {pages.map((page) => (
          <li key={page.path}>
            <Link to={page.path} className={page.path === "/" ? "btn-primary group" : "btn-secondary"}>
              {page.label}
              {page.path === "/" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default NotFound;
