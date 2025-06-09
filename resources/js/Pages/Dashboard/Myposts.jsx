import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, router, usePage } from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";

export default function Myposts({ posts }) {
    const message = usePage().props.flash?.message;

    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleDelete = (postId) => {
        setSelectedPostId(postId);
        setConfirmingDelete(true);
    };

    const confirmDelete = () => {
        if (selectedPostId) {
            router.delete(route('posts.destroy', selectedPostId), {
                preserveScroll: true,
                preserveState: true,
            });
        }
        setConfirmingDelete(false);
        setSelectedPostId(null);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-800">Mijn berichten</h2>}
        >
            <Head title="Mijn posts" />

            {message && (
                <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-green-800 border border-green-300 shadow-md">
                    {message}
                </div>
            )}

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="text-xl font-semibold my-6 text-gray-700">Je recente posts</h2>
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                            <p className="text-gray-700 mt-2">{post.content}</p>
                            <p className="text-sm text-gray-500 mt-1">By: You</p>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-sm font-medium text-indigo-600">
                                   <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24"
                                        fill="currentColor">
                                                        <path
                                                            d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"/>
                                                    </svg>️ {post.upvotes} upvotes
                                </span>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    Verwijder post
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Footer />
            </div>

            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Bevestig verwijderen</h3>
                        <p className="text-gray-700">Weet je zeker dat je deze post wilt verwijderen?</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmingDelete(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                            >
                                Annuleren
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Verwijderen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
