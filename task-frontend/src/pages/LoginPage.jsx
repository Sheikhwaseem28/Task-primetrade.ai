import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(email, password);
        setLoading(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h1>
                    <p className="text-gray-500 mt-2 font-medium">Sign in to continue to Taskkk</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="email"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => { setEmail('admin@examplee.com'); setPassword('123456'); }}
                            className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition text-sm font-semibold border border-indigo-100"
                        >
                            Demo Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => { setEmail('user@example.com'); setPassword('123456'); }}
                            className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-semibold border border-gray-200"
                        >
                            Demo User
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            <span className="flex items-center gap-2">
                                Sign In <ArrowRight size={18} />
                            </span>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                            create one now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
