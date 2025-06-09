import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';

export default function RoleRequests({ requests, auth }) {
    const { post, delete: destroy } = useForm();

    return (
        <AdminLayout user={auth.user} header={<h2 className="text-xl font-semibold text-gray-800">Rol Aanvragen</h2>}>

            <Head title="Rol Aanvragen" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

                    <div className="overflow-hidden bg-white shadow rounded-lg">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ingediende Aanvragen</h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                                    <tr>
                                        <th className="px-6 py-3">Gebruiker</th>
                                        <th className="px-6 py-3">Rol</th>
                                        <th className="px-6 py-3">Document</th>
                                        <th className="px-6 py-3">Acties</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {requests.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-6 text-gray-500 italic">
                                                Geen aanvragen gevonden.
                                            </td>
                                        </tr>
                                    ) : (
                                        requests.map((req) => (
                                            <tr key={req.id}>
                                                <td className="px-6 py-4">
                                                    {req.user.name} <br />
                                                    <span className="text-xs text-gray-500">{req.user.email}</span>
                                                </td>
                                                <td className="px-6 py-4">{req.role}</td>
                                                <td className="px-6 py-4">
                                                    {req.image ? (
                                                        <a
                                                            href={`/storage/${req.image}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Bekijk
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-500 italic">Geen document</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        <button
                                                            onClick={() => post(route('admin.rolerequest.accept', req.id))}
                                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                                                        >
                                                            Accepteer
                                                        </button>
                                                        <button
                                                            onClick={() => destroy(route('admin.rolerequest.destroy', req.id))}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                                                        >
                                                            Weiger
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
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
