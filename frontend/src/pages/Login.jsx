import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Factory, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        try {
            const res = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                navigate('/admin');
            } else {
                setError(data.error || 'Identity verification failed');
            }
        } catch (err) {
            setError('System offline. Please check server logs.');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
                height: '100vh', 
                display: 'flex', 
                background: 'var(--bg-dark)',
                overflow: 'hidden',
                color: 'var(--text-main)'
            }}
        >
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.8)), url("https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=1200") center/cover' }}>
                <div style={{ textAlign: 'center', color: 'white', maxWidth: '400px', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', background: 'var(--secondary)', padding: '1rem', borderRadius: '20px', marginBottom: '2rem' }}>
                        <Factory size={48} />
                    </div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 900 }}>STEEL <span style={{ color: 'var(--secondary)' }}>COMMAND</span></h1>
                    <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Enterprise Resource Management & Consultancy Operations Dashboard.</p>
                </div>
                <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.2 }}></div>
            </div>

            <div style={{ width: '550px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
                <div style={{ width: '100%', maxWidth: '360px' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Secure Login</h2>
                        <p style={{ color: '#64748b' }}>Authorized personnel only. Enter access keys below.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '0.75rem' }}>
                                <Mail size={14} /> Email Identity
                            </label>
                            <input 
                                type="email" 
                                className="input-premium" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="admin@steelplant.com"
                                required 
                            />
                        </div>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '0.75rem' }}>
                                <Lock size={14} /> Security Token
                            </label>
                            <input 
                                type="password" 
                                className="input-premium" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••"
                                required 
                            />
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <Shield size={16} /> {error}
                            </motion.div>
                        )}

                        <button type="submit" className="btn btn-secondary" style={{ width: '100%', height: '56px', fontSize: '1rem' }}>
                            Authorize Access <ArrowRight size={20} />
                        </button>
                    </form>
                    
                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center' }}>
                            Need technical assistance or token reset? <br/>
                            <a href="#" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>Contact System Admin</a>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
