import { Link } from "react-router-dom";

const AdminSignUp = () => {
  return (
    <>
      <div className="bg-gray-50 font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
            <span className="flex justify-center text-xl text-black dark:text-white">
              <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-black">
                CYBER{" "}
                <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                  Trends
                </mark>
              </h1>
            </span>
            <form className="mt-10 space-y-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* First Name and Last Name */}
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="First Name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Email address"
                />
              </div>
              {/* password and confirm password same col */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="!mt-10">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-center">
                <p className="text-sm"> Don&apos;t have an account?</p>
                &nbsp;
                <Link to="/admin">
                  <a className="text-blue-600 hover:text-blue-700">Sign up</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignUp;
