import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, router, usePage} from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";
import {CheckCircle, Circle, ChevronDown} from 'lucide-react';
import {useState} from 'react';
import axios from 'axios';

export default function Dashboard() {
    const {auth, recentActivities = [], totalUpvotes = 0, onboardingSteps = []} = usePage().props;
    const [showAllSteps, setShowAllSteps] = useState(false);

    const stepTitles = {
        profile_setup: "Rol aanvragen",
        explore_dashboard: "Organisatie aanvragen",
        connect_project: "Voltooi je introductie",
    };

    const stepUrls = {
        profile_setup: route('dashboard.rolerequest'),
        explore_dashboard: route('organisatie.aanvragen'),
    }

    const completedSteps = onboardingSteps.filter(s => s.completed).length;
    const totalSteps = onboardingSteps.length;

    const completeStep = async (stepKey) => {
        router.post(route('dashboard.completeStep'), {step_name: stepKey});
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mijn profiel
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welkom op je profiel pagina, {auth.user.name}! Hier kan je je profiel beheren en meer.
                            Wij gaan je hier natuurlijk goed in begeleiden.
                        </div>
                    </div>

                    {/* Onboarding Progress Bar */}
                    {completedSteps < totalSteps && (
                        <div className="bg-white shadow mt-6 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-medium text-gray-700">
                                    Je onboarding voortgang ({completedSteps} van {totalSteps})
                                </h3>
                                <button
                                    onClick={() => setShowAllSteps(!showAllSteps)}
                                    className="flex items-center gap-1 text-sm text-[#9B77C7] hover:underline"
                                >
                                    {showAllSteps ? "Toon minder" : "Toon alle stappen"}
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${showAllSteps ? "rotate-180" : ""}`}/>
                                </button>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                <div
                                    className="bg-[#9B77C7] h-3 rounded-full transition-all duration-300"
                                    style={{width: `${(completedSteps / totalSteps) * 100}%`}}
                                />
                            </div>

                            {/* Step list */}
                            <div className="space-y-3">
                                {(showAllSteps ? onboardingSteps : onboardingSteps.slice(0, 1)).map((step, index) => (
                                    <div key={index}
                                         className="flex items-start justify-between p-3 rounded-lg border bg-gray-50">
                                        <div className="flex items-start gap-2">
                                            {step.completed ? (
                                                <CheckCircle className="text-green-500 w-5 h-5 mt-0.5"/>
                                            ) : (
                                                <Circle className="text-gray-400 w-5 h-5 mt-0.5"/>
                                            )}
                                            <div>
                                                <p className={`font-medium ${step.completed ? "text-gray-700 line-through" : "text-gray-800"}`}>
                                                    {stepTitles[step.step_name] || step.step_name}
                                                </p>
                                                {!step.completed && stepUrls[step.step_name] && (
                                                    <a
                                                        href={stepUrls[step.step_name]}
                                                        className="text-sm text-blue-600 underline hover:text-blue-800"
                                                    >
                                                        Bekijk pagina
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {!step.completed && (
                                            <button
                                                onClick={() => completeStep(step.step_name)}
                                                className="bg-[#9B77C7] text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                                            >
                                                Sla over
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Existing Dashboard Content */}
                    <div className="mt-6 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-700">Upvotes op je forumberichten</h3>
                            <p className="text-3xl font-bold mt-2 text-green-600">{totalUpvotes}</p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Recente Activiteiten</h3>
                            {recentActivities.length === 0 ? (
                                <p className="text-gray-500">Je hebt nog geen activiteiten...</p>
                            ) : (
                                <ul className="list-disc list-inside text-gray-800 space-y-1">
                                    {recentActivities.map((activity, index) => (
                                        <li key={index}>{activity}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <Footer/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
