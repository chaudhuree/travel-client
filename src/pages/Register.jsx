import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useAuth } from "../context/AuthProvider";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuthSuccess, setCurrentUser } = useAuth();

  const signup = async (email, password, name, photoURL) => {
    const auth = getAuth();
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      const user = auth.currentUser;
      setCurrentUser({
        ...user,
      });
      setAuthSuccess(true);
      setLoading(false);
      toast.success("Sign up was successful");
      auth.signOut();
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setAuthSuccess(false);
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    errors.password && toast.error(errors.password.message);
  }, [errors.password]);
  const onSubmit = async (data) => {
    if (errors.password) return toast.error(errors.password.message);
    await signup(data.email, data.password, data.name, data.photoURL);
  };

  if (loading) return <Spinner />;
  return (
    <section className="container mx-auto">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="dark:text-gray-300 text-3xl text-center mt-6 font-bold text-primary">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="w-full md:w-[67%] lg:w-[50%] lg:ml-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "name is required",
                },
              })}
              placeholder="Full name"
              className=" w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
            />
            {<p className="text-red-500 mb-6 ">{errors.name?.message}</p>}
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
                required: {
                  value: true,
                  message: "email is required",
                },
              })}
              placeholder="Email address"
              className=" w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
            />
            {<p className="text-red-500 mb-6">{errors.email?.message}</p>}
            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className=" w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                    message:
                      "Password must contain at least 6 characters, including at least one uppercase and lowercase letter and one number",
                  },
                  required: {
                    value: true,
                    message: "password is required",
                  },
                })}
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
              {<p className="text-red-500 mb-6">{errors.password?.message}</p>}
            </div>
            <div>
              <input
                type="url"
                id="photoURL"
                {...register("photoURL", {
                  required: true,
                  pattern: {
                    value: /^https?:\/\//,
                    message: "invalid URL",
                  },
                })}
                placeholder="PhotoURL : https://example.com"
                className="w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
              />
              {<p className="text-red-500">{errors.photoURL?.message}</p>}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-2">
              <p className="mb-6 dark:text-gray-300">
                Have a account?
                <Link
                  to="/signin"
                  className="text-amber-700 font-semibold hover:text-amber-900 transition duration-200 ease-in-out ml-1 border-b-[1px] border-amber-700"
                >
                  Sign in
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
              Sign up
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
