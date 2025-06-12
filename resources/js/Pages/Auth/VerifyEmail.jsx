import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';

export default function VerifyEmail({status}) {
    const {post, processing} = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="E-mail Verificatie"/>

            <div className="mb-4 text-sm text-gray-600">
                Bedankt voor het registreren! Voordat u kunt beginnen, kunt u uw
                e-mailadres verifiëren door te klikken op de link die we zojuist
                naar u hebben gemaild? Als u de e-mail niet heeft ontvangen,
                sturen we u graag een nieuwe.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Er is een nieuwe verificatielink verzonden naar het e-mailadres
                    dat u tijdens de registratie heeft opgegeven.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Verificatie e-mail opnieuw versturen
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Uitloggen
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
