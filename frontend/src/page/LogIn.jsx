import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LogIn = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const handelLogIn = (e) => {
    e.preventDefault();
    login({ email, password });
    console.log(email, password);
  };

  return (
    <div className="h-screen w-full hero-bg ">
      <header className="max-w-6xl mx-auto flex items-center pt-2 justify-center">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-10 mx-3 ">
        <div className=" w-full max-w-md p-8 space-y-6 bg-black/60 rounded shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Log In
          </h1>
          <form className="space-y-4" onSubmit={handelLogIn}>
            <div>
              <label
                htmlFor="Email"
                className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input
                type="email"
                className="w-full py-2 px-3  mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@gmial.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input
                type="password"
                className="w-full py-2 px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500">
              Log In
            </button>
            <div>
              <div className="text-white   text-center ">
                don't have an account ?{" "}
                <Link to="/signup" className="text-red-500 hover:underline">
                  Sing Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
