import {Head, router} from "@inertiajs/react";
import {useState} from "react";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal.jsx";

export default function OrganisationIndex({organisation, organisatorUsers}) {

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

    const removeUser = (userId) => {
        router.delete(route('organisations.users.remove', {
            organisation: organisation.id,
            user: userId,
        }));
    };

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'dashboard', href: route('dashboard')},
                {name: `Organisatie | ${organisation.organisation_name}`}
            ]}
        >
            <Head title="Organisatie"/>

            <div className="relative">
                <div className="absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[15vh] md:left-[20vw]">
                    <GreenBlob1/>
                </div>

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
                                            {user.name} ({user.email})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">Er zijn nog geen gebruikers gekoppeld aan deze
                                    organisatie.</p>
                            )}
                            <div>
                                <PrimaryButton onClick={() => setShowModal(true)}>
                                    Beheer leden
                                </PrimaryButton>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-medium mb-2">Beschrijving</h2>
                            <p>{organisation.description}</p>
                        </div>
                    </div>
                </div>
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
