"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import UpdateProfilePage from "./update/page";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [updating, setUpdating] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };


  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-bd-bg py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-32 bg-white rounded-3xl animate-pulse" />
          <div className="h-48 bg-white rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-bd-bg flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            অনুগ্রহ করে লগইন করুন
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            আপনার প্রোফাইল দেখতে প্রথমে অ্যাকাউন্টে প্রবেশ করুন।
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="w-full h-11 bg-bd-primary hover:bg-bd-primary-hover text-white font-semibold rounded-xl transition cursor-pointer"
          >
            সাইন ইন করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-bd-bg py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                width={72}
                height={72}
                unoptimized
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-gray-200 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-emerald-100 text-bd-primary font-bold text-2xl flex items-center justify-center border border-emerald-200 shrink-0">
                {session.user.name?.charAt(0) || "U"}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                {session.user.name}
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 text-xs md:text-sm font-semibold transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <svg
              className="w-4 h-4 text-red-500"
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

        {/* Update Link Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-900">
              আপনার তথ্য পরিবর্তন করতে চান?
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              নাম এবং ছবি আপডেট করতে নিচের বাটনে ক্লিক করুন।
            </p>
          </div>
          <Link
            href="/profile/update"
            className="w-full md:w-auto px-6 py-3 font-semibold text-white rounded-xl bg-[#047F39] hover:bg-[#05893E] shadow-sm transition-all text-sm md:text-base text-center"
          >
            প্রোফাইল আপডেট করুন
          </Link>
        </div>

      </div>
    </div>
  );
}
