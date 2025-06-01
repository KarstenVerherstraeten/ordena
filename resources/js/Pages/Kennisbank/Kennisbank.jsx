import {Head, Link, router} from '@inertiajs/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";
import React, {useEffect} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import BackToTop from "@/Components/BackToTop.jsx";
import Footer from "@/Components/Footer.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Kennisbank({posts: initialPosts, auth, laravelVersion, phpVersion}) {
    const [posts, setPosts] = React.useState(initialPosts);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortField, setSortField] = React.useState('created_at');
    const [sortOrder, setSortOrder] = React.useState('desc');
    const [roleFilter, setRoleFilter] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(initialPosts.current_page);

    const fetchPosts = async (page = currentPage) => {
        setLoading(true);

        const params = {
            search: searchTerm || undefined,
            sortField: sortField || undefined,
            sortOrder: sortOrder || undefined,
            page: page,
            role: roleFilter || undefined,
        };

        try {
            await router.get(route('forum'), params, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                only: ['posts'],
                onSuccess: ({props}) => {
                    setPosts(props.posts);
                    setCurrentPage(props.posts.current_page);
                },
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async (postId) => {
        try {
            await router.post(route('posts.upvote', postId), {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    fetchPosts(currentPage);
                }
            });
        } catch (error) {
            console.error('Error upvoting post:', error);
        }
    };

    const viewPost = (postId) => {
        router.get(route('posts.show', postId));
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchPosts(page);
    };

    const [prevFilters, setPrevFilters] = React.useState({
        searchTerm,
        sortField,
        sortOrder,
        roleFilter
    });

    useEffect(() => {
        if (JSON.stringify(prevFilters) !== JSON.stringify({searchTerm, sortField, sortOrder, roleFilter})) {
            setCurrentPage(1);
            fetchPosts(1);
            setPrevFilters({searchTerm, sortField, sortOrder, roleFilter});
        }
    }, [searchTerm, sortField, sortOrder, roleFilter]);

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'Kennisbank'},
            ]}
        >
            <Head title="Kennisbank"/>
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
                <div className="max-w-7xl mx-auto py-12">
                    <h1 className="hidden font-bold mb-6">Kennisbank</h1>

                    <div className="relative flex flex-row z-10 max-w-7xl  py-12">
                        <Head title={"Activiteiten"}/>

                        <div className={"flex flex-col md:flex-row justify-center items-center  md:w-full"}>
                            <div className={"md:w-1/2 flex flex-col justify-center items-center"}>
                                <p>Betrouwbare informatie over autisme vinden is niet altijd eenvoudig. Bij Ordena bouwen we daarom aan een kennisbank die overzichtelijk, praktisch en vooral menselijk is. De inhoud wordt samengesteld door mensen die dicht bij de leefwereld van kinderen met autisme staan: leerkrachten, ouders, psychologen en andere betrokkenen delen hier hun kennis en ervaringen.<br/>
                                    <strong>En onthoud: deze kennisbank is er voor iedereen die meer wil begrijpen, of je nu ouder, hulpverlener, leerkracht bent, of gewoon oprecht geïnteresseerd.</strong>
                                </p>

                            </div>

                            <div className="flex md:w-1/2 w-full flex-col md:flex-row justify-center md:justify-end mb-4">
                                <div
                                    className="w-full md:w-[500px] lg:w-[600px] mt-6 md:mt-0 mb-6 z-10 justify-end bg-white p-6 rounded-lg shadow-lg">
                                    <div className="flex flex-col gap-4">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Zoeken naar activiteiten..."
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                                        />
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <select
                                            value={`${sortField}-${sortOrder}`}
                                            onChange={(e) => {
                                                const [field, order] = e.target.value.split('-');
                                                setSortField(field);
                                                setSortOrder(order);
                                            }}
                                            className="w-full rounded border-gray-300"
                                        >
                                            <option value="created_at-desc">Nieuwste datum</option>
                                            <option value="created_at-asc">Oudste datum</option>
                                            <option value="upvotes-desc">Meeste upvotes</option>
                                            <option value="upvotes-asc">Minste upvotes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 z-10 gap-6">
                        <div className="col-span-1">
                            <div className="bg-white shadow-md rounded-lg p-4 w-full">
                                <h3 className="font-semibold mb-4">Geplaatst door:</h3>
                                <div className="flex flex-row flex-wrap justify-around lg:flex-col gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="roleFilter"
                                            checked={roleFilter === 'Leerkracht'}
                                            onChange={() => setRoleFilter(roleFilter === 'Leerkracht' ? '' : 'Leerkracht')}
                                        />
                                        <img src="/badges/Icon-Leerkracht.png" alt="Badge" style={{height: '25px'}}/>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="roleFilter"
                                            checked={roleFilter === 'psycholoog'}
                                            onChange={() => setRoleFilter(roleFilter === 'psycholoog' ? '' : 'psycholoog')}
                                        />
                                        <img src="/badges/Icon-Psycholoog.png" alt="Badge" style={{height: '25px'}}/>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="roleFilter"
                                            checked={roleFilter === 'Ouder'}
                                            onChange={() => setRoleFilter(roleFilter === 'Ouder' ? '' : 'Ouder')}
                                        />
                                        <img src="/badges/Icon-Ouder.png" alt="Badge" style={{height: '25px'}}/>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="roleFilter"
                                            checked={roleFilter === 'GebruikerASS'}
                                            onChange={() => setRoleFilter(roleFilter === 'GebruikerASS' ? '' : 'GebruikerASS')}
                                        />
                                        <img src="/badges/Icon-gebruikerASS.png" alt="Badge" style={{height: '37px'}}/>
                                    </label>
                                </div>
                                {(searchTerm || sortField !== 'created_at' || sortOrder !== 'desc' || roleFilter) && (
                                    <PrimaryButton
                                        className={"mt-12 w-full"}
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSortField('created_at');
                                            setSortOrder('desc');
                                            setRoleFilter('');
                                        }}
                                    >
                                        Reset filters
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-3">
                            {loading ? (
                                <div>Loading...</div>
                            ) : posts.data.length === 0 ? (
                                <div className="bg-white shadow-md z-10 rounded-lg p-6 text-center text-gray-600">
                                    Geen berichten gevonden
                                </div>
                            ) : (
                                posts.data.map((post) => (
                                    <div key={post.id}
                                         className="bg-white shadow-md z-10 rounded-lg p-6 flex flex-col md:flex-row gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className={"flex items-center gap-6 mb-4 align-center"}>
                                                <h2 className="text-xl font-semibold cursor-pointer"
                                                    onClick={() => viewPost(post.id)}>
                                                    {post.title}
                                                </h2>
                                                {post.user && post.user.badge_icon && (
                                                    <img src={post.user.badge_icon} alt="Badge"
                                                         style={{height: '20px'}}/>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-4">{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>
                                            <div
                                                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                                <button
                                                    onClick={() => handleUpvote(post.id)}
                                                    className="text-gray-600 hover:text-gray-800 flex flex-row items-center"
                                                >
                                                    <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24"
                                                         fill="currentColor">
                                                        <path
                                                            d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"/>
                                                    </svg>
                                                    {post.upvotes}
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
                                            className="w-full md:w-12 bg-[#9B77C7] hover:bg-[#8B67B7] text-white px-6 justify-center rounded flex items-center"
                                        >
                                            <FontAwesomeIcon icon={faChevronUp}  className="hidden rotate-90 md:inline"/> <span
                                            className="md:hidden">Lees meer</span>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className={"flex flex-row justify-center items-center lg:justify-end gap-4 mb-12"}>
                {(posts.data.length === 10 || posts.current_page > 1) && posts.links && (
                    <Pagination links={posts.links} onPageChange={handlePageChange}/>)}
                </div>

                <PrimaryButton
                    onClick={() => router.get(route('forum.create'))}
                    className="fixed bottom-6 right-6 z-50 shadow-xl md:shadow-purple-300/50 shadow-black/25 bg-[#9B77C7] hover:bg-[#8B67B7]
                     text-white font-semibold p-4 md:py-4 md:px-6 rounded-full
                     flex items-center justify-center gap-2 transition-all duration-300 ease-in-out
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#9B77C7] focus:ring-offset-2
                     mobile:drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                >
                    <span className="hidden md:inline">Maak een post</span>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </PrimaryButton>
                <Footer></Footer>
            </div>


        </SiteLayout>
    )
}
