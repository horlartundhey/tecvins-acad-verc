import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Sdgs from './pages/Sdgs';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Enrollment from './pages/Enrollment';
import Product_Manage from './pages/Product_manage';
import Product_develop from './pages/Product_develop';
import Job_readiness from './pages/Job_readiness';
import Creative_des from './pages/Creative_des';
import Trainer from './pages/Trainer';
import Support from './pages/Support';
import Donate from './pages/Donate';
import DonationSuccess from './pages/DonationSuccess';
import OurJourney from './pages/OurJourney';
import Partner from './pages/Partner';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/Notfound';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Difference from './pages/Difference';
import Frequently_asked from './pages/Frequently_asked';
import AdminLayout from './components/layout/AdminLayout';
import BlogList from './pages/admin/BlogList';
import BlogForm from './pages/admin/BlogForm';
import BlogDetails from './pages/BlogDetails';
import StudentList from './pages/admin/StudentList';
import TrainerList from './pages/admin/TrainerList';
import ContactMessages from './pages/admin/ContactMessages';
import PartnerList from './pages/admin/PartnerList';
import CohortSettings from './pages/admin/CohortSettings';
import OurTrainers from './pages/OurTrainers';
import CohortManagement from './pages/admin/CohortManagement';
import DonationDashboard from './pages/admin/DonationDashboard';
import HireRequestDashboard from './pages/admin/HireRequestDashboard';
import ProjectsByStud from './pages/ProjectsByStud';
import EventSystem from './pages/EventSystem';
import Linguafrika from './pages/Linguafrika';
import Imovellereal from './pages/Imovellereal';
import Studat from './pages/Studat';
import Aipowered from './pages/Aipowered';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>                    
          {/* Public Routes */}          
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="sdgs" element={<Sdgs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="courses" element={<Courses />} />
          <Route path="product-management" element={<Product_Manage />} />
          <Route path="creative-design" element={<Creative_des />} />
          <Route path="product-development" element={<Product_develop />} />
          <Route path="job-readiness" element={<Job_readiness />} />
          <Route path="enrollment" element={<Enrollment />} />
          <Route path="trainer" element={<Trainer />} />
          <Route path="our-trainers" element={<OurTrainers />} />
          <Route path="donate" element={<Donate />} />
          <Route path="donate/success" element={<DonationSuccess />} />
          <Route path="support" element={<Support />} />
          <Route path="partner" element={<Partner />} />
          <Route path="what_difference" element={<Difference />} />
          <Route path="our-journey" element={<OurJourney />} />
          <Route path="frequently-asked-questions" element={<Frequently_asked />} />
          <Route path="projects-by-students" element={<ProjectsByStud />} /> 
          <Route path="event-management-system" element={<EventSystem />} />
          <Route path="linguafrika" element={<Linguafrika />} />
          <Route path="imovelle" element={<Imovellereal />} />
          <Route path="studat" element={<Studat />} />
          <Route path="ai-powered" element={<Aipowered />} />


          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roles={['admin', 'editor']}>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="blog" element={<BlogList />} />
                    <Route path="blog/new" element={<BlogForm />} />
                    <Route path="blog/edit/:id" element={<BlogForm />} />
                    <Route path="students" element={<StudentList />} />
                    <Route path="trainers" element={<TrainerList />} />
                    <Route path="partners" element={<PartnerList />} />
                    <Route path="contacts" element={<ContactMessages />} />
                    <Route path="donations" element={<DonationDashboard />} />
                    <Route path="hire-requests" element={<HireRequestDashboard />} />
                    <Route path="cohort-settings" element={<CohortSettings />} />
                    <Route path="cohort-management" element={<CohortManagement />} />

                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />  

        </Routes>
        </Layout>
    </Router>
  );
}

export default App;