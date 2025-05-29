import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";

export default function RoleRequest() {
    const { auth } = usePage().props;
    const [showRoleForm, setShowRoleForm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        role: '',
        image: null, // not website/school/adres for now
    });


    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Role Request</h2>}
        >
            <Head title="Role Request" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                post(route('dashboard.rolerequest.store'), {
                                    forceFormData: true,
                                });
                            }}
                        >
                            <p className="mb-4">Vraag hier je rol aan, de inzending zal gecontroleerd worden door een van onze administrators!</p>

                            <div>

                                <p>Zorg ervoor dat alle gegevens goed leesbaar zijn</p>
                                <p>Zorg dat de foto voldoende belicht is</p>

                            </div>
                            <select
                                className="mt-1 block w-full"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            >
                                <option value="">-- Kies een rol --</option>
                                <option value="Psycholoog">Psycholoog</option>
                                <option value="Leerkracht">Leerkracht</option>
                                <option value="Ouder">Ouder</option>
                                <option value="Organisator">Organisator</option>
                                <option value="GebruikerASS">Gebruiker met ASS</option>
                            </select>

                            <label className="block mb-2 mt-4">Upload document (Certificaat, leerkrachtenkaart, inschrijvingsbewijs...):</label>
                            <input
                                type="file"
                                className="block w-full mb-4"
                                onChange={(e) => setData('image', e.target.files[0])}
                            />

                            <button
                                type="button"
                                onClick={() => setShowRoleForm(!showRoleForm)}
                                className="mt-2 mb-4 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
                            >
                                {showRoleForm ? 'Formulier verbergen' : 'Of vul een formulier in'}
                            </button>

                            {showRoleForm && data.role && (
                                <>
                                    {data.role === 'Psycholoog' && (
                                        <>
                                            <label className="block">Website van je praktijk:</label>
                                            <input
                                                type="text"
                                                value={data.website || ''}
                                                onChange={(e) => setData('website', e.target.value)}
                                                className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                                                required
                                            />

                                            <label className="block">Adres van je praktijk:</label>
                                            <input
                                                type="text"
                                                value={data.adres || ''}
                                                onChange={(e) => setData('adres', e.target.value)}
                                                className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                                                required
                                            />
                                        </>
                                    )}

                                    {data.role === 'Leerkracht' && (
                                        <>
                                            <label className="block">School waar je lesgeeft:</label>
                                            <input
                                                type="text"
                                                placeholder={'Naam van de school'}
                                                value={data.school || ''}
                                                onChange={(e) => setData('school', e.target.value)}
                                                className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                                                required
                                            />

                                            <label className="block">Website van je school:</label>
                                            <input
                                                type="text"
                                                placeholder={'Website van de school'}
                                                value={data.school || ''}
                                                onChange={(e) => setData('school', e.target.value)}
                                                className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                                                required
                                            />

                                        </>
                                    )}

                                    {data.role === 'Ouder' && (
                                        <>
                                            <label className="block">Naam van je kind:</label>
                                            <input
                                                type="text"
                                                placeholder={'Naam van je kind'}
                                                value={data.kind || ''}
                                                onChange={(e) => setData('kind', e.target.value)}
                                                className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                                                required
                                            />
                                        </>
                                    )}

                                    {data.role === 'Organisator' && (
                                        <>
                                            <label className="block">Website van je organisatie:</label>
                                            <input
                                                type="text"
                                                placeholder={'Website van de organisatie'}
                                                value={data.organisatie || ''}
                                                onChange={(e) => setData('organisatie', e.target.value)}
                                                className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                                                required
                                            />
                                        </>
                                    )}

                                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={processing}>
                                        Verzenden
                                    </button>
                                </>
                            )}

                            {/* Only show this for users who DON'T open the full form */}
                            {!showRoleForm && data.role && (
                                <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded" disabled={processing}>
                                    Enkel document versturen
                                </button>
                            )}
                        </form>
                    </div>


                </div>
            </div>
            <Footer></Footer>
        </AuthenticatedLayout>
    );
}
