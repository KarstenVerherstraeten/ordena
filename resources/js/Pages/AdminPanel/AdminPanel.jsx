import AdminLayout from '@/Layouts/AdminLayout.jsx';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-lg font-bold my-4">Admin Dashboard</h2>
                        <p>Welcome to the admin panel. Here you can manage users, posts, and more.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
