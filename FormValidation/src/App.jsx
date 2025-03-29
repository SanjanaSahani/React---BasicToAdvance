import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegistrationForm() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
    acceptTerms: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [errors, setErrors] = useState([]);
  const [passwordFocused, setPasswordFocused] = useState(false); // Track password input focus

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      setPasswordValid({
        length: value.length >= 8,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  }

  function validateForm() {
    let validationErrors = [];
    if (!formData.firstName || !formData.lastName) validationErrors.push("Name is required.");
    if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.push("Invalid email format.");
    if (!Object.values(passwordValid).every(Boolean)) validationErrors.push("Password does not meet criteria.");
    if (formData.password !== formData.confirmPassword) validationErrors.push("Passwords do not match.");
    if (formData.captchaInput !== captcha) validationErrors.push("CAPTCHA is incorrect.");
    if (!formData.acceptTerms) validationErrors.push("You must accept the terms.");

    setErrors(validationErrors);
    return validationErrors.length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      setFormData(initialFormData); // Reset form
      setCaptcha(generateCaptcha()); // Generate a new CAPTCHA
      setErrors([]); // Clear errors
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label> FirstName
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border rounded p-2 w-full" />
          </label>
          <label > LastName
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border rounded p-2 w-full" />
          </label>
        </div>
        <label> Email
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border rounded p-2 mb-4 w-full" />
        </label>

        {/* Password Field */}
        <div className="relative mb-4"> {/* Increased bottom margin */}
          <label > Password
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className="border rounded p-2 w-full pr-10"
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-10">
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>

            {/* Show validation box only when password input is focused */}
            {passwordFocused && !Object.values(passwordValid).every(Boolean) && (
              <div className="absolute left-0 top-12 w-full bg-white shadow-lg p-3 rounded border text-sm z-10">
                <p className="text-gray-700">Password must contain:</p>
                <ul className="mt-1">
                  <li className={passwordValid.length ? "text-green-600" : "text-red-600"}>✓ At least 8 characters</li>
                  <li className={passwordValid.lowercase ? "text-green-600" : "text-red-600"}>✓ Lowercase letter</li>
                  <li className={passwordValid.uppercase ? "text-green-600" : "text-red-600"}>✓ Uppercase letter</li>
                  <li className={passwordValid.number ? "text-green-600" : "text-red-600"}>✓ Number</li>
                  <li className={passwordValid.specialChar ? "text-green-600" : "text-red-600"}>✓ Special character</li>
                </ul>
              </div>
            )}
          </label>
        </div>

        {/* Confirm Password Field with Eye Icon */}
        <div className="relative">
          <label > Confirm Password
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded p-2 w-full pr-10"
            />
            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-10">
              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>
        </div>

        {/* CAPTCHA Input */}
        <div className="flex items-center">
          <span className="bg-gray-200 px-4 py-2 rounded">{captcha}</span>
          <input type="text" name="captchaInput" placeholder="Enter CAPTCHA" value={formData.captchaInput} onChange={handleChange} className="border rounded p-2 ml-2 w-full" />
        </div>

        {/* Accept Terms Checkbox */}
        <div>
          <label className="flex items-center">
            <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="mr-2" />
            I accept the Terms & Conditions
          </label>
        </div>

        {/* Display Validation Errors */}
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-600 p-2 rounded">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
} 