import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, X, Save, Loader } from 'lucide-react';
import api from '../../services/api';

const PROGRAMS = [
    { value: 'all', label: 'All Programs' },
    { value: 'development', label: 'Development' },
    { value: 'product-management', label: 'Product Management' },
    { value: 'product-design', label: 'Product Design' },
    { value: 'job-readiness', label: 'Job Readiness' },
];

const emptyForm = {
    name: '',
    title: '',
    image: '',
    videoUrl: '',
    quote: [''],
    program: 'all',
    displayOrder: 0,
    isActive: true,
};

const TestimonialsList = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const fetchTestimonials = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get('/testimonials/admin');
            setTestimonials(res.data.data || []);
        } catch (err) {
            setError('Failed to load testimonials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const showSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const openAddModal = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowModal(true);
    };

    const openEditModal = (testimonial) => {
        setFormData({
            name: testimonial.name,
            title: testimonial.title,
            image: testimonial.image,
            videoUrl: testimonial.videoUrl,
            quote: testimonial.quote.length > 0 ? testimonial.quote : [''],
            program: testimonial.program || 'all',
            displayOrder: testimonial.displayOrder || 0,
            isActive: testimonial.isActive,
        });
        setEditingId(testimonial._id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData(emptyForm);
    };

    const handleQuoteChange = (index, value) => {
        const updated = [...formData.quote];
        updated[index] = value;
        setFormData(prev => ({ ...prev, quote: updated }));
    };

    const addQuoteParagraph = () => {
        setFormData(prev => ({ ...prev, quote: [...prev.quote, ''] }));
    };

    const removeQuoteParagraph = (index) => {
        if (formData.quote.length === 1) return;
        const updated = formData.quote.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, quote: updated }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.title || !formData.image || !formData.videoUrl || !formData.quote[0]) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSaving(true);
        try {
            if (editingId) {
                await api.put(`/testimonials/${editingId}`, formData);
                showSuccess('Testimonial updated successfully!');
            } else {
                await api.post('/testimonials', formData);
                showSuccess('Testimonial added successfully!');
            }
            closeModal();
            fetchTestimonials();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save testimonial.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggle = async (id) => {
        try {
            await api.patch(`/testimonials/${id}/toggle`);
            fetchTestimonials();
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return;
        try {
            await api.delete(`/testimonials/${id}`);
            showSuccess('Testimonial deleted.');
            fetchTestimonials();
        } catch (err) {
            alert('Failed to delete testimonial.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <Loader className="w-8 h-8 animate-spin text-teal-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
                    <p className="text-gray-500 mt-1">Manage student testimonial videos shown on the homepage</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </button>
            </div>

            {/* Success message */}
            {successMsg && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✅ {successMsg}
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex justify-between">
                    {error}
                    <button onClick={fetchTestimonials} className="underline font-medium">Retry</button>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                    <p className="text-sm text-gray-500">Total Testimonials</p>
                    <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                    <p className="text-sm text-gray-500">Active (Showing)</p>
                    <p className="text-2xl font-bold text-teal-600">{testimonials.filter(t => t.isActive).length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                    <p className="text-sm text-gray-500">Hidden</p>
                    <p className="text-2xl font-bold text-gray-400">{testimonials.filter(t => !t.isActive).length}</p>
                </div>
            </div>

            {/* Testimonials Grid */}
            {testimonials.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <p className="text-gray-500 mb-4">No testimonials yet. Add your first one!</p>
                    <button
                        onClick={openAddModal}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
                    >
                        Add First Testimonial
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t._id}
                            className={`bg-white rounded-lg shadow-sm border overflow-hidden ${!t.isActive ? 'opacity-60 border-gray-200' : 'border-teal-100'}`}
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 bg-gray-100">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                                />
                                {!t.isActive && (
                                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium bg-gray-700 px-3 py-1 rounded-full">Hidden</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full text-gray-600 capitalize">
                                    {t.program === 'all' ? 'All Programs' : t.program.replace('-', ' ')}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900">{t.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{t.title}</p>
                                <p className="text-sm text-gray-600 line-clamp-2 italic">"{t.quote[0]}"</p>

                                {/* Video link preview */}
                                <a
                                    href={t.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-teal-600 hover:underline mt-2 block truncate"
                                >
                                    🎬 {t.videoUrl}
                                </a>
                            </div>

                            {/* Actions */}
                            <div className="px-4 pb-4 flex gap-2">
                                <button
                                    onClick={() => openEditModal(t)}
                                    className="flex items-center gap-1 text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                >
                                    <Edit className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleToggle(t._id)}
                                    className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                                        t.isActive
                                            ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700'
                                            : 'bg-green-50 hover:bg-green-100 text-green-700'
                                    }`}
                                >
                                    {t.isActive ? <><EyeOff className="w-4 h-4" /> Hide</> : <><Eye className="w-4 h-4" /> Show</>}
                                </button>
                                <button
                                    onClick={() => handleDelete(t._id, t.name)}
                                    className="flex items-center gap-1 text-sm px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors ml-auto"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            {/* Name & Title */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Student Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                        placeholder="e.g. Gloria Ondieki"
                                        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title / Program <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                                        placeholder="e.g. Graduate, Web Development"
                                        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Photo URL (Cloudinary) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={e => setFormData(p => ({ ...p, image: e.target.value }))}
                                    placeholder="https://res.cloudinary.com/..."
                                    className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="mt-2 h-16 w-16 rounded-full object-cover border"
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                )}
                            </div>

                            {/* Video URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Video URL (Cloudinary or YouTube) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.videoUrl}
                                    onChange={e => setFormData(p => ({ ...p, videoUrl: e.target.value }))}
                                    placeholder="https://res.cloudinary.com/.../video.mp4 or https://youtube.com/..."
                                    className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>

                            {/* Quote Paragraphs */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quote / Testimonial Text <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500 mb-2">You can split into multiple paragraphs</p>
                                {formData.quote.map((q, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <textarea
                                            value={q}
                                            onChange={e => handleQuoteChange(i, e.target.value)}
                                            placeholder={`Paragraph ${i + 1}...`}
                                            rows={3}
                                            className="flex-1 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                            required={i === 0}
                                        />
                                        {formData.quote.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeQuoteParagraph(i)}
                                                className="text-red-500 hover:text-red-700 self-start mt-2"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addQuoteParagraph}
                                    className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1 mt-1"
                                >
                                    <Plus className="w-4 h-4" /> Add another paragraph
                                </button>
                            </div>

                            {/* Program & Order */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                                    <select
                                        value={formData.program}
                                        onChange={e => setFormData(p => ({ ...p, program: e.target.value }))}
                                        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        {PROGRAMS.map(p => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Display Order
                                        <span className="text-xs text-gray-400 ml-1">(lower = first)</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.displayOrder}
                                        onChange={e => setFormData(p => ({ ...p, displayOrder: parseInt(e.target.value) || 0 }))}
                                        min={0}
                                        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            {/* Active Toggle */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={e => setFormData(p => ({ ...p, isActive: e.target.checked }))}
                                    className="w-4 h-4 text-teal-600"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                                    Show on website (active)
                                </label>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white px-6 py-2.5 rounded-lg transition-colors"
                                >
                                    {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Testimonial'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestimonialsList;
