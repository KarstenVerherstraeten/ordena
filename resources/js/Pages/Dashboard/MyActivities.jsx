import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import React, { useState } from "react";
import Footer from "@/Components/Footer.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

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
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Mijn Activiteiten</h2>}>
            <Head title="Mijn Activiteiten" />

            {message && (
                <div className="mt-6 mx-auto max-w-4xl bg-green-100 text-green-800 px-4 py-2 rounded border border-green-300 shadow">
                    {message}
                </div>
            )}

            <div className="py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-row justify-between items-center">
                    <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Mijn Activiteiten</h2>
                    <p className="text-gray-600">Hieronder staan je activiteiten.</p>
                    </div>
                    <PrimaryButton onClick={() => makeActivity()}>
                        maak activiteit
                    </PrimaryButton>
                </div>

                <div className="overflow-hidden bg-white rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="px-6 py-3 text-left">Naam</th>
                            <th className="px-6 py-3 text-left">Beschrijving</th>
                            <th className="px-6 py-3 text-left">Acties</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {activities.map((activity) => (
                            <tr
                                key={activity.id}
                                className="hover:bg-gray-50 transition duration-150"
                            >
                                <td className="px-6 py-4 text-gray-800">{activity.name}</td>
                                <td className="px-6 py-4 text-gray-600">{activity.description}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(activity.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                    >
                                        Verwijderen
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>

            {/* Modal */}
            {confirmingDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Bevestig verwijderen</h3>
                        <p className="text-gray-700">Weet je zeker dat je deze activiteit wilt verwijderen?</p>
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
