import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }

  return (
    <section>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <h1 className="text-3xl text-center mt-6 font-bold text-primary">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
       
        <div className="w-full md:w-[67%] lg:w-[50%] lg:ml-20 font-poppins">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-xl text-primary bg-white  rounded transition ease-in-out font-medium focus:outline-[#6D6523]"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have a account?
                <Link
                  to="/register"
                  className="text-amber-700 font-semibold hover:text-amber-900 transition duration-200 ease-in-out ml-1 border-b-[1px] border-amber-700"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/signin"
                  className="text-sky-600 hover:text-sky-900 transition duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-primary text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#403e23] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#403e23]"
              type="submit"
            >
              Send reset password
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
