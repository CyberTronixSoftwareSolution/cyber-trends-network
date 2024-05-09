import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../../shared/context/LoadingContext";
import { useAuth } from "../../shared/context/AuthContext";
import { CustomToastService } from "../../shared/message.service";
import { LocalStorageService } from "../../shared/localStorage.service";
import CustomLoading from "../../components/CustomLoading";

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { loading, axiosInstance } = useLoading();
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
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
    console.log("formData", formData);
    try {
      const response = await axiosInstance.post("/admin/login", formData);

      if (response.data) {
        console.log("response", response.data);
        let user = response.data.existingUser;
        user.role = user.type;
        LocalStorageService.setUser(user);
        setUser(user);
        clearValues();
        CustomToastService.success("User logged in successfully!");
        navigate("/admin/dashboard");
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
    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="bg-gray-50 font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
            <span className="flex justify-center text-xl text-black dark:text-white">
              <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-black">
                YOUNG{" "}
                <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                  NETWORK
                </mark>
              </h1>
            </span>
            <form className="mt-10 space-y-4">
              <div>
                <label className="text-sm font-medium">Email address</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  required
                  className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Email address"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  required
                  className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="!mt-10">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={onSubmit}
                >
                  Log in
                </button>
              </div>

              <div className="flex items-center justify-center">
                <p className="text-sm"> Don&apos;t have an account?</p>
                &nbsp;
                <Link to="/admin/SignUp">
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

export default AdminLoginPage;
