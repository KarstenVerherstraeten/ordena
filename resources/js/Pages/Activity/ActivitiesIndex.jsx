import {Head, Link, router} from "@inertiajs/react";
import {useEffect, useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import React from "react";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToTop from "@/Components/BackToTop.jsx";
import Footer from "@/Components/Footer.jsx";
import Pagination from "@/Components/Pagination.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";

export default function ActivitiesIndex({activities: initialActivities,}) {
    const [activities, setActivities] = React.useState(initialActivities);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortField, setSortField] = React.useState('created_at');
    const [sortOrder, setSortOrder] = React.useState('desc');
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(initialActivities.current_page);

    const viewActivities = (activityId) => {
        router.get(route('activities.show', activityId), {}, {
            preserveScroll: false,
            preserveState: true,
        });
    }

    const fetchActivities = async (page) => {
        setLoading(true);
        const params = {
            search: searchTerm || undefined,
            sort: sortField || undefined,
            sortOrder: sortOrder || undefined,
            page: page,
        };

        try {
            await router.get(route('activities'), params, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (response) => {
                    setActivities(response.props.activities);
                    setCurrentPage(response.props.activities.current_page);
                },
            });
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchActivities(page);
    };

    const [prevFilters, setPrevFilters] = React.useState({
        searchTerm,
        sortField,
        sortOrder,
    });

    useEffect(() => {
        if (JSON.stringify(prevFilters) !== JSON.stringify({searchTerm, sortField, sortOrder})) {
            setCurrentPage(1);
            fetchActivities(1);
            setPrevFilters({searchTerm, sortField, sortOrder});
        }
    }, [searchTerm, sortField, sortOrder]);

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'Activiteiten'}
            ]}
        >
            <div
                className="hidden md:block md:absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[20vh] md:left-[-15vw]">
                <GreenBlob1/>
            </div>

            <div className="hidden md:block md:absolute w-[250px] h-[250px] top-[70vh] left-[5vw] md:left-[5vw]">
                <GreenBlob2/>
            </div>


            <div
                className="hidden md:block md:absolute w-[366px] h-[400px] top-[30vh] left-[65vw] md:top-[150vh] md:left-[2vw] lg:top-[4vh] lg:left-[60vw]">
                <PurpleBlob1/>
            </div>
            <div className="relative">


                <div className="relative flex flex-row z-10 max-w-7xl  py-12">
                    <Head title={"Activiteiten"}/>

                    <div className={"flex flex-col md:flex-row justify-center items-center  md:w-full"}>
                        <div className={"md:w-1/2 flex flex-col justify-center items-center"}>
                            <p>Een passende activiteit vinden voor iemand met autisme is niet altijd eenvoudig. Bij
                                Ordena
                                maken we die zoektocht graag wat gemakkelijker. Op deze pagina vind je een selectie van
                                activiteiten die mogelijk goed aansluiten bij de behoeften van jouw kind.<br/>
                                <strong>En onthoud: niet elk kind heeft dit soort activiteiten nodig. Een druk feestje
                                    mag
                                    natuurlijk ook gewoon leuk zijn!</strong>
                            </p>
                        </div>

                        <div className="flex md:w-1/2 w-full flex-col md:flex-row justify-center md:justify-end mb-4">
                            <div
                                className="w-full md:w-[500px] lg:w-[600px] mt-6 md:mt-0 mb-6 z-10 justify-end bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Zoeken naar activiteiten..."
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                                    />
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <select
                                        value={sortField}
                                        onChange={(e) => setSortField(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors cursor-pointer"
                                    >
                                        <option value="price_asc">Laagste prijs</option>
                                        <option value="price_desc">Hoogste prijs</option>
                                        <option value="date_desc">Recentste eerst</option>
                                        <option value="date_asc">Laatste eerst</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto max-w-7xl py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-centert">
                        {loading ? (
                            <div>Loading...</div>
                        ) : activities.data.length === 0 ? (
                            <div
                                className="bg-white w-full shadow-md z-10 rounded-lg p-6 text-center text-gray-600 col-span-3">
                                Geen activiteiten gevonden
                            </div>
                        ) : (
                            activities.data.map((activity) => (
                                <div key={activity.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-gray-900 h-full flex flex-col">
                                        <div className={''}>
                                            <img
                                                src={activity.featured_image ? `/storage/${activity.featured_image}` : '/Assets/Placeholders/placeholderImage.webp'}
                                                alt={activity.name} className="w-full h-48 object-cover rounded-lg"/>
                                            <h2 className="text-lg font-bold my-4">{activity.title}</h2>
                                            <p className={"mb-2.5"}>{activity.description.length > 100 ? `${activity.description.substring(0,100)}...` : activity.description}</p>
                                        </div>

                                        <div className="mt-auto">
                                            <h4 className={'text-md font-semibold mt-4'}>Details</h4>
                                            <p className="text-sm text-gray-500 mt-2">Datum: {activity.start}</p>
                                            <p className="text-sm text-gray-500 mt-2">Locatie: {activity.location}</p>
                                            <p className="text-sm text-gray-500 mt-2">Prijs: {activity.price === 0 ? 'Gratis' : `${activity.price} €`}</p>
                                        </div>
                                        <div className="flex space-x-4 mt-4">
                                            <PrimaryButton onClick={() => viewActivities(activity.id)}>
                                                Bekijk Activiteit
                                            </PrimaryButton>
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
                            ))
                        )}
                    </div>
                </div>
                <div className={"flex flex-row justify-center items-center lg:justify-end gap-4 mb-12"}>
                    {(activities.data.length === 12 || activities.current_page > 1) && activities.links && (
                        <Pagination links={activities.links} onPageChange={handlePageChange}/>)}
                </div>
                <BackToTop></BackToTop>
                <ToastContainer/>
                <Footer></Footer>
            </div>
        </SiteLayout>
    );
}
