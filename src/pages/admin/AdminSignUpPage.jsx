import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../../shared/context/LoadingContext";
import { CustomToastService } from "../../shared/message.service";
import CustomLoading from "../../components/CustomLoading";

const AdminSignUp = () => {
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

    console.log(formData);
    try {
      const response = await axiosInstance.post("/admin/register", formData);

      if (response.data) {
        CustomToastService.success(response.data.message);
        clearValues();
        navigate("/admin");
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

    if (!data.phone || data.phone === "") {
      errors.phone = "Phone is required";
    }

    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.type || data.type === "0") {
      errors.type = "Type is required";
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
              {/* First Name and Last Name */}
              <div>
                <label className="text-sm font-medium required">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Ful Name"
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && (
                  <div className="text-red-500 text-xs">{errors.name}</div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium required">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Email address"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium required">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Phone Number"
                    id="phone"
                    onChange={handleChange}
                    onInput={(e) =>
                      (e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 12))
                    }
                    value={formData.phone}
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-xs">{errors.phone}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium required">Type</label>
                  <select
                    name="type"
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    id="type"
                    onChange={handleChange}
                    value={formData.type}
                  >
                    <option value="0">Select Type</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Employee">Employee</option>
                    <option value="Businessman">Businessman</option>
                  </select>
                  {errors.type && (
                    <div className="text-red-500 text-xs">{errors.type}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium required">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {
                    <div className="text-red-500 text-xs">
                      {errors.password}
                    </div>
                  }
                </div>
                <div>
                  <label className="text-sm font-medium required">
                    Confirm Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                  {
                    <div className="text-red-500 text-xs">
                      {errors.confirmPassword}
                    </div>
                  }
                </div>
              </div>
              <div className="!mt-10">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={onSubmit}
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
