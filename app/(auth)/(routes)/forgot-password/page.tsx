// app/forgot-password/page.tsx
"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Start the password reset flow
      const firstFactor = await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      if (firstFactor?.status === "needs_first_factor") {
        // If successful, show success message and redirect to reset page
        setSuccessMessage("Check your email for a reset link");
        router.push("/reset-password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {successMessage && (
            <div className="text-green-500 text-sm">{successMessage}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
// "use client";

// import { useAuth, useSignIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// const ForgotPasswordPage: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");
//   const [successfulCreation, setSuccessfulCreation] = useState(false);
//   const [secondFactor, setSecondFactor] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();
//   const { isSignedIn } = useAuth();
//   const { isLoaded, signIn, setActive } = useSignIn();

//   if (!isLoaded) {
//     return null;
//   }

//   // Redirect signed-in users to the home page
//   if (isSignedIn) {
//     router.push("/");
//   }

//   const create = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signIn?.create({
//         strategy: "reset_password_email_code",
//         identifier: email,
//       });
//       setSuccessfulCreation(true);
//       setError("");
//     } catch (err) {
//       if (err instanceof Error && "errors" in err) {
//         const errorMessage = (err as any).errors[0].longMessage;
//         console.error("Error:", errorMessage);
//         setError(errorMessage);
//       } else {
//         console.error("Unknown error:", err);
//         setError("An unknown error occurred.");
//       }
//     }
//   };

//   const reset = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const result = await signIn?.attemptFirstFactor({
//         strategy: "reset_password_email_code",
//         code,
//         password,
//       });

//       if (result?.status === "needs_second_factor") {
//         setSecondFactor(true);
//         setError("");
//       } else if (result?.status === "complete") {
//         setActive({ session: result.createdSessionId });
//         setError("");
//         router.push("/");
//       }
//     } catch (err) {
//       if (err instanceof Error && "errors" in err) {
//         const errorMessage = (err as any).errors[0].longMessage;
//         console.error("Error:", errorMessage);
//         setError(errorMessage);
//       } else {
//         console.error("Unknown error:", err);
//         setError("An unknown error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Forgot Password?</h1>
//       <form className="form" onSubmit={!successfulCreation ? create : reset}>
//         {!successfulCreation && (
//           <>
//             <label htmlFor="email" className="label">
//               Email Address
//             </label>
//             <input
//               type="email"
//               className="input"
//               placeholder="e.g., john@doe.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button type="submit" className="button">
//               Send Reset Code
//             </button>
//             {error && <p className="error">{error}</p>}
//           </>
//         )}

//         {successfulCreation && (
//           <>
//             <label htmlFor="password" className="label">
//               New Password
//             </label>
//             <input
//               type="password"
//               className="input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <label htmlFor="code" className="label">
//               Reset Code
//             </label>
//             <input
//               type="text"
//               className="input"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />

//             <button type="submit" className="button">
//               Reset Password
//             </button>
//             {error && <p className="error">{error}</p>}
//           </>
//         )}

//         {secondFactor && (
//           <p className="info">
//             2FA is required, but this UI does not handle that
//           </p>
//         )}
//       </form>

//       <style jsx>{`
//         .container {
//           max-width: 400px;
//           margin: auto;
//           padding: 2em;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           background-color: #f8f9fa;
//           border-radius: 10px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }
//         .title {
//           font-size: 1.5em;
//           font-weight: 600;
//           color: #333;
//           margin-bottom: 1em;
//         }
//         .form {
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           gap: 1em;
//         }
//         .label {
//           font-size: 0.9em;
//           color: #666;
//           margin-bottom: 0.3em;
//         }
//         .input {
//           padding: 0.75em;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           font-size: 1em;
//           color: #333;
//         }
//         .button {
//           padding: 0.75em;
//           background-color: #0070f3;
//           color: #fff;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 1em;
//           font-weight: 600;
//         }
//         .button:hover {
//           background-color: #005bb5;
//         }
//         .error {
//           color: #d9534f;
//           font-size: 0.9em;
//         }
//         .info {
//           color: #5bc0de;
//           font-size: 0.9em;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ForgotPasswordPage;
