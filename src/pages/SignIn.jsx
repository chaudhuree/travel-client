import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "password must contain at least 6 characters, including UPPER/lowercase and numbers"
      );
      return;
    }
    try {
      const auth = getAuth();
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Bad user credentials");
    }
  }
  if (loading) return <Spinner />;
  return (
    <section className="container mx-auto font-poppins">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="dark:text-gray-300 text-3xl text-center mt-6 font-bold text-primary">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="w-full md:w-[67%] lg:w-[50%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              autoComplete="off"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
              
              
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="off"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer text-primary"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer text-primary"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 dark:text-gray-300">
                Don't have a account?
                <Link
                  to="/register"
                  className="text-amber-700 hover:text-amber-900 transition duration-200 ease-in-out ml-1 border-b-[1px] border-amber-700 font-semibold"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forgotpassword"
                  className="text-sky-600 hover:text-sky-900 transition duration-200 ease-in-out"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-primary text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#403e23] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#403e23]"
              type="submit"
            >
              Sign in
            </button>
            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4 text-[#1D1B11]">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
