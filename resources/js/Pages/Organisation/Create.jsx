import {Head, useForm} from "@inertiajs/react";
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        organisation_name: '',
        organisation_address: '',
        description: '',
        btw_number: '',
        image: null,
        website: ''
    });

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'dashboard', href: route('dashboard')},
                {name: 'Organisatie registreren'}
            ]}
        >
            <Head title="Organisatie registreren"/>

            <div className="relative">
                <div className="absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[15vh] md:left-[70vw]">
                    <GreenBlob1/>
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 relative z-10">
                    <h1 className="text-2xl font-semibold mb-6">Organisatie aanvragen:</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        post(route('organisatie.aanvragen.store'), {
                            forceFormData: true,
                        });
                    }}
                    >
                        <label className="block mb-2 mt-4">Naam organisatie:</label>
                        <input
                            type="text"
                            placeholder="Bezige Bijtjes"
                            value={data.organisation_name}
                            onChange={(e) => setData('organisation_name', e.target.value)}
                            className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                            required
                        />

                        <label className="block mb-2">Adres van de organisatie:</label>
                        <input
                            type="text"
                            placeholder="Honingstraat 34, 3200 Aarschot"
                            value={data.organisation_address}
                            onChange={(e) => setData('organisation_address', e.target.value)}
                            className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                            required
                        />

                        <label className="block mb-2">Beschrijving:</label>
                        <input
                            type="text"
                            placeholder="Wat doet je organisatie?"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                            required
                        />

                        <label className="block mb-2">BTW-Nummer:</label>
                        <input
                            type="text"
                            placeholder="BE0123.456.789"
                            value={data.btw_number}
                            onChange={(e) => setData('btw_number', e.target.value)}
                            className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                            required
                        />

                        <label className="block mb-2">Website organisatie:</label>
                        <input
                            type="text"
                            placeholder="https://www.organisatie.be"
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                            className="block w-full mt-1 mb-4 border rounded px-2 py-1"
                        />

                        <label className="block mb-2">Logo uploaden:</label>
                        <input
                            type="file"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="block w-full mt-1 mb-4"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Versturen
                        </button>
                    </form>
                </div>
            </div>
        </SiteLayout>
    );
}
