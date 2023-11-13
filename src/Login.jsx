    import { useState } from 'react';

    const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        };

        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            // TODO: handle form submission
        };

        return (
            <>
                <div className="flex flex-grow-0.25 flex-col justify-center px-6 py-6 pt-1 lg:px-6">

                    <div className=" bg-white shadow-md rounded-lg min-h-full sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-red-500 rounded-t-md">
                            <img
                                className="mx-auto h-25 w-auto"
                                src="src\assets\images\BACI.png"
                                alt="Baci Logo"
                            />
                        </div>

                        <form className="space-y-6 py-10 px-10" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
                                    Usuario
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        placeholder='Usuario'
                                        type="text"
                                        autoComplete="username"
                                        required
                                        value={username}
                                        onChange={handleUsernameChange}
                                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                                        Contraseña
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        placeholder='Contraseña'
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"                            >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    export default Login;