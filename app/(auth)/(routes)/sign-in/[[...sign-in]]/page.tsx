import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <SignIn />
        {/* <div className="text-sm text-slate-500 mr-auto pt-2">
          <Link href="/forgot-password/">   Forgot     Password?</Link>
        </div> */}
      </div>
    </>
  );
}
