import { router } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex space-x-2 mt-6">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    className={`px-3 py-1 border rounded ${link.active ? 'bg-purple-500 text-white' : 'bg-white'}`}
                    onClick={() => link.url && router.visit(link.url, { preserveScroll: false })}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
