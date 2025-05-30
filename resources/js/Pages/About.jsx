import SiteLayout from "@/Layouts/SiteLayout.jsx";
import {Head} from '@inertiajs/react';
import GreenBlob1 from "@/Components/Blobs/GreenBlob1.jsx";
import GreenBlob2 from "@/Components/Blobs/GreenBlob2.jsx";
import PurpleBlob1 from "@/Components/Blobs/PurpleBlob1.jsx";
import React from "react";
import Footer from "@/Components/Footer.jsx";
import {Disclosure} from '@headlessui/react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function About() {
    const faqs = [
        {
            question: "Wat is Ordena?",
            answer: "Ordena is een platform dat autisme en de wereld errond toegankelijker maakt voor iedereen."
        },
        {
            question: "Voor wie is Ordena bedoeld?",
            answer: "Ordena is bedoeld voor mensen met ASS, hun ouders, leerkrachten, hulpverleners en andere betrokkenen."
        },
        {
            question: "Wat biedt Ordena?",
            answer: "Ordena biedt een forum, activiteitenlijst en interactieve ontdekkingstocht rond autisme."
        },
        
    ];

    return (
        <SiteLayout
            breadcrumbs={[
                {name: 'Home', href: '/'},
                {name: 'Over ons'}
            ]}
        >
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
                <Head title="Over ons"/>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-2/3">
                                <div className="overflow-hidden sm:rounded-lg">
                                    <div className="p-6 text-gray-900">
                                        <h1 className="text-2xl font-bold mb-4">Over ons</h1>
                                        <p>Ordena is een nieuw platform dat autisme en de wereld errond toegankelijker
                                            maakt voor iedereen. In samenwerking met verschillende BUSO-scholen hebben
                                            we intensief gewerkt aan één centrale plek waar informatie, ervaringen en
                                            hulpmiddelen samenkomen: Ordena</p>
                                        <p className="mt-4">Ons platform biedt onder één dak een breed scala aan
                                            functies, speciaal ontwikkeld voor mensen met ASS, hun ouders, leerkrachten,
                                            hulpverleners en andere betrokkenen. Denk aan een forum waar ouders,
                                            leerkrachten, psychologen en mensen met ASS hun ervaringen en tips delen,
                                            een activiteitenlijst vol prikkelarme uitstappen, en een interactieve
                                            ontdekkingstocht die op een begrijpelijke manier uitlegt wat autisme precies
                                            is.</p>
                                        <p className="mt-4">Ordena is er om te verbinden, te informeren en structuur te
                                            bieden, drie dingen die voor velen van onschatbare waarde zijn.</p>
                                    </div>
                                </div>

                                <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold mb-4">Veelgestelde vragen</h2>
                                        <div className="space-y-2">
                                            {faqs.map((faq, index) => (
                                                <Disclosure as="div" key={index} className="border rounded-lg">
                                                    {({open}) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className="flex w-full justify-between px-4 py-2 text-left text-sm font-medium hover:bg-gray-50">
                                                                <span>{faq.question}</span>
                                                                <FontAwesomeIcon
                                                                    icon={faChevronUp}
                                                                    className={`${open ? ' transform' : 'rotate-180'} h-4 w-4`}
                                                                />
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel
                                                                className="px-4 py-2 text-sm text-gray-500 border-t">
                                                                {faq.answer}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/2">
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-gray-900">
                                        <h1 className="text-2xl font-bold mb-4">Neem contact op</h1>
                                        <form className="space-y-4">
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium text-gray-700">Naam:</label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium text-gray-700">Email:</label>
                                                <input
                                                    type="email"
                                                    placeholder="info@ordena.be"
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label
                                                    className="mb-1 text-sm font-medium text-gray-700">Onderwerp:</label>
                                                <input
                                                    type="text"
                                                    placeholder="Onderwerp"
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>

                                            <PrimaryButton className="mt-4 w-full">
                                                Verstuur
                                            </PrimaryButton>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </SiteLayout>
    );
}
