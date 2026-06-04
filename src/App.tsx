import { Home as HomeIcon } from 'lucide-react'
import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'

function GlobalHomeShortcut() {
  const location = useLocation()

  function handleClick() {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Link to="/" className="global-home-shortcut" aria-label="Go to homepage" onClick={handleClick}>
      <HomeIcon size={17} aria-hidden="true" />
      <span>Home</span>
    </Link>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalHomeShortcut />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </BrowserRouter>
  )
}
