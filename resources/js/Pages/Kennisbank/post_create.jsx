import {Head, Link, useForm} from '@inertiajs/react';
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Footer from "@/Components/Footer.jsx";
import React from "react";


export default function Post_Create({ auth, laravelVersion, phpVersion }) {

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('forum.store'));
    }
    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'Kennisbank', href: route('forum')},
                {name: 'Bericht plaatsen'}
            ]}
        >
            <Head title={"Bericht plaatsen"}
              />

            <div
                className="hidden md:block md:absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[20vh] md:left-[-15vw]">
                <GreenBlob1/>
            </div>



            <div
                className="hidden md:block md:absolute w-[366px] h-[400px] top-[30vh] left-[65vw] md:top-[50vh] md:left-[8vw] lg:top-[4vh] lg:left-[60vw]">
                <PurpleBlob1/>
            </div>
            <div className="relative">
                <div className="max-w-2xl mx-auto mt-12 p-6 py-12 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Nieuw Bericht Plaatsen</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titel</label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Inhoud</label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows="5"
                                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.content ? 'border-red-500' : ''}`}
                            ></textarea>
                            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                        </div>
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Plaats Bericht
                        </PrimaryButton>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        </SiteLayout>
    );
}
