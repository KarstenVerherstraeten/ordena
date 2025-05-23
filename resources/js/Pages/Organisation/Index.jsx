import {Head} from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";

export default function OrganisationIndex({organisation}) {
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
                                            {/* Later: Add a remove button here */}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">Er zijn nog geen gebruikers gekoppeld aan deze organisatie.</p>
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-medium mb-2">Beschrijving</h2>
                            <p>{organisation.description}</p>
                        </div>
                    </div>
                </div>
            </div>

        </SiteLayout>
    );
}
