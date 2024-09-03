import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",

    email: "",
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!signupData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!validatePassword(signupData.password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters and contain at least 1 uppercase, 1 lowercase, and 1 special character";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (signupData.password.trim() !== signupData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    if (isValid) {
      console.log("Signing Up...", signupData);

      localStorage.setItem("signupData", JSON.stringify(signupData));

      navigate("/login");
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-gray-200 p-8 rounded-md mt-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              className={`w-full border p-2 rounded ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full border p-2 rounded ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`w-full border p-2 rounded ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full border p-2 rounded ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Confirm your password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <Button
            variant="contained"
            className="px-4 py-2 mb-11 rounded w-full"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </form>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
// rgba(37, 67, 44, 1)
