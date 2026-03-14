import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Factory, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isAdminLoggedIn = !!localStorage.getItem('adminToken');
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminRoute) return null; // Hide common navbar inside admin workspace

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="nav-brand">
          <div style={{ background: 'var(--secondary)', padding: '0.4rem', borderRadius: '10px', display: 'flex' }}>
            <Factory size={24} color="white" />
          </div>
          <span style={{ color: isScrolled ? 'var(--primary)' : 'white' }}>SteelConsult</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link" style={{ color: isScrolled ? 'var(--text-main)' : 'white' }}>Home</Link>
          <a href="#services" className="nav-link" style={{ color: isScrolled ? 'var(--text-main)' : 'white' }}>Expertise</a>
          <a href="#components" className="nav-link" style={{ color: isScrolled ? 'var(--text-main)' : 'white' }}>Modules</a>
          <a href="#locations" className="nav-link" style={{ color: isScrolled ? 'var(--text-main)' : 'white' }}>Network</a>
          <a href="#contact" className="nav-link" style={{ color: isScrolled ? 'var(--text-main)' : 'white' }}>Consult</a>

          {isAdminLoggedIn ? (
            <Link to="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem' }}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', background: isScrolled ? 'var(--bg-dark)' : 'rgba(255,255,255,0.1)', color: 'white' }}>
              <User size={18} /> Admin Access
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
