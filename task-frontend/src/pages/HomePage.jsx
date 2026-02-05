import { Link } from 'react-router-dom';
import { ArrowRight, Layout, Shield, Zap } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white pt-10 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                        Manage your tasks with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 block sm:inline">Taskkk</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed px-2">
                        The ultimate platform for scalable product management. Secure, fast, and robust authentication built with the MERN stack.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 md:text-lg md:px-10 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-1"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-indigo-700 bg-indigo-100 rounded-xl hover:bg-indigo-200 md:text-lg md:px-10 transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
                        <div className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-xl mb-4 text-indigo-600">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Authentication</h3>
                            <p className="text-gray-500">Industry standard JWT & Bcrypt security integration.</p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-purple-100 rounded-xl mb-4 text-purple-600">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Performance</h3>
                            <p className="text-gray-500">Optimized React frontend with Vite for lightning speed.</p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-xl mb-4 text-emerald-600">
                                <Layout size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Modern UI</h3>
                            <p className="text-gray-500">Beautifully designed interfaces using Tailwind CSS.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
