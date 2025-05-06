import {Head, Link, useForm} from '@inertiajs/react';


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
        <>
            <Head title={"Create Post"}
                description={"Create Post"}
                metaDescription={"Create Post"}
                metaTitle={"Create Post"}
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
                <h1>Create Post</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        {errors.title && <div>{errors.title}</div>}
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                        />
                        {errors.content && <div>{errors.content}</div>}
                    </div>
                    <div>
                        <button type="submit" disabled={processing}>
                            Create Post
                        </button>
                    </div>
                </form>
            </main>

            <footer>
                <p>Laravel Version: {laravelVersion}</p>
                <p>PHP Version: {phpVersion}</p>
            </footer>
        </>
    );
}
