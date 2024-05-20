import { useContext } from "react";
import Logo from "../assets/logo.png"
import { BACKEND_URL } from "../globals";
import { LoginContext } from "../services/auth";

const LoginPage = () => {

    const {login} = useContext(LoginContext)

    const onButtonClick = () => {
        const formData = new FormData();
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        formData.append("username", email);
        formData.append("password", password);
    
        fetch(BACKEND_URL + '/token', {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => login(data.access_token))

    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
            <div className="w-fit h-fit rounded-3xl shadow-xl bg-white p-10">

                <div className="flex justify-center mb-4">
                    <img src={Logo}></img>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="text"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Senha
                    </label>
                    <input 
                        className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password"
                    />
                </div>

                <div className="flex w-full">
                    <button 
                        onClick={onButtonClick}
                        className="
                            bg-[var(--primary)] text-white font-bold p-2 
                            rounded-xl w-full hover:bg-[var(--primary-opacity-80)]"
                    >
                        Login
                    </button>
                </div>

            </div>
        </div>
    )
}

export default LoginPage