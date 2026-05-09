import React, { useState } from 'react';

const StudentRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollNo: '',
        academicYear: ''
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
                setFormData({ name: '', email: '', password: '', rollNo: '', academicYear: '' });
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
                                        pattern="^[a-z0-9]+@[a-z]+\.com$"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        minLength="6"
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
                                            placeholder="2023001" 
                                            pattern="[0-9]+"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Academic Year</label>
                                        <select 
                                            name="academicYear" 
                                            value={formData.academicYear} 
                                            onChange={handleChange} 
                                            className="form-select" 
                                            required
                                        >
                                            <option value="">Select...</option>
                                            <option value="1st AcademicYear">1st AcademicYear</option>
                                            <option value="2nd AcademicYear">2nd AcademicYear</option>
                                            <option value="3rd AcademicYear">3rd AcademicYear</option>
                                            <option value="4th AcademicYear">4th AcademicYear</option>
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