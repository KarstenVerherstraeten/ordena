import {Head, router, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import React, {useState} from "react";



export default function MyActivities({ activities }) {
    const message = usePage().props.flash?.message;

    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);

    const handleDelete = (activityId) => {
        setSelectedActivityId(activityId);
        setConfirmingDelete(true);
    };

    const confirmDelete = () => {
        if (selectedActivityId) {
            router.delete(route('activities.destroy', selectedActivityId), {
                preserveScroll: true,
                preserveState: true,
            });
        }
        setConfirmingDelete(false);
        setSelectedActivityId(null);
    };

    return (
        <AuthenticatedLayout>
        <div className="py-12">
            <Head title="Mijn Activiteiten" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-lg font-bold my-4">Mijn Activiteiten</h2>
                        <p>Hieronder staan mijn activiteiten.</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-3">Naam</th>
                            <th className="px-6 py-3">Beschrijving</th>
                            <th className="px-6 py-3">Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {activities.map(activity => (
                            <tr key={activity.id} className="border-b border-gray-200">
                                <td className="px-6 py-4">{activity.name}</td>
                                <td className="px-6 py-4">{activity.description}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(activity.id)}
                                        className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Delete post
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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

        </div>
        </AuthenticatedLayout>
    )
}
