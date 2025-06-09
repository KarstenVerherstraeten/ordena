import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Dashboard() {
    const { auth, recentActivities = [] } = usePage().props;
    const { totalUpvotes =0  } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mijn profiel
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welkom op je dashboard, {auth.user.name}! Hier kan je je profiel beheren en meer.
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {/* Totale upvotes */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-700">Upvotes op je forumberichten</h3>
                            <p className="text-3xl font-bold mt-2 text-green-600">{totalUpvotes}</p>
                        </div>

                        {/* Recente activiteiten */}
                        <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Recente Activiteiten</h3>
                            {recentActivities.length === 0 ? (
                                <p className="text-gray-500">Je hebt nog geen activiteiten...</p>
                            ) : (
                                <ul className="list-disc list-inside text-gray-800 space-y-1">
                                    {recentActivities.map((activity, index) => (
                                        <li key={index}>{activity}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>

                    <Footer/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
