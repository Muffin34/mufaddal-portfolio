import { useEffect } from "react";
import { Home as HomeIcon } from "lucide-react";
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Work from "./pages/Work";

function RoutePosition() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title =
      pathname === "/work"
        ? "Selected Work | Mufaddal Kachwala"
        : "Mufaddal Kachwala | Motion Designer & Creative Lead";
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView({ behavior: "instant" });
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function GlobalHomeShortcut() {
  const location = useLocation();

  function handleClick() {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  }

  return (
    <Link
      to="/"
      className="global-home-shortcut"
      aria-label="Go to homepage"
      onClick={handleClick}
    >
      <HomeIcon size={17} aria-hidden="true" />
      <span>Home</span>
    </Link>
  );
}

// The home page is now the static motion site in public/index.html.
// Any in-app link to "/" (or "/#section") does a full page load so it reaches that page.
function NewHome() {
  const { hash } = useLocation();
  useEffect(() => {
    window.location.assign("/" + hash);
  }, [hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RoutePosition />
      <GlobalHomeShortcut />
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </BrowserRouter>
  );
}
