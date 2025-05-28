import {Head, Link, router} from '@inertiajs/react';
import SiteLayout from "@/Layouts/SiteLayout.jsx";
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";
import React, {useState, useEffect} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Path1 from "@/Components/DashedLines/Step1to2.jsx";
import Path2 from "@/Components/DashedLines/Step2to3.jsx";
import Path3 from "@/Components/DashedLines/Step3to4.jsx";
import Path4 from "@/Components/DashedLines/Step4to5.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const [currentWord, setCurrentWord] = useState(0);
    const words = ["Begeleiding", "Ondersteuning", "Activiteiten", "Gemeenschap"];
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [isPlaying]); // ← depend on isPlaying


    return (

        <SiteLayout>
            <div className="relative">
                <div
                    className="absolute hidden md:block w-[200px] h-[200px] top-[10vh] left-[10vw] lg:top-[300vh] lg:left-[-15vw]">
                    <GreenBlob1/>
                </div>

                {/* Blob 2 */}
                <div className="absolute hidden md:block w-[250px] h-[250px] top-[50vh] left-[5vw] md:left-[5vw]">
                    <GreenBlob2/>
                </div>

                {/* Blob 3 */}
                <div
                    className="absolute hidden md:block w-[366px] h-[400px] top-[30vh] left-[65vw] md:-top200bh md:-left-2 lg:top-[200vh] lg:left-[60vw]">
                    <PurpleBlob1/>
                </div>
                <div className="relative flex items-center justify-end w-full ">
                    <Head title={"Ordena"}></Head>
                    <div
                        className="flex flex-col justify-center  md:flex-row items-center md:justify-end space-x-2 bg-white p-2 rounded-lg shadow-md z-10 w-30 md:w-52">
                        <span className="text-sm text-gray-700">Animaties toestaan</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPlaying}
                                onChange={() => setIsPlaying(!isPlaying)}
                                className="sr-only peer"
                            />
                            <div
                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                </div>
                <div className=" relative grid grid-cols-1 py-20 ">
                    <div className="w-1/2 md:w-1/3 mx-auto">
                        <ApplicationLogo/>
                    </div>
                    <div className="flex justify-center items-center h-24 -mt-10">
                        <div className="flex flex-col md:flex-row items-center text-center md:text-left mt-10 md:mt-0">
                            <p className="text-3xl font-roboto text-gray-600">Jouw plek voor</p>
                            <div
                                className={`text-4xl font-extrabold font-roboto md:ml-2 w-60 text-[#9B77C7] ${
                                    isPlaying ? 'opacity-0 animate-fadeIn' : 'opacity-100'
                                }`}
                                key={currentWord}
                                style={{
                                    animation: isPlaying ? 'fadeInOut 2s ease-in-out' : 'none',
                                    position: 'relative',
                                }}
                            >
                                {words[currentWord]}
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                        @keyframes fadeInOut {
                            0% {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            20% {
                                opacity: 1;
                                transform: translateY(0);
                            }
                            80% {
                                opacity: 1;
                                transform: translateY(0);
                            }
                            100% {
                                opacity: 0;
                                transform: translateY(-20px);
                            }
                        }
                    `}</style>
                </div>

                <div className="md:w-2/3 z-10 bg-white rounded p-6 gap-6 mt-6 relative mx-auto">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2 text-center">Wat is autisme</h1>
                    <p className="text-gray-600 mb-4 text-center">
                        Autisme is een ontwikkelingsstoornis die invloed heeft op de manier waarop mensen
                        communiceren, sociale interacties aangaan en informatie verwerken. Het is een
                        spectrumstoornis,
                        wat betekent dat het zich op verschillende manieren en in verschillende gradaties kan
                        uiten.
                    </p>
                </div>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 my-12">
                    <div className="w-full bg-white rounded-lg shadow-md p-8 relative">
                            <span
                                className="absolute -left-3 top-8 w-8 h-8  md:-left-5 md:top-5 md:w-12 md:h-12 lg:-left-8 lg:top-4 lg:w-14 lg:h-14 rounded-full bg-[#9B77C7] text-white flex items-center justify-center text-2xl font-bold">1</span>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Wat betekent de diagnose?</h2>
                        <p className="text-gray-600 mb-6">
                            ASS (Autisme Spectrum Stoornis) is een term die beschrijft hoe mensen
                            informatie verwerken. Iedereen met ASS is uniek. De kenmerken en uitdagingen
                            kunnen per persoon verschillen.
                        </p>

                        <p className="text-gray-700 mb-6">
                            <span className="font-medium">Weetje:</span> Autisme kan zich uiten in het behoefte
                            hebben
                            aan structuur, gevoeligheid voor prikkels, of specifieke interesses.
                        </p>

                        <div>
                            <p className="font-medium mb-2">Ontdek meer:</p>
                            <p className="text-gray-600">
                                Lees meer over autisme via betrouwbare bronnen, zoals{' '}
                                <a href="https://www.autismecentraal.com/" target='_blank'
                                   className="text-blue-600 hover:text-blue-800 transition-colors">
                                    Autisme Centraal
                                </a>{' '}
                                of{' '}
                                <a href="https://autismevlaanderen.be/" target="_blank"
                                   className="text-blue-600 hover:text-blue-800 transition-colors">
                                    VVA (Vlaamse vereniging Autisme)
                                </a>
                            </p>
                        </div>

                        <PrimaryButton className="mt-4" onClick={() => router.get(route('forum'))}>
                            Bekijk de kennisbank
                        </PrimaryButton>
                    </div>

                    <div className="hidden lg:block"><Path1></Path1></div>
                    <div className="hidden lg:block"><Path2></Path2></div>

                    <div className="w-full bg-white rounded-lg shadow-md p-8 relative md:ml-auto">
                            <span
                                className="absolute -left-3 top-8 w-8 h-8  md:-left-5 md:top-5 md:w-12 md:h-12 lg:-left-8 lg:top-4 lg:w-14 lg:h-14 rounded-full bg-[#9B77C7] text-white flex items-center justify-center text-2xl font-bold">2</span>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hoe help je jezelf of je kind
                            verder op weg?</h2>

                        <div className="space-y-6">
                            <p className="text-gray-600">
                                als jij of iemand in je omgeving de diagnose heeft gekregen, vraag je je misschien af
                                hoe je hen het beste kunt helpen.
                            </p>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Handige tips:</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-4">
                                    <li>Creëer rust en voorspelbaarheid thuis</li>
                                    <li>Observeer wat je kind nodig heeft: rust, structuur, of prikkelreductie</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Verken opties:</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-6">
                                    <li>Zijn er hulpmiddelen zoals pictogrammen of dagplanners die nuttig kunnen
                                        zijn?
                                    </li>
                                    <li>Vraag advies aan scholen of therapeuten over praktische steun</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow-md p-8 relative">
                            <span
                                className="absolute -left-3 top-8 w-8 h-8  md:-left-5 md:top-5 md:w-12 md:h-12 lg:-left-8 lg:top-4 lg:w-14 lg:h-14 rounded-full bg-[#9B77C7] text-white flex items-center justify-center text-2xl font-bold">3</span>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Onderwijs</h2>

                        <div className="space-y-6">
                            <p>
                                Voor kinderen met ASS kan de juiste schoolomgeving een groot verschil maken.
                                Sommige kinderen gedijen in het reguliere onderwijs, terwijl anderen baat hebben bij
                                gespecialiseerde scholen.
                            </p>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Overweeg:</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-4">
                                    <li>Praat met leerkrachten over aanpassingen die je kind kunnen helpen.</li>
                                    <li>Ontdek gespecialiseerde scholen of begeleidingsprogramma's in je buurt.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Waar te beginnen?</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-4">
                                    <li>Kijk naar scholen met inclusieve programma's.</li>
                                    <li>Informeer je bij organisaties zoals het <a href="https://www.vrijclb.be/"
                                                                                   target="_blank"
                                                                                   className="text-blue-600 hover:text-blue-800 transition-colors">
                                        CLB (Centrum voor Leerlingenbegeleiding)
                                    </a>.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <PrimaryButton className="mt-4" onClick={() => router.get(route('scholenzoeker'))}>
                            Bekijk onze tool | (in ontwikkeling)
                        </PrimaryButton>
                    </div>
                    <div className="hidden lg:block"><Path3></Path3></div>
                    <div className="hidden lg:block"><Path4></Path4></div>
                    <div className="w-full bg-white rounded-lg shadow-md p-8 relative md:ml-auto">
                            <span
                                className="absolute -left-3 top-8 w-8 h-8 md:-left-5 md:top-5 md:w-12 md:h-12 lg:-left-8 lg:top-4 lg:w-14 lg:h-14 rounded-full bg-[#9B77C7] text-white flex items-center justify-center text-2xl font-bold">4</span>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activiteiten</h2>

                        <div className="space-y-6">
                            <p>
                                Activiteiten kunnen een geweldige manier zijn om sociale vaardigheden te ontwikkelen
                                en plezier te hebben.
                                Zoek naar activiteiten die aansluiten bij de interesses en behoeften van je kind.
                            </p>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Tips voor het vinden van
                                    activiteiten:</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-4">
                                    <li>Vraag in je omgeving naar lokale clubs of groepen.</li>
                                    <li>Overweeg online platforms voor speciale activiteiten.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Waar te zoeken?</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-4">
                                    <li>Bekijk onze activiteitenpagina voor een overzicht van beschikbare opties.
                                    </li>
                                    <li>Neem contact op met lokale verenigingen of gemeenschapscentra.</li>
                                </ul>
                            </div>
                        </div>

                        <PrimaryButton className="mt-4" onClick={() => router.get(route('activities'))}>
                            Bekijk onze activiteiten
                        </PrimaryButton>
                    </div>

                    <div className="w-full bg-white rounded-lg shadow-md p-8 relative mb-24">
                            <span
                                className="absolute -left-3 top-8 w-8 h-8  md:-left-5 md:top-5 md:w-12 md:h-12 lg:-left-8 lg:top-4 lg:w-14 lg:h-14 rounded-full bg-[#9B77C7] text-white flex items-center justify-center text-2xl font-bold">5</span>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Communicatie met je omgeving</h2>

                        <div className="space-y-6">
                            <p>
                                Het is belangrijk om open te communiceren met je omgeving over de behoeften van je
                                kind.
                                Dit kan helpen om begrip en ondersteuning te creëren.
                            </p>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Tips voor effectieve
                                    communicatie:</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-4">
                                    <li>Leg uit wat autisme is en hoe het je kind beïnvloedt.</li>
                                    <li>Deel specifieke behoeften of uitdagingen die je kind heeft.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Waar te beginnen?</h3>
                                <ul className="list-disc list-outside text-gray-700 space-y-2 pl-4">
                                    <li>Praat met familieleden, vrienden en leerkrachten.</li>
                                    <li>Overweeg om informatie te delen via sociale media of lokale
                                        gemeenschappen.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <PrimaryButton className="mt-4" onClick={() => router.get(route('forum'))}>
                            Bekijk de kennisbank
                        </PrimaryButton>
                    </div>
                </div>

                <div className="md:w-2/3 bg-white rounded p-6 gap-6 -mt-12 mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Dat is autisme!</h2>
                    <p className="text-gray-600 mb-6">
                        Nu heb je kennis over de basics van autisme, er is natuurlijk nog veel meer te ontdekken /
                        te leren, en dit zal niet altijd even goed lopen maar dat is oké! Elk kind is uniek en heeft
                        zijn eigen manier van omgaan met de wereld.
                    </p>
                    <div className="bg-gray-100 border-l-4 border-yellow-500 p-4 rounded">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold block mb-1">Disclaimer:</span>
                            Deze informatie is verzameld vanuit onderzoek en samenwerking met mensen in de sector.
                            De tips en extra's die gedeeld worden zijn algemene richtlijnen - autisme komt in
                            verschillende vormen voor en wat werkt verschilt per persoon.
                        </p>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
