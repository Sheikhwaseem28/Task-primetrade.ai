import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const ProductFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const { data } = await api.get(`/products/${id}`);
                    setName(data.name);
                    setPrice(data.price);
                    setDescription(data.description);
                    setCountInStock(data.countInStock);
                    setImage(data.image);
                } catch (error) {
                    toast.error('Failed to load product details');
                } finally {
                    setFetching(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await api.put(`/products/${id}`, {
                    name,
                    price,
                    description,
                    countInStock,
                    image
                });
                toast.success('Product updated successfully');
            } else {
                await api.post('/products', {
                    name,
                    price,
                    description,
                    countInStock,
                    image: image || '/images/sample.jpg'
                });
                toast.success('Product created successfully');
            }
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <button
                onClick={() => navigate('/dashboard')}
                className="mb-6 flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
            >
                <ArrowLeft size={20} className="mr-1" /> Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {id ? 'Edit Product' : 'Create New Product'}
                    </h1>
                    <p className="text-gray-500 mt-1">Fill in the details below to {id ? 'update' : 'add'} a product.</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="e.g., Wireless Headphones"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Count</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="e.g., /images/product.jpg"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[120px]"
                                    placeholder="Detailed description of the product..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-5 w-5" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-5 w-5" /> {id ? 'Update Product' : 'Create Product'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductFormPage;
