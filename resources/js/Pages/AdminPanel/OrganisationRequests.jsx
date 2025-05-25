import {Head, router, useForm} from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";

export default function OrganisationRequests({ pendingRequests }) {
    const { post } = useForm();
    return (
        <AdminLayout
            breadcrumbs={[
                { name: 'Home', href: '/' },
                { name: 'dashboard', href: route('dashboard') },
                { name: 'Organisatie aanvragen' }
            ]}
        >
            <Head title="Organisatie aanvragen" />
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                <h1 className="text-2xl font-semibold mb-6">Organisatie aanvragen</h1>
                <p>Hier kun je de organisatie aanvragen beheren.</p>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Naam</th>
                    <th>Adres</th>
                    <th>BTW-nummer</th>
                    <th>Acties</th>
                </tr>
                </thead>
                <tbody>
                {pendingRequests.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center py-4">
                            Geen organisatie aanvragen gevonden.
                        </td>
                    </tr>
                ) : (
                    pendingRequests.map(request => (
                        <tr key={request.id}>
                            <td>{request.organisation_name}</td>
                            <td>{request.organisation_address}</td>
                            <td>{request.btw_number}</td>
                            <td>
                                <button
                                    onClick={() => post(route('admin.organisation.approve', request.id))}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Goedkeuren
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                                    Afwijzen
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </AdminLayout>
    );
}
