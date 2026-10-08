import Link from "next/link";
import CategoryList from "./CategoryList";
import { getCategories } from "@/lib/api";
import { Suspense } from "react";

const NavLinks = async () => {
  const categories = await getCategories();

  return (
    <div>
      <Suspense
        fallback={
          <div className="py-2 text-sm text-gray-500">
            ক্যাটাগরি লোড হচ্ছে...
          </div>
        }
      >
        <CategoryList categories={categories} />
      </Suspense>
    </div>
  );
};

export default NavLinks;
