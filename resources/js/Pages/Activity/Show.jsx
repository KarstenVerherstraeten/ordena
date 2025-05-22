import { Head } from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import { toast, ToastContainer } from "react-toastify";
import React from "react";
import BackToTop from "@/Components/BackToTop.jsx";

export default function ActivitiesShow({ activity }) {
    return (
        <SiteLayout>
            <Head title="Activiteit" />

            {/* Featured image */}
            <div className="w-full">
                <img
                    src={activity.featured_image ? `/storage/${activity.featured_image}` : '/Assets/Placeholders/placeholderImage.webp'}
                    alt={activity.name}
                    className="w-full h-64 object-cover rounded-lg shadow"
                />
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-6 mt-6">

                {/* Left content block */}
                <div className="flex flex-col gap-6 w-full lg:w-2/3">

                    {/* Title & Description */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold text-gray-800">{activity.title}</h2>
                        <p className="mt-4 text-gray-600 whitespace-pre-line">{activity.description}</p>
                    </div>

                    {/* Activity Info */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="text-lg font-semibold text-gray-800">Gegevens activiteit:</h4>
                        <p className="text-sm text-gray-600 mt-2">📅 Datum: {activity.start}</p>
                        <p className="text-sm text-gray-600 mt-1">📍 Locatie: {activity.location}</p>
                        <p className="text-sm text-gray-600 mt-1">💶 Prijs: {activity.price === 0 ? 'Gratis' : `${activity.price} €`}</p>
                    </div>

                    {/* Images */}
                    {activity.images.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Afbeeldingen</h4>
                            <div className="flex flex-wrap gap-3">
                                {activity.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={`/storage/${image.image}`}
                                        alt={activity.name}
                                        className="w-32 h-32 object-cover rounded shadow"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right sidebar: Organizer Info */}
                <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow h-fit">
                    <h4 className="text-lg font-semibold text-gray-800">Gegevens organisator:</h4>
                    <p className="text-sm text-gray-600 mt-2">📅 Datum: {activity.start}</p>
                    <p className="text-sm text-gray-600 mt-1">📍 Locatie: {activity.location}</p>
                    <p className="text-sm text-gray-600 mt-1">💶 Prijs: {activity.price === 0 ? 'Gratis' : `${activity.price} €`}</p>

                    <div className="mt-6">
                        <SecondaryButton onClick={() => {
                            navigator.clipboard.writeText(route('activities.show', activity.id));
                            toast.success('Link gekopieerd!', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                        }}>
                            Deel Activiteit
                        </SecondaryButton>
                    </div>
                </div>
            </div>

            <BackToTop />
            <ToastContainer />
        </SiteLayout>
    );
}
