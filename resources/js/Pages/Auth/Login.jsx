import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in"/>

            <div className="w-full max-w-md mx-auto p-6">
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email"/>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Wachtwoord"/>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div className="flex items-center">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Onthoud mij
                            </span>
                        </label>

                        <div className={`ml-auto ${canResetPassword ? 'flex' : 'hidden'}`}>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                                >
                                    Wachtwoord vergeten?
                                </Link>
                            )}
                        </div>
                    </div>

                    <div
                        className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between md:justify-end sm:space-y-0">
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 md:mr-8">


                            <Link
                                href={route('register')}
                                className="text-sm text-gray-600 hover:text-gray-900 underline"
                            >
                                nog geen account?
                            </Link>
                        </div>

                        <PrimaryButton disabled={processing}>
                            Log in
                        </PrimaryButton>

                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
