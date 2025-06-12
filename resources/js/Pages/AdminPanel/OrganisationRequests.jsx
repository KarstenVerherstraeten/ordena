import { Head, useForm } from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import React from "react";
import Footer from "@/Components/Footer.jsx";

export default function OrganisationRequests({ pendingRequests }) {
    const { post } = useForm();

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold text-gray-800">Organisatie aanvragen</h2>}
            breadcrumbs={[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: route('dashboard') },
                { name: 'Organisatie aanvragen' }
            ]}
        >
            <Head title="Organisatie aanvragen" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ingediende Aanvragen</h2>
                        <p className="text-gray-600 mb-6">Hier kun je de organisatieaanvragen beheren.</p>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                                <tr>
                                    <th className="px-6 py-3">Naam</th>
                                    <th className="px-6 py-3">Adres</th>
                                    <th className="px-6 py-3">BTW-nummer</th>
                                    <th className="px-6 py-3">Acties</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {pendingRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-500 italic">
                                            Geen organisatieaanvragen gevonden.
                                        </td>
                                    </tr>
                                ) : (
                                    pendingRequests.map((request) => (
                                        <tr key={request.id}>
                                            <td className="px-6 py-4">{request.organisation_name}</td>
                                            <td className="px-6 py-4">{request.organisation_address}</td>
                                            <td className="px-6 py-4">{request.btw_number}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => post(route('admin.organisation.approve', request.id))}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                                                    >
                                                        Goedkeuren
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                                                        onClick={() => alert('Afwijzen nog niet geïmplementeerd')}
                                                    >
                                                        Afwijzen
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                   <Footer></Footer>
                </div>
            </div>
        </AdminLayout>
    );
}
