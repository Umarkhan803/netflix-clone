import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState(" ");
  const [password, setPassword] = useState("");

  const handelSignUp = (e) => {
    e.preventDefault();
    console.log(email, userName, password);
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
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={handelSignUp}>
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
                htmlFor="userName"
                className="text-sm font-medium text-gray-300 block">
                Username
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
              Sign Up
            </button>
            <div>
              <div className="text-white   text-center ">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:underline">
                  Sing In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
