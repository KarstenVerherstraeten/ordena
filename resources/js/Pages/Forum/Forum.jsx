import {Head, Link, router} from '@inertiajs/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import BackToTop from "@/Components/BackToTop.jsx";

export default function Forum({posts, auth, laravelVersion, phpVersion}) {

    const handleUpvote = (postId) => {
        router.post(route('posts.upvote', postId), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const viewPost = (postId) => {
        router.get(route('posts.show', postId), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'Kennisbank', href: route('forum')},
            ]}
        >
            <Head title="Kennisbank"/>
            <div className="relative">
                <div className="absolute w-[200px] h-[200px] top-[10vh] left-[10vw] md:top-[5vh] md:left-[-15vw]">
                    <GreenBlob1/>
                </div>

                {/* Blob 2 */}
                <div className="absolute w-[250px] h-[250px] top-[50vh] left-[5vw] md:left-[5vw]">
                    <GreenBlob2/>
                </div>

                {/* Blob 3 */}
                <div className="absolute w-[366px] h-[400px] top-[30vh] left-[65vw] md:top-[4vh] md:left-[60vw]">
                    <PurpleBlob1/>
                </div>
                <div className="max-w-7xl mx-auto py-12">
                    <h1 className=" hidden  font-bold mb-6">Kennisbank</h1>
                    <div className="grid grid-cols-1 gap-6">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-white shadow-md z-10 rounded-lg p-6 flex">
                                <div className="flex-1">
                                    <div className={"flex items-center gap-6 mb-4 align-center"}>
                                        <h2 className="text-xl font-semibold mb-2 cursor-pointer"
                                            onClick={() => viewPost(post.id)}>
                                            {post.title}
                                        </h2>
                                        {post.user && post.user.badge_icon && (
                                            <img src={post.user.badge_icon} alt="Badge" style={{height: '20px'}}/>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => handleUpvote(post.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Upvote ({post.upvotes})
                                        </button>

                                        <span className="text-gray-500 text-sm">
                                        Geplaatst door: {post.user ? post.user.name : 'Onbekend'} op{' '}
                                            {new Date(post.created_at).toLocaleDateString('nl-NL', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                    </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => viewPost(post.id)}
                                    className="bg-[#9B77C7] hover:bg-[#8B67B7] text-white px-6 justify-center   rounded w-12 ml-6 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                </button>
                            </div>
                        ))}
                    </div>
                    {posts.length === 0 && (
                        <p className="text-gray-500 z-10 mt-6">Er zijn momenteel geen posts beschikbaar.</p>
                    )}
                </div>


                <PrimaryButton
                    onClick={() => router.get(route('forum.create'))}
                    className="fixed bottom-6 right-6 z-50 shadow-xl shadow-purple-300/50 bg-[#9B77C7] hover:bg-[#8B67B7]
             text-white font-semibold p-4 md:py-4 md:px-6 rounded-full
             flex items-center justify-center gap-2 transition-all duration-300 ease-in-out
             active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#9B77C7] focus:ring-offset-2"
                >
                    <span className="hidden md:inline">Maak een post</span>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </PrimaryButton>

            </div>


        </SiteLayout>

    )
}
