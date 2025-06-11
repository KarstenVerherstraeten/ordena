import {Head, router} from "@inertiajs/react";
import {useState} from "react";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import Footer from "@/Components/Footer.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {toast} from "react-toastify";

export default function OrganisationIndex({ organisation, organisatorUsers, authUserId, activities }) {
    const [showModal, setShowModal] = useState(false);
    const [userIdToAdd, setUserIdToAdd] = useState('');
    const [search, setSearch] = useState('');

    const filteredUsers = organisatorUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const addUser = (userId) => {
        router.post(route('organisations.users.add', organisation.id), {
            user_id: userId,
        }, {
            preserveScroll: true,
        });
    };

    const makeActivity = () => {
        router.get(route('activities.create'), {}, {
            preserveScroll: false,
            preserveState: true,
        });
    }

    const removeUser = (userId) => {
        router.delete(route('organisations.users.remove', {
            organisation: organisation.id,
            user: userId,
        }));
    };

    const makeOwner = (userId) => {
        router.put(route('organisations.users.update', {
            organisation: organisation.id,
            user: userId,
        }), {}, {
            preserveScroll: true,
        });
    }

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'dashboard', href: route('dashboard')},
                {name: `Organisatie | ${organisation.organisation_name}`}
            ]}
        >
            <Head title={`Organisatie | ${organisation.organisation_name}`}/>

            <div className="absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[15vh] md:left-[20vw]">
                <GreenBlob1/>
            </div>

            <div className="relative">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 relative z-10">
                    <h1 className="text-2xl font-semibold mb-6">{organisation.organisation_name}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-medium mb-2">Details</h2>
                            <p><strong>Adres:</strong> {organisation.organisation_address}</p>
                            <p><strong>BTW:</strong> {organisation.btw_number}</p>
                            <p><strong>Website:</strong> <a href={organisation.website}
                                                            className="text-blue-600 hover:underline" target="_blank"
                                                            rel="noopener noreferrer">{organisation.website}</a></p>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-lg font-medium mb-2">Gebruikers in deze organisatie</h2>
                            {organisation.users.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {organisation.users.map((user) => (
                                        <li key={user.id}>

                                            {user.id === organisation.owner_id && (
                                                <span title="Eigenaar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500 inline-block ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l2.39 4.78L18 9l-4 1-1 4H7l-1-4-4-1 5.61-1.22L10 3z"/></svg>
                                                 </span>
                                            )}
                                            {user.name}
                                            ({user.email})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">Er zijn nog geen gebruikers gekoppeld aan deze
                                    organisatie.</p>
                            )}
                            <div>
                                {authUserId === organisation.owner_id && (
                                    <div>
                                        <PrimaryButton onClick={() => setShowModal(true)}>
                                            Beheer leden
                                        </PrimaryButton>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-medium mb-2">Beschrijving</h2>
                            <p>{organisation.description}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className=" sm:rounded-lg mt-6 relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Activiteiten van deze organisatie</h2>
                            <PrimaryButton onClick={() => makeActivity()}>
                                Maak Activiteit
                            </PrimaryButton>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities.length === 0 ? (
                                <div className="bg-white w-full shadow-md z-10 rounded-lg p-6 text-center text-gray-600 col-span-3">
                                    Geen activiteiten gevonden
                                </div>
                            ) : (
                                activities.map((act) => (
                                    <div key={act.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900 h-full flex flex-col">
                                            <img
                                                src={act.featured_image ? `/storage/${act.featured_image}` : '/Assets/Placeholders/placeholderImage.webp'}
                                                alt={act.title}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <h3 className="text-lg font-bold my-4">{act.title}</h3>
                                            <p className={"mb-2.5"}>
                                                {act.description.length > 100
                                                    ? `${act.description.substring(0, 100)}...`
                                                    : act.description}
                                            </p>

                                            <div className="mt-auto">
                                                <h4 className="text-md font-semibold">Details</h4>
                                                <p className="text-sm text-gray-500 mt-1">Datum: {act.start}</p>
                                                <p className="text-sm text-gray-500 mt-1">Locatie: {act.location}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Prijs: {act.price === 0 ? 'Gratis' : `${act.price} €`}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Aangemaakt door: {act.user?.name ?? 'Onbekend'}
                                                </p>
                                            </div>

                                            <div className="flex space-x-4 mt-4">
                                                <PrimaryButton onClick={() => viewActivities(act.id)}>
                                                    Bekijk Activiteit
                                                </PrimaryButton>
                                                <SecondaryButton onClick={() => {
                                                    navigator.clipboard.writeText(route('activities.show', act.id));
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
                </div>

                <Footer></Footer>
            </div>


            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Leden beheren:</h2>

                    <ul className="mb-4">
                        {organisation.users.map((user) => (
                            <li key={user.id} className="flex justify-between items-center">
                                <span>{user.name} ({user.email})</span>
                                <button
                                    onClick={() => removeUser(user.id)}
                                    className="text-red-600 text-sm"
                                >
                                    Verwijder
                                </button>


                                {user.id !== organisation.owner_id && (
                                    <button
                                    onClick={() => makeOwner(user.id)}
                                    className="text-blue-600 text-sm"
                                    >
                                        Maak eigenaar
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>

                    <h3 className="font-medium mt-4">Gebruiker toevoegen</h3>
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded my-2"
                        placeholder="Zoek organisator..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <ul>
                        {filteredUsers.map((user) => (
                            <li key={user.id} className="flex justify-between items-center">
                                <span>{user.name} ({user.email})</span>
                                <button
                                    onClick={() => addUser(user.id)}
                                    className="text-green-600 text-sm"
                                >
                                    Voeg toe
                                </button>
                            </li>
                        ))}
                    </ul>


                </div>
            </Modal>
        </SiteLayout>
    );
}
