import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    MessageSquare, 
    Briefcase, 
    LogOut, 
    Users, 
    Package, 
    TrendingUp, 
    Check, 
    DollarSign,
    Calendar,
    Settings,
    ChevronRight,
    Search,
    Bell,
    Factory,
    Plus,
    X,
    Trash2,
    Eye,
    Clock,
    Shield,
    FileText,
    CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/admin` : 'http://localhost:5000/api/admin';

/* --- Shared Components --- */
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="admin-stat-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ background: color, color: 'white', padding: '0.75rem', borderRadius: '14px' }}><Icon size={24} /></div>
            {trend && <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><TrendingUp size={12}/> {trend}</div>}
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{value}</h3>
    </div>
);

const Modal = ({ isOpen, onClose, title, children }) => (
    <AnimatePresence>
        {isOpen && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={onClose}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }} 
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    style={{ position: 'relative', width: '100%', maxWidth: '500px', background: 'white', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.3)' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{title}</h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24}/></button>
                    </div>
                    {children}
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

/* --- Dashboard Overview --- */
const DashboardHome = () => {
    const [stats, setStats] = useState({ totalProjects: 0, completedProjects: 0, totalEmployees: 0, monthlyPayroll: 0 });
    const [recentProjects, setRecentProjects] = useState([]);
    const [inventoryHighlights, setInventoryHighlights] = useState([]);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetch(`${API_URL}/stats`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(setStats)
        .catch(console.error);

        fetch(`${API_URL}/projects`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(data => setRecentProjects(data.slice(0, 3)))
        .catch(console.error);

        fetch(`${API_URL}/inventory`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(data => setInventoryHighlights(data.slice(0, 2)))
        .catch(console.error);
    }, [token]);

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Operations Command</h1>
                    <p style={{ color: '#64748b' }}>Real-time overview of your consultancy operations.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', background: '#f1f5f9', padding: '0.5rem', borderRadius: '12px' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: 700, fontSize: '0.85rem' }}>Daily View</div>
                    <div style={{ padding: '0.5rem 1rem', color: '#64748b', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Reports</div>
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard title="Active Projects" value={stats.totalProjects} icon={Briefcase} color="#0f172a" trend="+2 new" />
                <StatCard title="Completed Yields" value={stats.completedProjects} icon={Check} color="#10b981" trend="98% Success" />
                <StatCard title="Team Strength" value={stats.totalEmployees} icon={Users} color="#3b82f6" trend="Active" />
                <StatCard title="Monthly Payroll" value={`$${(stats.monthlyPayroll || 0).toLocaleString()}`} icon={DollarSign} color="#f97316" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FileText size={20} color="#3b82f6"/> Priority Projects</h3>
                        <Link to="/admin/projects" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>View Pipeline</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentProjects.length === 0 ? (
                            <div style={{ padding: '3rem', textAlign: 'center', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #e2e8f0' }}>
                                <p style={{ color: '#94a3b8' }}>No active projects in pipeline.</p>
                            </div>
                        ) : recentProjects.map(proj => (
                            <div key={proj._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', border: '1px solid #f1f5f9', borderRadius: '16px', transition: '0.3s' }} className="hover-lift">
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Briefcase size={20} color="#0f172a"/></div>
                                    <div>
                                        <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{proj.title}</p>
                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{proj.client} • <span style={{ color: proj.status === 'Completed' ? '#10b981' : '#f97316', fontWeight: 600 }}>{proj.status}</span></p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '80px', height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: proj.status === 'Completed' ? '100%' : '45%', height: '100%', background: proj.status === 'Completed' ? '#10b981' : '#3b82f6' }}></div>
                                    </div>
                                    <ChevronRight size={16} color="#94a3b8" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div style={{ background: 'var(--bg-dark)', color: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 30px 60px -12px rgba(15,23,42,0.3)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.15 }}></div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', position: 'relative' }}>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem' }}>Gudon Status</h3>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Real-time warehouse tracking</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '14px' }}><Package size={24} color="var(--secondary)"/></div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                        {inventoryHighlights.map(item => (
                            <div key={item._id} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{item.category}</span>
                                    <span style={{ color: item.quantity < 500 ? '#ef4444' : '#10b981', fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.5rem', background: item.quantity < 500 ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', borderRadius: '6px' }}>
                                        {item.quantity < 500 ? 'LOW STOCK' : 'STABLE'}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{item.itemName}</h4>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{item.quantity.toLocaleString()}</span>
                                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>{item.unit}</span>
                                </div>
                            </div>
                        ))}
                        {inventoryHighlights.length === 0 && <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>No data available.</p>}
                        <Link to="/admin/inventory" className="btn" style={{ width: '100%', background: 'white', color: 'var(--bg-dark)', fontSize: '0.875rem', fontWeight: 700, marginTop: '1rem', height: '52px' }}>Enterprise Warehouse Log</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- HR & Team View --- */
const HRView = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', position: '', department: 'Technical', monthlySalary: '', status: 'Active' });
    const token = localStorage.getItem('adminToken');

    const fetchEmployees = () => {
        fetch(`${API_URL}/employees`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(setEmployees);
    };

    useEffect(fetchEmployees, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/employees`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setShowModal(false);
            setFormData({ name: '', position: '', department: 'Technical', monthlySalary: '', status: 'Active' });
            fetchEmployees();
        }
    };

    const deleteEmployee = async (id) => {
        if (!window.confirm("Remove this employee from the records?")) return;
        const res = await fetch(`${API_URL}/employees/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) fetchEmployees();
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Workforce Management</h1>
                    <p style={{ color: '#64748b' }}>Technical experts and engineer directory.</p>
                </div>
                <button className="btn btn-secondary" onClick={() => setShowModal(true)} style={{ boxShadow: '0 10px 20px -5px rgba(249,115,22,0.3)' }}><Plus size={20}/> Onboard Member</button>
            </div>
            
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <tr>
                            <th style={{ padding: '1.25rem 2rem', textAlign: 'left' }}>Technician / Engineer</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Specialization</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Department</th>
                            <th style={{ padding: '1.25rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>No personnel on record.</td></tr>
                        ) : employees.map(emp => (
                            <tr key={emp._id} style={{ borderBottom: '1px solid #f1f5f9' }} className="table-row-hover">
                                <td style={{ padding: '1.5rem 2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '44px', height: '44px', background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>{emp.name?.[0] || 'E'}</div>
                                        <div>
                                            <p style={{ fontWeight: 700 }}>{emp.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>D.O.J: {new Date(emp.dateJoined).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{emp.position}</td>
                                <td style={{ padding: '1.5rem', color: '#64748b' }}>{emp.department || 'Technical'}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <span style={{ padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, background: emp.status === 'Active' ? '#dcfce7' : '#fef2f2', color: emp.status === 'Active' ? '#166534' : '#ef4444' }}>{emp.status.toUpperCase()}</span>
                                </td>
                                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                        <button style={{ padding: '0.5rem', background: '#f1f5f9', border: 'none', borderRadius: '10px', color: '#64748b', cursor: 'pointer' }}><Eye size={18}/></button>
                                        <button onClick={() => deleteEmployee(emp._id)} style={{ padding: '0.5rem', background: '#fef2f2', border: 'none', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Member Onboarding">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                        <input type="text" className="input-premium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full legal name" required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Position</label>
                            <input type="text" className="input-premium" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} placeholder="e.g. Lead Engineer" required />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Monthly Salary ($)</label>
                            <input type="number" className="input-premium" value={formData.monthlySalary} onChange={e => setFormData({...formData, monthlySalary: e.target.value})} placeholder="e.g. 8500" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary" style={{ width: '100%', height: '56px' }}>Onboard Expert</button>
                </form>
            </Modal>
        </div>
    );
};

/* --- Payroll View --- */
const PayrollView = () => {
    const [employees, setEmployees] = useState([]);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetch(`${API_URL}/employees`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(setEmployees);
    }, [token]);

    const totalPayout = employees.reduce((sum, e) => sum + (e.monthlySalary || 0), 0);

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Salary & Payroll</h1>
                    <p style={{ color: '#64748b' }}>Monthly technical disbursement processing.</p>
                </div>
                <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '18px', border: '1px solid var(--border)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Monthly Liability</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>${totalPayout.toLocaleString()}</p>
                    </div>
                    <button className="btn btn-dark" style={{ height: '44px' }}><CreditCard size={18}/> Process All</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {employees.map(emp => (
                    <div key={emp._id} className="admin-stat-card" style={{ padding: '1.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{emp.name[0]}</div>
                                <div>
                                    <p style={{ fontWeight: 700 }}>{emp.name}</p>
                                    <p style={{ fontSize: '0.7rem', color: '#64748b' }}>{emp.position}</p>
                                </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>PAID</span>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, marginBottom: '0.25rem' }}>BASE SALARY</p>
                                <p style={{ fontSize: '1.125rem', fontWeight: 800 }}>${(emp.monthlySalary || 0).toLocaleString()}</p>
                            </div>
                            <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --- Inventory & Stock View --- */
const InventoryView = () => {
    const [inventory, setInventory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ itemName: '', quantity: '', unit: 'tons', warehouseLocation: '', category: 'Raw Material' });
    const token = localStorage.getItem('adminToken');

    const fetchInventory = () => {
        fetch(`${API_URL}/inventory`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(setInventory);
    };

    useEffect(fetchInventory, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/inventory`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setShowModal(false);
            setFormData({ itemName: '', quantity: '', unit: 'tons', warehouseLocation: '', category: 'Raw Material' });
            fetchInventory();
        }
    };

    const deleteInventory = async (id) => {
        if (!window.confirm("Delete this stock item?")) return;
        const res = await fetch(`${API_URL}/inventory/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) fetchInventory();
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Gudon & Materials</h1>
                    <p style={{ color: '#64748b' }}>Enterprise resource and warehouse logistics.</p>
                </div>
                <button className="btn btn-secondary" onClick={() => setShowModal(true)}><Plus size={20}/> Update Stock</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {inventory.map(item => (
                    <div key={item._id} className="admin-stat-card hover-lift" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ background: '#f1f5f9', padding: '0.75rem', borderRadius: '12px' }}><Package size={20} color="var(--primary-accent)"/></div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#f8fafc', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#64748b' }}>{item.category.toUpperCase()}</span>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontWeight: 800 }}>{item.itemName}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={12}/> Locked in {item.warehouseLocation}
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '16px' }}>
                            <div>
                                <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 800, marginBottom: '0.25rem' }}>STOCK LEVEL</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 900 }}>{item.quantity.toLocaleString()} <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>{item.unit}</span></p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => deleteInventory(item._id)} style={{ background: 'white', border: '1px solid #fee2e2', padding: '0.6rem', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Material Entry">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Material Name</label>
                        <input type="text" className="input-premium" placeholder="e.g. Iron Ore / Steel Plates" value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Net Quantity</label>
                            <input type="number" className="input-premium" placeholder="0.00" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Unit</label>
                            <select className="input-premium" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                                <option value="tons">Tons</option>
                                <option value="kg">KG</option>
                                <option value="units">Units</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Warehouse Allocation</label>
                        <input type="text" className="input-premium" placeholder="e.g. Gudon Sector 4" value={formData.warehouseLocation} onChange={e => setFormData({...formData, warehouseLocation: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-dark" style={{ width: '100%', height: '56px' }}>Save to Gudon</button>
                </form>
            </Modal>
        </div>
    );
};

/* --- Projects & Yields View --- */
const ProjectsView = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', client: '', status: 'In Progress' });
    const token = localStorage.getItem('adminToken');

    const fetchProjects = () => {
        fetch(`${API_URL}/projects`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(setProjects);
    };

    useEffect(fetchProjects, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setShowModal(false);
            setFormData({ title: '', description: '', client: '', status: 'In Progress' });
            fetchProjects();
        }
    };

    const deleteProject = async (id) => {
        if (!window.confirm("Remove this project from records?")) return;
        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) fetchProjects();
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Project Intelligence</h1>
                    <p style={{ color: '#64748b' }}>Metallurgical yields and factory optimization log.</p>
                </div>
                <button className="btn btn-secondary" onClick={() => setShowModal(true)}><Plus size={20}/> New Project</button>
            </div>

            <div style={{ background: 'white', borderRadius: '24px', padding: '1rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
                {projects.length === 0 ? (
                    <div style={{ padding: '6rem', textAlign: 'center', color: '#94a3b8' }}>
                        <Briefcase size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                        <p>No projects initiated yet.</p>
                    </div>
                ) : projects.map(proj => (
                    <div key={proj._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }} className="table-row-hover">
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: '#eff6ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Briefcase size={28} color="#3b82f6"/>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: 800 }}>{proj.title}</h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Strategic Client: <span style={{ fontWeight: 700 }}>{proj.client}</span></p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                            <span style={{ padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, background: proj.status === 'Completed' ? '#dcfce7' : '#fff7ed', color: proj.status === 'Completed' ? '#166534' : '#c2410c' }}>
                                {proj.status.toUpperCase()}
                            </span>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.6rem', borderRadius: '12px', color: '#64748b', cursor: 'pointer' }}><Eye size={18}/></button>
                                <button onClick={() => deleteProject(proj._id)} style={{ background: 'white', border: '1px solid #fee2e2', padding: '0.6rem', borderRadius: '12px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Project Initiation">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input-premium" placeholder="Project Name" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ marginBottom: '1.25rem' }} required />
                    <input type="text" className="input-premium" placeholder="Enterprise Client" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} style={{ marginBottom: '1.25rem' }} required />
                    <textarea className="input-premium" placeholder="Technical specifications and scope..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="4" style={{ marginBottom: '1.5rem' }} required></textarea>
                    <button type="submit" className="btn btn-secondary" style={{ width: '100%', height: '56px' }}>Authorize Project</button>
                </form>
            </Modal>
        </div>
    );
};

/* --- Inquiries/Messages View --- */
const InquiryView = () => {
    const [contacts, setContacts] = useState([]);
    const token = localStorage.getItem('adminToken');

    const fetchContacts = () => {
        fetch(`${API_URL}/contacts`, { headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => res.json())
        .then(setContacts);
    };

    useEffect(fetchContacts, [token]);

    const deleteContact = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        const res = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) fetchContacts();
    };

    const markAsRead = async (id) => {
        const res = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Read' })
        });
        if (res.ok) fetchContacts();
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Client Correspondence</h1>
                <p style={{ color: '#64748b' }}>Technical inquiries and consultation requests.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                {contacts.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', background: 'white', padding: '6rem', borderRadius: '32px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1' }}>
                        <MessageSquare size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Incoming Inquiries</h3>
                        <p>When a client fills the contact form, they will appear here.</p>
                    </div>
                ) : contacts.map(msg => (
                    <div key={msg._id} className="admin-stat-card" style={{ padding: '2.5rem', position: 'relative', border: msg.status === 'New' ? '2px solid var(--secondary)' : '1px solid var(--border)' }}>
                        {msg.status === 'New' && <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--secondary)', color: 'white', fontSize: '0.65rem', fontWeight: 900, padding: '0.3rem 0.6rem', borderRadius: '6px' }}>NEW</div>}
                        
                        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ width: '52px', height: '52px', background: 'var(--bg-dark)', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>{msg.name[0]}</div>
                            <div>
                                <h4 style={{ fontWeight: 800, fontSize: '1.125rem' }}>{msg.name}</h4>
                                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{msg.email}</p>
                            </div>
                        </div>
                        
                        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '20px', marginBottom: '2rem', border: '1px solid #f1f5f9' }}>
                            <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.7 }}>"{msg.message}"</p>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>{new Date(msg.date).toLocaleDateString()}</span>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {msg.status !== 'Read' && <button onClick={() => markAsRead(msg._id)} style={{ border: 'none', background: 'none', color: '#3b82f6', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}>Mark Read</button>}
                                <button onClick={() => deleteContact(msg._id)} style={{ border: 'none', background: 'none', color: '#ef4444', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --- Admin Layout --- */
const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    let adminUser = { name: 'Admin', role: 'Staff' };
    try {
        const stored = localStorage.getItem('adminUser');
        if (stored && stored !== 'undefined') {
            adminUser = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to parse admin user", e);
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: Users, label: 'Technical Team', path: '/admin/employees' },
        { icon: Package, label: 'Material Log', path: '/admin/inventory' },
        { icon: Briefcase, label: 'Intel Projects', path: '/admin/projects' },
        { icon: CreditCard, label: 'Payroll Hub', path: '/admin/payroll' },
        { icon: MessageSquare, label: 'Client Inquiries', path: '/admin/messages' },
    ];

    return (
        <div className="admin-shell">
            <aside className="admin-nav">
                <div style={{ marginBottom: '4rem' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 900 }}>
                        <div style={{ background: 'var(--secondary)', padding: '0.6rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(249,115,22,0.3)' }}><Factory size={28}/></div>
                        STEEL OPS
                    </Link>
                </div>
                
                <div style={{ flex: 1 }}>
                    <p style={{ color: '#475569', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>SYSTEM CORE</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {sidebarItems.map(item => (
                            <Link 
                                key={item.path} 
                                to={item.path} 
                                style={{ 
                                    textDecoration: 'none', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '1rem', 
                                    padding: '1.125rem', 
                                    borderRadius: '14px',
                                    color: location.pathname === item.path ? 'white' : '#94a3b8',
                                    background: location.pathname === item.path ? 'rgba(255,255,255,0.05)' : 'transparent',
                                    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: location.pathname === item.path ? 'translateX(5px)' : 'none',
                                    fontWeight: location.pathname === item.path ? 700 : 500
                                }}
                            >
                                <item.icon size={20} /> <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--primary-accent)', color: 'white', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 900 }}>{adminUser.name?.[0]}</div>
                        <div>
                            <p style={{ fontSize: '0.95rem', fontWeight: 800 }}>{adminUser.name}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Shield size={10} color="#3b82f6"/>
                                <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>EXECUTIVE ACCESS</p>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: '0.3s' }}
                        onMouseEnter={e => { e.target.style.background = '#ef4444'; e.target.style.color = 'white'; }}
                        onMouseLeave={e => { e.target.style.background = 'rgba(239, 68, 68, 0.1)'; e.target.style.color = '#ef4444'; }}
                    >
                        <LogOut size={18} /> TERM SESSION
                    </button>
                    <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(59,130,246,0.03)', borderRadius: '20px', border: '1px solid rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></div>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800, letterSpacing: '0.05em' }}>SYSTEMS SECURE</span>
                    </div>
                </div>
            </aside>

            <main className="admin-body">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div style={{ position: 'relative', width: '350px' }}>
                        <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                        <input className="input-premium" style={{ paddingLeft: '3.5rem', borderRadius: '18px', background: 'white', height: '52px' }} placeholder="Search operations, materials, teams..." />
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem' }}>
                        <div style={{ width: '52px', height: '52px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', cursor: 'pointer', position: 'relative' }} className="hover-lift">
                            <Bell size={22} color="#64748b" />
                            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '10px', height: '10px', background: 'var(--secondary)', borderRadius: '50%', border: '2px solid white' }}></div>
                        </div>
                        <div style={{ width: '52px', height: '52px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', cursor: 'pointer' }} className="hover-lift"><Clock size={22} color="#64748b" /></div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.98, y: 15 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.98, y: -15 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Routes>
                            <Route path="/" element={<DashboardHome />} />
                            <Route path="/employees" element={<HRView />} />
                            <Route path="/inventory" element={<InventoryView />} />
                            <Route path="/projects" element={<ProjectsView />} />
                            <Route path="/payroll" element={<PayrollView />} />
                            <Route path="/messages" element={<InquiryView />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Admin;
