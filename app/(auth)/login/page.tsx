"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); // Simple validation
 if (!email || !password) { setError("Email and password are required."); return; }
  // Dummy authentication (replace with API call if needed) 
  if (email === "admin@example.com" && password === "admin") {
     // Store session in browser
     document.cookie = `token=dummy-token; path=/; max-age=3600; SameSite=Strict`;
     localStorage.setItem( "user", JSON.stringify({ email, name: "John Doe" }) );
     // Redirect to dashboard
     router.push("/");
  } else {
     setError("Invalid credentials.");
  }
};

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2  px-16">
        <h2 className="text-2xl font-bold mb-6">Welcome back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Remember me</span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center justify-center w-1/2 bg-blue-600 text-white p-16">
        <div>
          <h1 className="text-3xl font-bold mb-4">ticktock</h1>
          <p className="text-lg">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}
