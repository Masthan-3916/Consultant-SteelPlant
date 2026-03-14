import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  ShieldCheck, 
  TrendingUp, 
  Settings, 
  HardHat, 
  ArrowRight, 
  Factory, 
  Users, 
  Globe, 
  Zap,
  MapPin,
  Cpu,
  Layers,
  Activity,
  Box
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    try {
      const res = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      setStatus('Network error. Is the server running?');
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };

  const industrialComponents = [
    { title: "Blast Furnace Module", icon: Box, desc: "High-efficiency thermal units with automated chemical balancing." },
    { title: "Smart Rolling Mills", icon: Layers, desc: "Precision gauges and temperature-controlled finishing lines." },
    { title: "Safety Control Racks", icon: ShieldCheck, desc: "Triple-redundant E-Stop and gas detection systems." },
    { title: "Metallurgy AI Hub", icon: Cpu, desc: "Neural networks optimizing alloy compositions in real-time." }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-content"
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '100px', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2rem' }}>
                <Zap size={14} /> NEW ERA OF METALLURGY
              </div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Pioneering the Future of Steel Engineering
              </motion.h1>
              <p>
                Elite consultancy providing state-of-the-art process automation, safety frameworks, and metallurgical yield optimization for global metal manufacturers.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn btn-secondary">
                  Start Your Consultation <ArrowRight size={18} />
                </a>
                <a href="#services" className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                  View Expertise
                </a>
              </div>
              
              <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem' }}>
                <div>
                  <h4 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.25rem' }}><Counter value={45} suffix="+" /></h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Global Projects</p>
                </div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.25rem' }}><Counter value={12} /></h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Countries Served</p>
                </div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.25rem' }}><Counter value={30} suffix="%" /></h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Yield Increase</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              style={{ position: 'relative' }}
            >
              <div style={{ 
                width: '100%', 
                height: '500px', 
                background: 'linear-gradient(45deg, #1e293b, #0f172a)', 
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
                position: 'relative',
                zIndex: 2
              }}>
                <img 
                  src="/hero-steel.png" 
                  alt="Industrial Plant"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
              </div>
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: 'var(--secondary)', borderRadius: '30px', filter: 'blur(80px)', opacity: 0.3 }}></div>
              <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '200px', height: '200px', background: 'var(--primary-accent)', borderRadius: '30px', filter: 'blur(100px)', opacity: 0.2 }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section" data-aos="fade-up">
        <div className="container">
          <span className="section-tag">SERVICES</span>
          <h2 className="section-title">Industrial Master Plan</h2>
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid-3"
          >
            <motion.div variants={fadeInUp} className="card-premium">
              <div className="card-icon"><ShieldCheck size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Safety & Compliance</h3>
              <p style={{ color: 'var(--text-muted)' }}>Implementing world-class EHS standards and risk mitigation strategies for high-temperature zones.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="card-premium">
              <div className="card-icon"><TrendingUp size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Yield Optimization</h3>
              <p style={{ color: 'var(--text-muted)' }}>Real-time chemical analysis and process tuning to maximize primary metallurgy output.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="card-premium">
              <div className="card-icon"><Settings size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Automation 4.0</h3>
              <p style={{ color: 'var(--text-muted)' }}>Full-stack IoT integration from blast furnace sensors to executive Cloud dashboards.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="card-premium">
              <div className="card-icon"><Factory size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Plant Design</h3>
              <p style={{ color: 'var(--text-muted)' }}>Optimized brownfield expansions and greenfield factory layouts for maximum throughput.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="card-premium">
              <div className="card-icon"><Users size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Workforce Training</h3>
              <p style={{ color: 'var(--text-muted)' }}>Certified technical programs for operators in modern casting and rolling mill practices.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="card-premium">
              <div className="card-icon"><Globe size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Supply Optimization</h3>
              <p style={{ color: 'var(--text-muted)' }}>Raw material logistics and coal/ore blend optimization to reduce overall energy Opex.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industrial Components Section */}
      <section id="components" className="section" style={{ background: 'var(--bg-dark)', color: 'white' }} data-aos="zoom-in-up">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <motion.div {...fadeInUp}>
              <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--secondary)' }}>COMPONENTS & HARDWARE</span>
              <h2 className="section-title" style={{ color: 'white' }}>Critical Infrastructure Modules</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '3rem' }}>
                We engineer and integrate specialized steel plant components that serve as the backbone of modern primary and secondary metallurgy.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {industrialComponents.map((comp, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}><comp.icon size={28}/></div>
                    <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>{comp.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{comp.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               style={{ position: 'relative' }}
            >
              <img 
                src="/industrial-components.png" 
                alt="Steel Plant Components" 
                style={{ width: '100%', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}
              />
              <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', background: 'var(--secondary)', padding: '2rem', borderRadius: '24px', color: 'white', maxWidth: '240px' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>ISO-9001</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Certified Industrial Grade Hardware</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Locations Section */}
      <section id="locations" className="section" data-aos="fade-left">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="section-tag">GLOBAL NETWORK</span>
            <h2 className="section-title">Strategic Operational Hubs</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Direct on-site consultancy available through our primary engineering hubs across global steel corridors.
            </p>
          </div>
          
          <div className="grid-3">
             <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="card-premium" style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                    <MapPin size={32} />
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Dubai, UAE</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Regional MENA Headquarters & Design Center</p>
                <div style={{ height: '4px', width: '40px', background: 'var(--secondary)', margin: '0 auto' }}></div>
             </motion.div>
             
             <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="card-premium" style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                    <MapPin size={32} />
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Singapore</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>APAC Logistics & Process Optimization Hub</p>
                <div style={{ height: '4px', width: '40px', background: 'var(--secondary)', margin: '0 auto' }}></div>
             </motion.div>
             
             <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="card-premium" style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                    <MapPin size={32} />
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>Bremen, Germany</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>European Safety Standards & R&D Lab</p>
                <div style={{ height: '4px', width: '40px', background: 'var(--secondary)', margin: '0 auto' }}></div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ background: '#f8fafc' }} data-aos="flip-up">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="card-premium" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '4rem', padding: 0, border: 'none', background: 'transparent' }}>
            <motion.div {...fadeInUp}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Launch Your Audit</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Request a comprehensive technical assessment of your primary metallurgy or finishing line operations.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}><HardHat size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 700 }}>Project HQ</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Dubai Internet City, UAE</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}><Activity size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 700 }}>Operations Status</p>
                    <p style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>Active - Accepting Briefs</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form 
              {...fadeInUp}
              onSubmit={handleSubmit} 
              style={{ background: 'white', padding: '3.5rem', borderRadius: '40px', boxShadow: '0 40px 100px -20px rgba(15, 23, 42, 0.15)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>FULL NAME</label>
                  <input type="text" name="name" className="input-premium" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>CORPORATE EMAIL</label>
                  <input type="email" name="email" className="input-premium" value={formData.email} onChange={handleInputChange} placeholder="john@company.com" required />
                </div>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>PLANT SPECIFICATIONS</label>
                <textarea name="message" className="input-premium" rows="4" value={formData.message} onChange={handleInputChange} placeholder="Scope of consultation needed..." required></textarea>
              </div>
              <button type="submit" className="btn btn-secondary" style={{ width: '100%', height: '60px', borderRadius: '16px', fontSize: '1rem' }}>Authorize Consultation <ArrowRight size={20} /></button>
              {status && <p style={{ marginTop: '1.5rem', textAlign: 'center', fontWeight: 700, color: status.includes('success') ? '#10b981' : '#ef4444' }}>{status}</p>}
            </motion.form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
