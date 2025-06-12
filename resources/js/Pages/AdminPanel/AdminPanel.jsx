import AdminLayout from '@/Layouts/AdminLayout.jsx';
import {Head} from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";

export default function Dashboard() {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Welcome to the admin panel. Here you can manage users, posts, and more.</p>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </div>
        </AdminLayout>
    );
}
