import React from 'react';
import {useForm, Link, Head} from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';

export default function RoleRequests({ requests, auth }) {
    const { post, delete: destroy } = useForm();

    return (
        <AdminLayout user={auth.user} header={<h2 className="text-xl font-semibold">Rol Aanvragen</h2>}>

            <Head title="Rol Aanvragen" />
            <div className="p-6">
                {requests.length === 0 ? (
                    <p>Geen aanvragen gevonden.</p>
                ) : (
                    <table className="min-w-full table-auto border">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Gebruiker</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2">Document</th>
                            <th className="px-4 py-2">Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-t">
                                <td className="px-4 py-2">{req.user.name} ({req.user.email})</td>
                                <td className="px-4 py-2">{req.role}</td>
                                <td className="px-4 py-2">
                                    {req.image && (
                                        <a
                                            href={`/storage/${req.image}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Bekijk
                                        </a>
                                    )}
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => post(route('admin.rolerequest.accept', req.id))}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Accepteer
                                    </button>
                                    <button
                                        onClick={() => destroy(route('admin.rolerequest.destroy', req.id))}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Weiger
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
