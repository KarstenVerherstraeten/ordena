import AdminLayout from '@/Layouts/AdminLayout.jsx';
import {Head, router, usePage} from '@inertiajs/react';
import { useState } from 'react';

export default function ManageUsers() {
    const { users } = usePage().props;

    const [editingUserId, setEditingUserId] = useState(null);
    const [newRole, setNewRole] = useState('');

    const availableRoles = ['Gebruiker', 'Ouder', 'Leerkracht', 'Psycholoog', 'Admin'];

    const startEditing = (user) => {
        setEditingUserId(user.id);
        setNewRole(user.role || '');
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setNewRole('');
    };

    const saveRole = (userId) => {
        // Dynamically pass the userId into the route
        router.put(`/admin/manage/${userId}/role`, { role: newRole });
        cancelEditing();
    };


    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Users
                </h2>
            }
        >
            <Head title="Manage Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-bold my-4">User Management</h2>
                            <p>Here you can manage users, roles, and permissions.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2>Users:</h2>

                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-3">Naam</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Rol</th>
                            <th className="px-6 py-3">Acties</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    {editingUserId === user.id ? (
                                        <select
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option value="">-- Kies een rol --</option>
                                            {availableRoles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    {editingUserId === user.id ? (
                                        <>
                                            <button
                                                onClick={() => saveRole(user.id)}
                                                className="text-green-600 hover:underline"
                                            >
                                                Opslaan
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="text-gray-500 hover:underline"
                                            >
                                                Annuleren
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startEditing(user)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Bewerken
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
