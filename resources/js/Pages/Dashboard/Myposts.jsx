import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, router, usePage } from '@inertiajs/react';

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
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">My Posts</h2>}
        >
            <Head title="Mijn posts" />

            {message && (
                <div className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-green-800 shadow">
                    {message}
                </div>
            )}

            <h2 className="text-lg font-bold my-4">Je recente posts:</h2>

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id} className="mb-4 border-b pb-2">
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p>{post.content}</p>
                                <p className="text-sm text-gray-500">By: {post.user.name}</p>
                                <div className="upvotes">
                                    <span className="upvote-count">{post.upvotes}</span>
                                </div>

                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete post
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Modal */}
            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Bevestig verwijderen</h3>
                        <p>Weet je zeker dat je deze post wilt verwijderen?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setConfirmingDelete(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Annuleren
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
