import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";



export default function MyActivities({ activities }) {
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
                                    {/* Add action buttons here */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        </AuthenticatedLayout>
    )
}
