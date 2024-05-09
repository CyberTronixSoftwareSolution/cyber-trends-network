import { Link, useNavigate } from "react-router-dom";
import SignUp from "../../assets/images/signUp.png";
import { useState } from "react";
import { CustomToastService } from "../../shared/message.service";
import { useLoading } from "../../shared/context/LoadingContext";
import CustomLoading from "../../components/CustomLoading";

const UserSignUp = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { loading, axiosInstance } = useLoading();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    if (formData.password !== formData.confirmPassword) {
      CustomToastService.warning(
        "Password and confirm password should be same!"
      );
      return;
    }

    try {
      const response = await axiosInstance.post("/user/register", formData);

      if (response.data) {
        CustomToastService.success(response.data.message);
        clearValues();
        navigate("/signIn");
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const clearValues = () => {
    setFormData({});
  };

  const validate = (data) => {
    const errors = {};
    if (!data.name || data.name === "") {
      errors.name = "Name is required";
    }

    if (!data.dob || data.dob === "") {
      errors.dob = "Date of birth is required";
    }

    if (!data.phone || data.phone === "") {
      errors.phone = "Phone is required";
    }

    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl h-[550px] bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-violet-50 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              // style={{
              //   backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
              // }}
            >
              <div className="flex justify-center items-center">
                <img
                  src={SignUp}
                  alt="login"
                  width={"500px"}
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-violet-900">
                  Sign up
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-sm flex flex-col gap-4">
                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                      id="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                    {errors.name && (
                      <div className="text-red-500 text-xs">{errors.name}</div>
                    )}
                  </div>

                  <div>
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="text-red-500 text-xs">{errors.email}</div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="date"
                        id="dob"
                        onChange={handleChange}
                      />
                      {errors.dob && (
                        <div className="text-red-500 text-xs">{errors.dob}</div>
                      )}
                    </div>

                    <div>
                      {" "}
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="tel"
                        placeholder="Enter your phone"
                        id="phone"
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <div className="text-red-500 text-xs">
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="text-red-500 text-xs">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="confirm password"
                        id="confirmPassword"
                        onChange={handleChange}
                      />

                      {errors.confirmPassword && (
                        <div className="text-red-500 text-xs">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={onSubmit}
                  >
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?
                    <Link to="/signIn">
                      <span className="text-blue-900 font-semibold">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
