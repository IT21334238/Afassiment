import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loginDto = {
      email: email,
      password: password,
    };
    try {
      if (email == "admin@gmail.com" & password == "admin"){
        navigate("/");
      } 
    } catch (error) {
        throw new error("Login error");
    }

  //   try {
  //     const response = await axios.post(`/api/users/login`, loginDto);
  //     console.log(response);

  //     if (response.status == 200) {
  //       localStorage.setItem("token", JSON.stringify(response.data.token));
  //       console.log(response);
  //       navigate("/");
  //     } else {
  //       throw new error("Login error");
  //     }
  //   } catch (error) {
  //     setError(error.response?.data.message);
  //   }
  };

  return (
    <div className="home">
      <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div class="w-full rounded-lg shadow-md border border-grey-500 md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-br from-white to-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="w-2/3 block mx-auto text-white bg-blue-300 hover:bg-blue-400 focus:ring-0 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 "
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                {error && <div className="error">{error}</div>}

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
