"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [updating, setUpdating] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const image = formData.get("image")?.toString().trim();

    if (!name || name.length < 2) {
      toast.error("দয়া করে একটি বৈধ নাম লিখুন (কমপক্ষে ২ অক্ষর)");
      return;
    }

    setUpdating(true);
    try {
      const { data: resData, error } = await updateUser({
        name: name,
        image: image || undefined, 
      });

      if (!error) {
        toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      } else {
        toast.error(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে");
      }
    } catch (err: any) {
      toast.error(err?.message || "তথ্য আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-bd-bg py-10 px-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-64 bg-white rounded-3xl animate-pulse" />
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
            তথ্য আপডেট করতে প্রথমে অ্যাকাউন্টে প্রবেশ করুন।
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
      <div className="max-w-md mx-auto">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-bd-primary transition font-medium"
          >
            <span>←</span> প্রোফাইলে ফিরে যান
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের নাম এবং ছবি পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
          </p>
        </div>

        {/* Update Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8">
          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            {/* Name Input */}
            <TextField
              isRequired
              name="name"
              defaultValue={session.user.name || ""}
              className="flex flex-col gap-1.5"
              validate={(value) => {
                if (!value || value.trim().length < 2) {
                  return "দয়া করে আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)";
                }
                return null;
              }}
            >
              <Label className="text-xs md:text-sm font-medium text-gray-700">
                নাম (Name)
              </Label>
              <Input
                placeholder="নতুন নাম লিখুন"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:border-[#047F39] focus:outline-none transition-colors text-sm text-gray-800"
              />
              <FieldError className="text-xs text-red-600 font-medium" />
            </TextField>

            {/* Image URL Input */}
            <TextField
              name="image"
              defaultValue={session.user.image || ""}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs md:text-sm font-medium text-gray-700">
                ছবির লিংক (Image URL) - ঐচ্ছিক
              </Label>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:border-[#047F39] focus:outline-none transition-colors text-sm text-gray-800"
              />
              <FieldError className="text-xs text-red-600 font-medium" />
            </TextField>

            <Button
              type="submit"
              isDisabled={updating}
              className="w-full h-11 mt-2 font-semibold text-white rounded-xl bg-[#047F39] hover:bg-[#05893E] shadow-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {updating ? "আপডেট হচ্ছে..." : "Update Information"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
