import {Head, Link} from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import BackToTop from "@/Components/BackToTop.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";

export default function ActivitiesShow({activity, organiser}) {
    // Maak een lijst met unieke afbeeldingen: eerst featured_image (als die bestaat), daarna andere
    const allImages = [
        ...(activity.featured_image ? [{
            id: 'featured',
            image_path: activity.featured_image
        }] : []),
        ...activity.images.filter(img => img.image_path !== activity.featured_image)
    ];

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'Activiteiten', href: route('activities')},
                {name: activity.title}
            ]}
        >
            <Head title="Activiteit"/>
            <div className={"relative"}>
                <div className="absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[15vh] md:left-[20vw]">
                    <GreenBlob1 />
                </div>

                {/* Blob 2 */}
                <div className="absolute w-[250px] h-[250px] top-[50vh] left-[5vw] md:left-[5vw]">
                    <GreenBlob2 />
                </div>

                {/* Blob 3 */}
                <div className="absolute w-[180px] h-[180px] top-[30vh] left-[65vw] md:top-[35vh] md:left-[60vw]">
                    <PurpleBlob1 />
                </div>




                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 relative z-10">
                    {/* Linkerkolom - 2/3 breed */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold text-gray-800">{activity.title}</h2>
                        <p className="mt-4 text-gray-600 whitespace-pre-line">{activity.description}</p>

                        <h3 className="text-lg font-semibold text-gray-800 mt-4">Details:</h3>
                        <p className="text-sm text-gray-600 mt-2">📅 Start: {activity.start}</p>
                        <p className="text-sm text-gray-600 mt-1">📍 Einde: {activity.end}</p>
                        <p className="text-sm text-gray-600 mt-2">⏳
                            Duur: {Math.ceil((new Date(activity.end) - new Date(activity.start)) / (1000 * 60 * 60 * 24))} dagen</p>
                        <p className="text-sm text-gray-600 mt-1">📍 Locatie: {activity.location}</p>
                        <p className="text-sm text-gray-600 mt-1">💶
                            Prijs: {activity.price === 0 ? 'Gratis' : `${activity.price} €`}</p>

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

                    {/* Rechterkolom - organisator info */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="text-lg font-semibold text-gray-800">Gegevens organisator:</h4>

                        {organiser.organisation ? (
                            <>
                                <p className="text-sm text-gray-600 mt-2">👤
                                    Organisatie: {organiser.organisation.organisation_name}</p>
                                <p className="text-sm text-gray-600 mt-1">📍
                                    Adres: {organiser.organisation.organisation_address}</p>
                                <p className="text-sm text-gray-600 mt-1">📧 Email: {organiser.organisation.email}</p>
                                <p className="text-sm text-gray-600 mt-1">📞 Telefoon: {organiser.organisation.phone_number}</p>
                                <p className={"text-sm text-gray-600 mt-1"}> BTW-nummer: {organiser.organisation.btw_number}</p>
                                <div className="mt-6 flex flex-col gap-2 justify-center items-start">
                                    {organiser.organisation.website && (
                                        <PrimaryButton
                                            onClick={() => window.open(organiser.organisation.website, '_blank')}>
                                            Website organisatie
                                        </PrimaryButton>
                                    )}
                                    <SecondaryButton
                                        onClick={() => window.open(route('organisatie.show', organiser.organisation.id), '_blank')}>
                                        Bekijk organisatie
                                    </SecondaryButton>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-gray-600 mt-2">👤 Naam: {organiser.user.name}</p>
                                {organiser.email &&
                                    <p className="text-sm text-gray-600 mt-1">📧 Email: {organiser.email}</p>}
                            </>
                        )}
                    </div>
                </div>

                {/* Afbeeldingengalerij */}
                {allImages.length > 0 && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow w-full relative z-10">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700"
                                 viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 4h16v16H4z" fill="none"/>
                                <path
                                    d="M20 20H4V4h16v16zM4 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm5.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3.5 9 3.5-4.5 2.5 3 3.5-4.5 4 6H6z"/>
                            </svg>
                            Afbeeldingen (scroll door)
                        </h4>

                        <Slider
                            dots={true}
                            infinite={true}
                            centerMode={true}
                            centerPadding="60px"
                            speed={500}
                            slidesToShow={allImages.length >= 3 ? 3 : allImages.length}
                            arrows={true}
                            className="w-full"
                            autoplay={true}
                            autoplaySpeed={3000}
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1,
                                        centerPadding: "40px",
                                        infinite: true,
                                        dots: true
                                    }
                                },
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        centerPadding: "20px",
                                        centerMode: false
                                    }
                                },
                            ]}
                        >
                            {allImages.map((image) => (
                                <div key={image.id} className="px-2">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={activity.name}
                                            className="w-full h-[400px] object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}
            </div>
            <BackToTop/>
            <ToastContainer/>
        </SiteLayout>
    );
}
