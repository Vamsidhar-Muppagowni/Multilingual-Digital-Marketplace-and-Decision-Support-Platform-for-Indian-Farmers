import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { User, Lock, ArrowRight, Sprout } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login delay for effect
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-8 animate-fade-in">
            {/* Left Side - Brand/Welcome */}
            <div className="flex-1 max-w-md text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                    <div className="bg-emerald-100 p-3 rounded-2xl">
                        <Sprout className="text-emerald-600 w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800">M-5 Farming</h1>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back, Farmer!</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Access your dashboard, check crop prices, and manage your farm efficiently with our digital tools.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {['Real-time Prices', 'Government Schemes', 'Secure Payments'].map((item) => (
                        <span key={item} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 w-full max-w-md">
                <Card className="p-8 border-t-4 border-t-emerald-500 shadow-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('login')} to Account</h3>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="name@farm.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3 flex items-center justify-center gap-2 text-lg"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account? <span className="text-emerald-600 font-semibold cursor-pointer hover:underline">Register New Farm</span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
