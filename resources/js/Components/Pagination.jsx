import {router} from '@inertiajs/react';

export default function Pagination({links}) {
    return (
        <nav className="flex justify-end items-center mt-8" role="navigation" aria-label="pagination">
            <div className="inline-flex shadow-sm rounded-full">
                {links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        className={`
                            relative inline-flex items-center px-4 py-2 text-sm font-medium
                            border transition-colors duration-200 ease-in-out
                            ${index === 0 ? 'rounded-l-full' : ''}
                            ${index === links.length - 1 ? 'rounded-r-full' : ''}
                            ${link.active
                            ? 'z-10 bg-[#9B77C7] hover:bg-[#8B67B7] border-[#9B77C7] text-white'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }
                            ${!link.url ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-900'}
                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                        `}
                        onClick={() => link.url && router.visit(link.url, {preserveScroll: false})}
                        dangerouslySetInnerHTML={{__html: link.label}}
                    />
                ))}
            </div>
        </nav>
    );
}
