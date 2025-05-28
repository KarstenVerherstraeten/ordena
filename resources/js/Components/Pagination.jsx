export default function Pagination({ links }) {
    return (
        <nav className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <span className="text-sm text-gray-700">Page 1 of {links.length}</span>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <span className="text-sm text-gray-700">Page 1 of {links.length}</span>
                </div>
                <div>
                    <ul className="inline-flex -space-x-px">
                        {links.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    className={`px-3 py-2 border border-gray-300 text-sm font-medium ${link.active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
