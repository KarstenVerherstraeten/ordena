import {Head} from "@inertiajs/react";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useForm} from "@inertiajs/react";


export default function ActivitiesCreate() {

    const {data, setData, post, processing, errors} = useForm({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
        location: '',
        featured_image: ''

    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('activities.store'));
    }

    return (
        <div className="py-12">
            <Head title="Activiteiten"/>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2 className="text-lg font-bold my-4">Registreer je activiteit</h2>
                        <p>Vol onderstaande gegevens in!.</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700">Naam</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700">Beschrijving</label>
                                <textarea
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="StartDate" className="block text-gray-700">Startdatum</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    type="datetime-local"
                                    id="StartDate"
                                    name="StartDate"
                                    value={data.startDate}
                                    onChange={(e) => setData('startDate', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="EndDate" className="block text-gray-700">Einddatum</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    type="datetime-local"
                                    id="EndDate"
                                    name="EndDate"
                                    value={data.endDate}
                                    onChange={(e) => setData('endDate', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Price" className="block text-gray-700">Prijs</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    type="number"
                                    id="Price"
                                    name="Price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                />
                                <p> Vul hier 0 in om je
                                    activiteit gratis aan te bieden</p>

                            </div>
                            <div className="mb-4">
                                <label htmlFor="Location" className="block text-gray-700">Locatie</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    type="text"
                                    id="Location"
                                    name="Location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="featured_image" className="block text-gray-700">Hoofdafbeelding</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    type="file"
                                    id="featured_image"
                                    name="featured_image"
                                    onChange={(e) => setData('featured_image', e.target.files[0])}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="activity_images" className="block text-gray-700">Activiteit
                                    Afbeeldingen</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    type="file"
                                    multiple
                                    id="activity_images"
                                    name="activity_images[]"
                                    onChange={(e) => setData('activity_images', e.target.files)}
                                />
                            </div>
                            {errors && (
                                <div className="text-red-500 text-sm mt-2">
                                    {Object.values(errors).map((error) => (
                                        <p key={error}>{error}</p>
                                    ))}
                                </div>
                            )}
                            <PrimaryButton type="submit">Activiteit Registreren</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
