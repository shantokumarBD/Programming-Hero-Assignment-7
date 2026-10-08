"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const { data: resData, error } = await signUp.email({
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
        callbackURL: "/sign-in",
      });

      if (!error) {
        toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
        router.push("/sign-in");
      } else {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে");
        console.error("Sign up failed:", error);
      }
    } catch (err: any) {
      toast.error(err?.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে");
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google sign up failed:", err);
      toast.error("Google দিয়ে সাইন আপ করতে সমস্যা হয়েছে");
    }
  };

  const handleGithubSignUp = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("GitHub sign up failed:", err);
      toast.error("GitHub দিয়ে সাইন আপ করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bd-bg px-4 py-12">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-6 sm:p-8">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          {/* name */}
          <TextField
            isRequired
            name="name"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!value || value.trim().length < 2) {
                return "দয়া করে আপনার নাম লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-800">নাম</Label>
            <Input
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:border-[#047F39] focus:outline-none transition-colors text-sm text-gray-800 placeholder:text-gray-400"
            />
            <FieldError className="text-xs text-red-600 font-medium" />
          </TextField>

          {/* email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "দয়া করে একটি বৈধ ইমেইল ঠিকানা লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-800">ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:border-[#047F39] focus:outline-none transition-colors text-sm text-gray-800 placeholder:text-gray-400"
            />
            <FieldError className="text-xs text-red-600 font-medium" />
          </TextField>

          {/* password */}
          <TextField
            isRequired
            name="password"
            className="flex flex-col gap-1.5"
            onChange={(val) => setPassword(val)}
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-800">পাসওয়ার্ড</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full h-11 px-3.5 pr-10 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:border-[#047F39] focus:outline-none transition-colors text-sm text-gray-800 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <FieldError className="text-xs text-red-600 font-medium" />
          </TextField>

          {/* confirm password */}
          <TextField
            isRequired
            name="confirmPassword"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value !== password) {
                return "পাসওয়ার্ড মিলছে না";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-800">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="আবার লিখুন"
                className="w-full h-11 px-3.5 pr-10 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:border-[#047F39] focus:outline-none transition-colors text-sm text-gray-800 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <FieldError className="text-xs text-red-600 font-medium" />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full h-11 mt-1 font-semibold text-white rounded-xl bg-[#047F39] hover:bg-[#05893E] shadow-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-center cursor-pointer"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">অথবা</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Sign Up */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            onPress={handleGoogleSignUp}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-semibold text-gray-700 shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
          </Button>

          <Button
            type="button"
            onPress={handleGithubSignUp}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-semibold text-gray-700 shadow-sm cursor-pointer"
          >
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
          </Button>
        </div>

        {/* Sign In link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#047F39] hover:text-[#05893E] hover:underline transition-colors"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Return to Home link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-1"
        >
          <span>←</span> হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}