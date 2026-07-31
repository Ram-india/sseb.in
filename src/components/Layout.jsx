import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import SmoothScroll from './SmoothScroll'
import Seo from './Seo'

// Equivalent of the PHP page contract: meta.php → header.php → content → footer.php.
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-page text-body">
      <SmoothScroll />
      <Seo />
      <Header />
      {/* Pages own their own sections/containers, as each PHP page did. */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
