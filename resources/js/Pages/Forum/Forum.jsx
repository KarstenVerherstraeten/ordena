import {Head, Link, router} from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
export default function Forum({ posts, auth, laravelVersion, phpVersion }) {

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
        <>
            <Head title={"Forum"}
                description={"Forum"}
                metaDescription={"Forum"}
                metaTitle={"Forum"}
                metaImage={"https://laravel.com/img/laravel-logo.png"}
                metaUrl={"https://laravel.com/docs/10.x"}
                metaType={"website"}
              />
            <header>
                <nav className="-mx-3 flex flex-1 justify-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                            href={route('forum')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Forum
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main>
                <h1>Forum</h1>

                <ul>
                    {posts.map((post) => (
                        <div className={"post"}>
                            <li key={post.id}>
                                <div className={'post-info'}>
                                    <h2>{post.title}</h2>
                                    {post.user && post.user.badge_icon && (
                                        <img src={post.user.badge_icon} alt="Badge" style={{height: '20px'}} />
                                    )}
                                </div>
                                <p>{post.content.split(' ').slice(0, 20).join(' ')}...</p>
                                <div className="upvotes">
                                    <span className="upvote-count">{post.upvotes}</span>
                                    <button onClick={() => handleUpvote(post.id)}>Upvote</button>
                                </div>
                                <div>
                                    <button onClick={() => viewPost(post.id)}>Bekijk</button>
                                </div>
                            </li>
                        </div>

                    ))}
                </ul>

                <Link
                    href={route('forum.create')}
                    className={"Button"}
                >
                    Maak een post <FontAwesomeIcon icon={faPaperPlane} />
                </Link>
            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                Laravel v{laravelVersion} (PHP v{phpVersion})
            </footer>
        </>



    )
}
