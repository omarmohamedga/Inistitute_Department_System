import React, { useState } from 'react';

const StudentRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollNo: '',
        semester: ''
    });
    
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: data.message });
                setFormData({ name: '', email: '', password: '', rollNo: '', semester: '' });
            } else {
                setMessage({ type: 'danger', text: data.message });
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'Network error, please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header bg-dark text-white text-center py-3">
                            <h3 className="font-weight-light my-2">Student Registration</h3>
                        </div>
                        <div className="card-body p-4">
                            
                            {message.text && (
                                <div className={`alert alert-${message.type}`} role="alert">
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-muted">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        required 
                                        placeholder="Enter your full name" 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        required 
                                        placeholder="name@example.com" 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        required 
                                        placeholder="Create a strong password" 
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Roll Number</label>
                                        <input 
                                            type="text" 
                                            name="rollNo" 
                                            value={formData.rollNo} 
                                            onChange={handleChange} 
                                            className="form-control" 
                                            required 
                                            placeholder="e.g. 2023001" 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Semester</label>
                                        <select 
                                            name="semester" 
                                            value={formData.semester} 
                                            onChange={handleChange} 
                                            className="form-select" 
                                            required
                                        >
                                            <option value="">Select...</option>
                                            <option value="1st Semester">1st Semester</option>
                                            <option value="2nd Semester">2nd Semester</option>
                                            <option value="3rd Semester">3rd Semester</option>
                                            <option value="4th Semester">4th Semester</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                        {loading ? 'Registering...' : 'Create Account'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRegistration;