import { Head } from "@inertiajs/react";

export default function ActivitiesShow({ activity }) {
    return (
        <div className="py-12">
            <Head title={activity.name} />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-lg font-bold my-4">{activity.name}</h2>
                        <p>{activity.description}</p>
                    </div>
                </div>

                {activity.featured_image && (
                    <div className="my-6">
                        <h2 className="text-lg font-bold mb-4">Featured Image</h2>
                        <img
                            src={`/storage/${activity.featured_image}`}
                            alt="Featured activity image"
                            className="rounded shadow-md w-full max-w-md object-cover"
                        />
                    </div>
                )}

                <div className="my-6">
                    <h2 className="text-lg font-bold mb-4">Afbeeldingen:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {activity.images && activity.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={`/storage/${img.image_path}`}
                                alt={`Afbeelding ${idx + 1}`}
                                className="rounded shadow-md w-full h-auto object-cover"
                            />
                        ))}
                    </div>
                </div>

                <div className="post mt-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-bold my-4">Details</h2>
                            <p><strong>Start Date:</strong> {activity.start}</p>
                            <p><strong>End Date:</strong> {activity.end}</p>
                            <p><strong>Price:</strong> {activity.price === 0 ? 'Gratis' : activity.price}</p>
                            <p><strong>Location:</strong> {activity.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
