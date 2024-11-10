// app/reset-password/page.tsx
"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Attempt to reset the password
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result?.status === "complete") {
        // Password has been reset successfully
        router.push("/sign-in?message=Password reset successful");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Invalid code or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Reset Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

// "use client";
// import React, { useState } from "react";
// import { useSignIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

// const ResetPasswordPage = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState("");
//   const { signIn } = useSignIn();
//   const router = useRouter();

//   async function updatePassword(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       // Assuming `signIn?.attemptSecondFactor` exists for setting a new password
//       const result = await signIn?.attemptSecondFactor({
//         strategy: "reset_password",
//         password: newPassword,
//       });

//       if (result && result.status === "complete") {
//         router.push("/"); // Redirect to home or any desired page
//       } else {
//         setError("Failed to reset password.");
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unknown error occurred.");
//       }
//     }
//   }

//   return (
//     <div style={{ maxWidth: "500px", margin: "auto" }}>
//       <h1>Reset Password</h1>
//       <form onSubmit={updatePassword}>
//         <label>New Password:</label>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <button type="submit">Set New Password</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordPage;
