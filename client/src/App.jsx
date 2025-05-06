import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Sdgs from './pages/Sdgs';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Enrollment from './pages/Enrollment';
import Product_Manage from './pages/Product_Manage';
import Product_develop from './pages/Product_develop';
import Job_readiness from './pages/Job_readiness';
import Creative_des from './pages/Creative_des';
import Trainer from './pages/Trainer';
import Support from './pages/Support';
import Donate from './pages/Donate';
import Partner from './pages/Partner';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/Notfound';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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
          <Route path="contact" element={<Contact />} />
          <Route path="courses" element={<Courses />} />
          <Route path="product-management" element={<Product_Manage />} />
          <Route path="creative-design" element={<Creative_des />} />
          <Route path="product-development" element={<Product_develop />} />
          <Route path="job-readiness" element={<Job_readiness />} />
          <Route path="enrollment" element={<Enrollment />} />
          <Route path="trainer" element={<Trainer />} />
          <Route path="donate" element={<Donate />} />
          <Route path="support" element={<Support />} />
          <Route path="partner" element={<Partner />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="admin/dashboard"
            element={
              <ProtectedRoute roles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Editor Routes */}
          <Route
            path="admin/blog"
            element={
              <ProtectedRoute roles={['admin', 'editor']}>
                <Blog />
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