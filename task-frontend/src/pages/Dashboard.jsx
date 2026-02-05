import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Trash2, Edit, PlusCircle, Search, Package, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const createProduct = () => {
        navigate('/product/create');
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success('Product deleted successfully');
            setProducts(products.filter((p) => p._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Delete failed');
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = user?.role === 'admin' ? [
        { title: 'Total Products', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Total Value', value: `₹${products.reduce((acc, p) => acc + p.price, 0).toLocaleString()}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Low Stock', value: products.filter(p => p.countInStock < 5).length, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
    ] : [];

    return (
        <div className="container mx-auto p-4 max-w-7xl animate-fade-in-up">
            {/* Header & Stats */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all sm:text-sm shadow-sm"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {user?.role === 'admin' && (
                    <button
                        onClick={createProduct}
                        className="w-full md:w-auto flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-95"
                    >
                        <PlusCircle size={20} />
                        <span>Add Product</span>
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                                <img
                                    src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'} // Default fallback if no image
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                                {product.countInStock === 0 && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                        Out of Stock
                                    </div>
                                )}
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1" title={product.name}>{product.name}</h2>
                                    <p className="text-lg font-bold text-indigo-600">₹{product.price}</p>
                                </div>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">{product.description}</p>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Unavailable'}
                                    </span>

                                    {user?.role === 'admin' && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => navigate(`/product/${product._id}/edit`)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                            <p className="text-gray-500 mt-1">Try adjusting your search terms.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
