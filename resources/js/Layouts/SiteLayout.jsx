import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/react';
import {useState} from 'react';

export default function SiteLayout({header, children, breadcrumbs = []}) {
    const user = usePage().props.auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="sticky top-0 z-50 bg-[F5F5F5]/30 backdrop-blur-md ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <h1 className="flex-shrink-0 font-['ApparatSemiCond'] text-[#9B77C7] text-[30px]">Ordena</h1>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation links + user dropdown aligned right */}
                        <div className="hidden sm:flex sm:items-center space-x-6">
                            <NavLink href={route('activities')} active={route().current('activities')}>
                                Activiteiten
                            </NavLink>
                            <NavLink href={route('forum')} active={route().current('forum')}>
                                Kennisbank
                            </NavLink>
                            <NavLink href={route('about')} active={route().current('about')}>
                                Over Ordena
                            </NavLink>

                            {user ? (
                                <Dropdown>
                                    <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                        >
                            {user.name}
                            <svg
                                className="-me-0.5 ms-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('dashboard')}>Mijn profiel</Dropdown.Link>
                                        <Dropdown.Link href={route('profile.edit')}>Instellingen</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-md bg-[#9B77C7] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#8B67B7] transition"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('activities')} active={route().current('activities')}>
                            Activiteiten
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('forum')} active={route().current('forum')}>
                            Kennisbank
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('about')} active={route().current('about')}>
                            Over Ordena
                            </ResponsiveNavLink>
                        {user && (
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Mijn profiel
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        {user ? (
                            <>
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </>
                        ) : (
                            <div className="px-4 py-2">
                                <ResponsiveNavLink href={route('login')}>Log in</ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {breadcrumbs.length > 0 && (
                <nav className="flex mx-auto max-w-7xl px-8 mt-4 mb-2" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        {breadcrumbs.map((crumb, index) => (
                            <li key={index} className="inline-flex items-center">
                                {index !== 0 && (
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                )}
                                {crumb.href ? (
                                    <Link
                                        href={crumb.href}
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                                    >
                                        {crumb.name}
                                    </Link>
                                ) : (
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                                        {crumb.name}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            )}


            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>{children}</main>
        </div>
    );
}
