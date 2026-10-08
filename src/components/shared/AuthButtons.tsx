"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে!");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };

  if (isPending) {
    return <div className="w-20 h-9 bg-gray-100 animate-pulse rounded-xl" />;
  }

  if (session?.user) {
    const firstName = session.user.name?.split(" ")[0] || session.user.name;

    return (
      <div className="dropdown dropdown-end">
        {/* DaisyUI Trigger Button */}
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition cursor-pointer select-none"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User Avatar"}
              width={36}
              height={36}
              className="w-9 h-9 rounded-xl object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-bd-primary font-bold flex items-center justify-center text-sm border border-emerald-200">
              {session.user.name?.charAt(0) || "U"}
            </div>
          )}

          <span className="text-sm font-semibold text-gray-800">
            {firstName}
          </span>

          <svg
            className="w-3 h-3 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* DaisyUI Dropdown Content */}
        <div
          tabIndex={0}
          className="dropdown-content z-50 mt-2 w-64 bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-5"
        >
          {/* User Info Header */}
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-900 leading-snug">
              {session.user.name}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {session.user.email}
            </p>
          </div>

          {/* Menu Actions */}
          <div className="flex flex-col gap-1 border-t border-gray-100/80 pt-3">
            {/* My Profile Link */}
            <Link
              href="/profile"
              className="flex items-center gap-3 py-2 px-1 text-sm font-medium text-gray-700 hover:text-bd-primary transition-colors cursor-pointer rounded-lg hover:bg-gray-50/70"
            >
              <svg
                className="w-4 h-4 text-[#3B82F6] shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>আমার প্রোফাইল</span>
            </Link>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-3 py-2 px-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer rounded-lg hover:bg-red-50/50 w-full text-left"
            >
              <svg
                className="w-4 h-4 text-red-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Link href="/sign-in">
        <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-bd-text rounded-lg cursor-pointer hover:bg-gray-50 transition">
          সাইন ইন
        </button>
      </Link>
      <Link href="/sign-up">
        <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-white bg-bd-primary rounded-lg shadow-md shadow-bd-primary/40 hover:bg-bd-primary-hover transition cursor-pointer">
          সাইন আপ
        </button>
      </Link>
    </div>
  );
}
