import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from 'next/link';

export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const { data, error: signInError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          lastname: formData.lastName,
        },
      },
    });
    if (signInError) {
      return;
    }
    if (!signInError && data && data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      router.replace("/dashboard");
    }
  };

  return (
    <div className="container">
      <img src="/SignUp.jpg" alt="Login Background Image" />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="signupname"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="signuplastname"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            className="signupemail"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            className="signuppassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className="signupsignupbutton">
            SIGN UP
          </button>
        </form>
        <Link href="/login" className="signuploginbutton">
          LOGIN
        </Link>
      </div>
    </div>
  );
}
