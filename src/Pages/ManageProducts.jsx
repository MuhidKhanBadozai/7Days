import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        price_200_500: '',
        price_501_plus: '',
        weight: '',
        dimensions: '',
        quantity: '',
        category_id: '',
        image: null
    });
    const navigate = useNavigate();

    // Fetch products and categories on mount
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://putratraders.com/api/fetch_all.php', {
                cache: 'no-store'
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setProducts([]);
                setError('No products found');
            }
        } catch (err) {
            setError('Failed to fetch products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://putratraders.com/api/fetch_all_categories.php');
            const data = await response.json();
            if (Array.isArray(data)) {
                setCategories(data);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0],
                // Keep the old image_url in case upload fails
                previous_image_url: prev.image_url
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image_url') return; // Skip the image_url field as it's for display only
            if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const endpoint = formData.id 
                ? 'https://putratraders.com/api/admin/update_product.php'
                : 'https://putratraders.com/api/admin/add_product.php';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('admin_token')).id}`
                },
                body: formDataToSend
            });

            const data = await response.json();
            if (data.success) {
                setShowAddModal(false);
                fetchProducts(); // Refresh product list
                setFormData({
                    sku: '',
                    name: '',
                    description: '',
                    price_200_500: '',
                    price_501_plus: '',
                    weight: '',
                    dimensions: '',
                    quantity: '',
                    category_id: '',
                    image: null
                });
            } else {
                setError(data.error || 'Failed to add product');
            }
        } catch (err) {
            setError('Network error while adding product');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch('https://putratraders.com/api/admin/delete_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('admin_token')).id}`
                },
                body: JSON.stringify({ id })
            });

            const data = await response.json();
            if (data.success) {
                fetchProducts(); // Refresh list
            } else {
                setError(data.error || 'Failed to delete product');
            }
        } catch (err) {
            setError('Network error while deleting product');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Manage Products</h1>
                        <p className="mt-1 text-sm text-gray-600">Add, edit, or remove products from your inventory</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                        Add New Product
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {/* Products Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (200-500)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (501+)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center">Loading...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center">No products found</td>
                                </tr>
                            ) : (
                                products.map((product) => {
                                    const imageUrl = product.image_url?.startsWith('http')
                                        ? product.image_url
                                        : `https://putratraders.com/${product.image_url}`;
                                    
                                    return (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={imageUrl || '/placeholder.png'}
                                                        alt={product.name}
                                                        className="h-12 w-12 object-contain rounded border border-gray-200"
                                                    />
                                                    <span className="ml-4 text-sm text-gray-900">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price_200_500}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price_501_plus}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-900 mr-4"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setFormData({
                                                            ...product,
                                                            image_url: imageUrl // Use the full image URL
                                                        });
                                                        setShowAddModal(true);
                                                    }}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">{formData.id ? 'Edit Product' : 'Add New Product'}</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">SKU</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (200-500)</label>
                                    <input
                                        type="number"
                                        name="price_200_500"
                                        value={formData.price_200_500}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (501+)</label>
                                    <input
                                        type="number"
                                        name="price_501_plus"
                                        value={formData.price_501_plus}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Weight</label>
                                    <input
                                        type="text"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                                    <input
                                        type="text"
                                        name="dimensions"
                                        value={formData.dimensions}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.id}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                                {formData.image_url && (
                                    <div className="mt-2 mb-4">
                                        <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                                        <img
                                            src={formData.image_url.startsWith('http') 
                                                ? formData.image_url 
                                                : `https://putratraders.com/${formData.image_url}`
                                            }
                                            alt="Current product"
                                            className="w-32 h-32 object-contain border rounded-md"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleInputChange}
                                    accept="image/*"
                                    className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-black file:text-white
                                        hover:file:bg-gray-800"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {formData.id ? "Upload new image to replace the current one" : "Upload a product image"}
                                </p>
                            </div>

                            <div className="flex justify-end gap-4 mt-5">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md"
                                >
                                    {formData.id ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}