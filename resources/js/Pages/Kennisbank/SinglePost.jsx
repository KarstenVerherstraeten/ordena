import {Head, router, usePage, Link} from '@inertiajs/react';
import React, {useState} from 'react';
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {toast, ToastContainer} from "react-toastify";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";
import Footer from "@/Components/Footer.jsx";

export default function SinglePost() {
    const {post} = usePage().props;
    const [comment, setComment] = useState('');

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'Kennisbank', href: route('forum')},
                {name: post.title}
            ]}
        >
            <Head title={post.title}/>

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
                <div className="flex flex-col md:flex-row gap-6 py-12 px-4 md:px-6">
                    <div className="hidden md:block flex-1 bg-white rounded-lg shadow-sm p-4 md:p-6">
                        <h1 className="text-xl md:text-2xl font-bold mb-4">{post.title}</h1>
                        <div className="prose max-w-none text-sm md:text-base">
                            {post.content}
                        </div>
                    </div>

                    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 md:p-6 mt-4 md:mt-0">
                        <h3 className="text-lg font-medium mb-2">Geplaatst door:</h3>
                        {post.user && post.user.badge_icon && (
                            <img src={post.user.badge_icon} alt="Badge" className="h-5 mb-2"/>
                        )}
                        <div className="text-base md:text-lg font-medium mb-1">
                            <p>naam: {post.user.name}</p>
                        </div>
                        <div className="text-gray-500 text-xs md:text-sm mb-4">
                            <p>geplaatst op: {new Date(post.created_at).toLocaleDateString()}</p>
                        </div>

                        <SecondaryButton
                            className="w-full md:w-auto text-sm"
                            onClick={() => {
                                navigator.clipboard.writeText(route('posts.show', post.id));
                                toast.success('Link gekopieerd!', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                });
                            }}>
                            Deel post
                        </SecondaryButton>
                    </div>
                    <div className="block md:hidden flex-1 bg-white rounded-lg shadow-sm p-4 md:p-6">
                        <h1 className="text-xl md:text-2xl font-bold mb-4">{post.title}</h1>
                        <div className="prose max-w-none text-sm md:text-base">
                            {post.content}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
            <ToastContainer></ToastContainer>
        </SiteLayout>
    );
}
