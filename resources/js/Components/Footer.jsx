import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {Link} from '@inertiajs/react';

export default function Footer(){
    return(
        <footer className={"max-w-screen-xl mt-40 bg-gray-50 rounded-lg shadow-sm"}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8">
                <div className="flex flex-col items-center md:items-start">
                    <div className={"w-40 h-auto mb-4 hover:opacity-90 transition-opacity"}>
                        <ApplicationLogo></ApplicationLogo>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Van handige tips tot geschikte scholen en leuke activiteiten.
                        Ordena is jouw startpunt voor alles wat met autisme te maken heeft.</p>
                </div>
                <div></div>
                <div className="mt-4 md:mt-0">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 text-center md:text-left">Handige Links</h3>
                    <nav className="flex flex-col space-y-3 items-center md:items-start">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                        <Link href={route('forum')}
                              className="text-gray-600 hover:text-gray-900 transition-colors">Forum</Link>
                        <Link href={route('activities')}
                              className="text-gray-600 hover:text-gray-900 transition-colors">Activiteiten</Link>
                        <Link href={route('dashboard')}
                              className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
                    </nav>
                </div>
                <div className="mt-4 md:mt-0">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 text-center md:text-left">Juridisch</h3>
                    {/*<nav className="flex flex-col space-y-3">*/}
                    {/*    <Link href={route('privacy')} className="text-gray-600 hover:text-gray-900 transition-colors">Privacy*/}
                    {/*        Policy</Link>*/}
                    {/*    <Link href={route('terms')} className="text-gray-600 hover:text-gray-900 transition-colors">Algemene*/}
                    {/*        Voorwaarden</Link>*/}
                    {/*    <Link href={route('disclaimer')} className="text-gray-600 hover:text-gray-900 transition-colors">Disclaimer</Link>*/}
                    {/*    <Link href={route('cookies')} className="text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</Link>*/}
                    {/*</nav>*/}
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 py-6 border-t border-gray-200">
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. Alle rechten voorbehouden.
                </div>
            </div>
        </footer>
    )
}
