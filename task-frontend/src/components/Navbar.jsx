import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LogOut, Menu, X, LayoutDashboard, PlusCircle, User, Zap } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/login');
    };

    const NavLink = ({ to, children, icon: Icon }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                    }`}
            >
                {Icon && <Icon size={18} />}
                <span>{children}</span>
            </Link>
        );
    };

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                            <Zap className="text-white h-5 w-5" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Taskkk
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {user ? (
                            <>
                                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                                {user.role === 'admin' && (
                                    <NavLink to="/product/create" icon={PlusCircle}>New Product</NavLink>
                                )}

                                <div className="h-6 w-px bg-gray-200 mx-4"></div>

                                <div className="flex items-center pl-2 space-x-4">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 capitalize">{user.role}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {user ? (
                            <>
                                <div className="px-4 py-3 mb-2 bg-gray-50 rounded-lg flex items-center space-x-3">
                                    <div className="bg-indigo-100 p-2 rounded-full">
                                        <User size={20} className="text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                </div>
                                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                                {user.role === 'admin' && (
                                    <NavLink to="/product/create" icon={PlusCircle}>New Product</NavLink>
                                )}
                                <div className="border-t border-gray-100 my-2"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="grid gap-3 p-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 text-white bg-indigo-600 font-medium rounded-lg shadow-lg shadow-indigo-500/20"
                                >
                                    Create account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
