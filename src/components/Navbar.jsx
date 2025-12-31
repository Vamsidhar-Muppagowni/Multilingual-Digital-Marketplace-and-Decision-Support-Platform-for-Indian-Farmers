import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, Sprout } from 'lucide-react';

const Navbar = () => {
    const { t, switchLanguage, language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, label }) => (
        <Link
            to={to}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive(to)
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                }`}
        >
            {label}
        </Link>
    );

    return (
        <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-emerald-600 p-2 rounded-lg text-white">
                                <Sprout size={24} />
                            </div>
                            <span className="font-bold text-xl text-gray-800">M-5 Farming</span>
                        </Link>
                        <div className="hidden md:ml-8 md:flex md:space-x-4">
                            <NavLink to="/" label={t('welcome_dashboard')} />
                            <NavLink to="/marketplace" label={t('marketplace')} />
                            <NavLink to="/schemes" label={t('schemes')} />
                            <NavLink to="/farming-help" label={t('farming_help')} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => switchLanguage(language === 'en' ? 'te' : 'en')}
                            className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md hover:bg-gray-50"
                        >
                            <Globe size={18} />
                            <span className="uppercase font-semibold text-sm">{language}</span>
                        </button>

                        <Link
                            to="/login"
                            className="hidden md:block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium shadow-md shadow-emerald-600/20"
                        >
                            {t('login')}
                        </Link>

                        <div className="-mr-2 flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('welcome_dashboard')}</Link>
                        <Link to="/marketplace" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('marketplace')}</Link>
                        <Link to="/schemes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t('schemes')}</Link>
                        <Link to="/login" className="block w-full text-center mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg">{t('login')}</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
