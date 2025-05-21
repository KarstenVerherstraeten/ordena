import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import React from "react";

export default function ActivitiesIndex({ activities }) {

    const viewActivities = (activityId) => {
        router.get(route('activities.show', activityId), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <SiteLayout>
            <div className="relative">
                <div className="absolute inset-400 left-20 top-20 overflow-hidden">
                    <GreenBlob1 />

                </div>

                <div className="relative flex flex-row  z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <Head title={"Activiteiten"} />
                    <p>Hieronder staan de activiteiten.</p>
                    <div className={'search flex flex-row mt-4'}>
                        <input
                            type="text"
                            placeholder="Zoek naar activiteiten..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                        <button className="bg-[#9B77C7] text-white rounded-lg px-4 py-2 mt-2">
                            Zoek
                        </button>
                    </div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-centert">
                        {activities.map((activity) => (

                                <div key={activity.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-gray-900">
                                        <div className={''}>
                                            <img
                                                src={activity.featured_image ? `/storage/${activity.featured_image}` : '/Assets/Placeholders/placeholderImage.webp'}
                                                alt={activity.name} className="w-full h-48 object-cover rounded-lg"/>
                                            <h2 className="text-lg font-bold my-4">{activity.name}</h2>
                                            <p>{activity.description}</p>
                                        </div>


                                        <div>
                                            <h4 className={'text-md font-semibold mt-4'}>Details</h4>
                                            <p className="text-sm text-gray-500 mt-2">Datum: {activity.start}</p>
                                            <p className="text-sm text-gray-500 mt-2">Locatie: {activity.location}</p>
                                            <p className="text-sm text-gray-500 mt-2">Prijs: {activity.price === 0 ? 'Gratis' : `${activity.price} €`}</p>
                                        </div>
                                        <div className="flex space-x-4 mt-4">
                                            <PrimaryButton onClick={() => viewActivities(activity.id)}>
                                                Bekijk Activiteit
                                            </PrimaryButton>
                                            <SecondaryButton>
                                                Deel Activiteit
                                            </SecondaryButton>
                                        </div>
                                    </div>
                                </div>




                        ))}
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
