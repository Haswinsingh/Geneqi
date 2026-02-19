import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Facebook, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AppContext } from '../App';
import config from '../config';

const Login = () => {
    const navigate = useNavigate();
    const { login } = React.useContext(AppContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${config.API_URL}/api/auth/login`, formData);
            login(res.data.user, res.data.token);
            setLoading(false);

            // Redirect to Home (Gender Selection)
            navigate('/');
        } catch (err) {
            console.error(err);
            setLoading(false);
            const errorMessage = err.response?.data?.msg || 'Login failed';
            alert(`Login Failed: ${errorMessage}`);
        }
    };

    const handleSocialLogin = async (provider) => {
        // Mocking social auth flow - in production this would involve OAuth redirects or popups
        try {
            const mockProfile = {
                email: `test${provider}@example.com`,
                name: `Test ${provider} User`,
                [`${provider.toLowerCase()}Id`]: `mock_${provider}_id_12345`
            };

            const res = await axios.post(`${config.API_URL}/api/auth/${provider.toLowerCase()}`, mockProfile);
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert(`${provider} login failed`);
        }
    };

    return (
        <div className="container py-20 flex justify-center">
            <div className="glass-card max-w-md w-full text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

                <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Welcome Back</h2>
                <p className="text-text-muted mb-8">Login to access your saved resources.</p>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => handleSocialLogin('Google')}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <Chrome size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Google</span>
                    </button>
                    <button
                        onClick={() => handleSocialLogin('Facebook')}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <Facebook size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Facebook</span>
                    </button>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-[#0f172a] text-text-muted">Or continue with</span>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-gray-600"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-gray-600"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-muted">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                            <input type="checkbox" className="rounded border-gray-600 bg-transparent focus:ring-primary" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="hover:text-primary transition-colors">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full justify-center mt-6 group relative overflow-hidden"
                    >
                        {loading ? (
                            <span className="animate-pulse">Signing in...</span>
                        ) : (
                            <>
                                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">Secure Login</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-sm text-text-muted">
                    <p>Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline ml-1">Create Account</Link></p>
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-xs opacity-50 uppercase tracking-widest">Government & Partner Portal</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
