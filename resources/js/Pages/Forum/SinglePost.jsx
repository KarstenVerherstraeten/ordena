import {Head, router, usePage, Link} from '@inertiajs/react';
import { useState } from 'react';



export default function SinglePost() {
    const { post } = usePage().props;
    const [comment, setComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        router.post(route('posts.comment', post.id), { comment }, {
            preserveScroll: true,
            preserveState: true,
        });
        setComment('');
    };

    return (


        <div>
            <Head title={post.title} />
            <nav className="flex py-4 px-6 text-gray-600 bg-gray-100 rounded-lg">
                <Link href={route('forum')} className="hover:text-gray-900">Forum</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{post.title}</span>
            </nav>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-gray-700">{post.content}</p>
                <p className="mt-2 text-sm text-gray-500">Geplaatst
                    door: {post.user.name} op {new Date(post.created_at).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}</p>
            </div>
        </div>
    );
}
