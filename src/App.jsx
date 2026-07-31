import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import CompanyProfile from './pages/about/CompanyProfile'
import DirectorProfile from './pages/about/DirectorProfile'
import EducationalTrust from './pages/about/EducationalTrust'
import QualityPolicy from './pages/about/QualityPolicy'
import VisionMission from './pages/about/VisionMission'
import ApplyOnline from './pages/careers/ApplyOnline'
import CareersInSseb from './pages/careers/CareersInSseb'
import Employment from './pages/careers/Employment'
import CompletedProjectsList from './pages/projects/CompletedProjectsList'
import CompletedProjects from './pages/projects/CompletedProjects'
import OnGoingProjects from './pages/projects/OnGoingProjects'
import ProjectDetail from './pages/projects/ProjectDetail'
import HowWeWork from './pages/work-with-us/HowWeWork'
import Safety from './pages/work-with-us/Safety'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/about/company-profile" element={<CompanyProfile />} />
          <Route path="/about/director-profile" element={<DirectorProfile />} />
          <Route path="/about/educational-trust" element={<EducationalTrust />} />
          <Route path="/about/quality-policy" element={<QualityPolicy />} />
          <Route path="/about/vision-mission" element={<VisionMission />} />

          <Route path="/careers/apply-online" element={<ApplyOnline />} />
          <Route path="/careers/careers-in-sseb" element={<CareersInSseb />} />
          <Route path="/careers/employment" element={<Employment />} />

          <Route path="/projects/completed-projects-list" element={<CompletedProjectsList />} />
          <Route path="/projects/completed-projects" element={<CompletedProjects />} />
          <Route path="/projects/on-going-projects" element={<OnGoingProjects />} />
          <Route path="/projects/completed-projects/:slug" element={<ProjectDetail />} />

          <Route path="/work-with-us/how-we-work" element={<HowWeWork />} />
          <Route path="/work-with-us/safety" element={<Safety />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
