import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage, useForm} from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function RoleRequest() {
    const {auth} = usePage().props;
    const [showRoleForm, setShowRoleForm] = useState(false);
    const [fileError, setFileError] = useState('');

    const {data, setData, post, processing, errors} = useForm({
        role: '',
        image: null, // not website/school/adres for now
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                setFileError('Alleen JPG, PNG en PDF bestanden zijn toegestaan');
                setData('image', null);
                e.target.value = '';
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setFileError('Bestand mag niet groter zijn dan 5MB');
                setData('image', null);
                e.target.value = '';
                return;
            }

            setFileError('');
            setData('image', file);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Role Request</h2>}
        >
            <Head title="Role Request"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!data.image) {
                                    setFileError('Een document uploaden is verplicht');
                                    return;
                                }
                                post(route('dashboard.rolerequest.store'), {
                                    forceFormData: true,
                                });
                            }}
                        >
                            <p className="mb-4">Vraag hier je rol aan, de inzending zal gecontroleerd worden door een
                                van onze administrators!</p>


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

                            <label className="block mb-2 mt-4">Upload document (Certificaat, leerkrachtenkaart,
                                inschrijvingsbewijs...):</label>
                            <div>
                                <ul className="list-disc list-inside mb-4">
                                    <li>Zorg ervoor dat alle gegevens goed leesbaar zijn</li>
                                    <li>Zorg dat de foto voldoende belicht is</li>
                                    <li>Zorg dat het hele document in beeld is</li>
                                    <li>Gebruik een neutrale achtergrond</li>
                                    <li>Voorkom reflecties of schaduwen op het document</li>
                                    <li>Controleer of de foto scherp is</li>
                                </ul>
                            </div>

                            <input
                                type="file"
                                className="block w-full mb-4"
                                onChange={handleFileChange}
                                accept=".jpg,.jpeg,.png,.pdf"
                            />
                            {fileError && (
                                <p className="text-red-500 mb-4">{fileError}</p>
                            )}

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

                                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded"
                                            disabled={processing}>
                                        Verzenden
                                    </button>
                                </>
                            )}

                            {/* Only show this for users who DON'T open the full form */}
                            {!showRoleForm && data.role && (
                                <PrimaryButton type="submit"
                                               disabled={processing}
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   window.location.href = route('dashboard');
                                               }}>
                                    {/*Enkel */} document versturen
                                </PrimaryButton>
                            )}
                        </form>
                    </div>


                </div>
            </div>
            <Footer></Footer>
        </AuthenticatedLayout>
    );
}
