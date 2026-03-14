import React from 'react';
import { 
    Factory, 
    Mail, 
    Phone, 
    MapPin, 
    Linkedin, 
    Twitter, 
    Facebook, 
    Instagram, 
    ArrowRight,
    Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: '#0f172a', color: 'white', padding: '6rem 0 2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Background design elements */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.05 }}></div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '200px', background: 'var(--primary-accent)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.05 }}></div>

            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
                    
                    {/* Brand Section */}
                    <div data-aos="fade-up" data-aos-delay="100">
                        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'var(--secondary)', padding: '0.5rem', borderRadius: '12px' }}>
                                <Factory size={28} color="white" />
                            </div>
                            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>SteelConsult</span>
                        </Link>
                        <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '320px' }}>
                            Global leaders in metallurgical engineering and industrial automation. We transform legacy factories into high-yield, smart manufacturing ecosystems.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                                <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', transition: '0.3s', border: '1px solid rgba(255,255,255,0.05)' }} className="footer-social-link">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Expertise Links */}
                    <div data-aos="fade-up" data-aos-delay="200">
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
                            Our Expertise
                            <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '2px', background: 'var(--secondary)' }}></div>
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['Safety Systems', 'Yield Analysis', 'Automation 4.0', 'Plant Design', 'Supply Chain'].map((link, i) => (
                                <li key={i} style={{ marginBottom: '1rem' }}>
                                    <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: '0.3s' }} className="footer-link">
                                        <ArrowRight size={14} style={{ color: 'var(--secondary)' }} /> {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Access */}
                    <div data-aos="fade-up" data-aos-delay="300">
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
                            Quick Access
                            <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '2px', background: 'var(--secondary)' }}></div>
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { name: 'About Firm', path: '/' },
                                { name: 'Case Studies', path: '/' },
                                { name: 'Hardware Modules', path: '#components' },
                                { name: 'Global Network', path: '#locations' },
                                { name: 'Careers', path: '/' }
                            ].map((link, i) => (
                                <li key={i} style={{ marginBottom: '1rem' }}>
                                    <Link to={link.path} style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: '0.3s' }} className="footer-link">
                                        <ArrowRight size={14} style={{ color: 'var(--secondary)' }} /> {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Global Headquarters */}
                    <div data-aos="fade-up" data-aos-delay="400">
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
                            Headquarters
                            <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '2px', background: 'var(--secondary)' }}></div>
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#94a3b8' }}>
                            <li style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ color: 'var(--secondary)', marginTop: '0.25rem' }}><MapPin size={20} /></div>
                                <p style={{ lineHeight: 1.6 }}>123 Industrial Corridor,<br />Silicon Valley Hub,<br />San Francisco, CA 94103</p>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ color: 'var(--secondary)' }}><Phone size={20} /></div>
                                <p>+1 (888) STEEL-OPS</p>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ color: 'var(--secondary)' }}><Mail size={20} /></div>
                                <p>contact@steelconsult.com</p>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ color: 'var(--secondary)' }}><Globe size={20} /></div>
                                <p>www.steelconsult.com</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                        &copy; {new Date().getFullYear()} <span style={{ color: 'white', fontWeight: 700 }}>SteelConsult Engineering SA</span>. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy Policy</Link>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>Terms of Service</Link>
                        <Link to="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>Sitemap</Link>
                    </div>
                </div>
            </div>
            
            {/* Custom CSS for hover effects */}
            <style>{`
                .footer-link:hover {
                    color: white !important;
                    transform: translateX(5px);
                }
                .footer-social-link:hover {
                    background: var(--secondary) !important;
                    color: white !important;
                    border-color: var(--secondary) !important;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(249, 115, 22, 0.2);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
