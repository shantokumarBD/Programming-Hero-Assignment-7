"use client";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm hide-scrollbar">
      {categories?.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        return (
          <li key={category.slug} className="shrink-0">
            <Link
              href={`/category/${category.slug}`}
              className={`btn btn-sm whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-bd-primary font-bold text-white shadow-sm hover:shadow-md hover:shadow-bd-primary/50 "
                  : "btn-ghost font-normal text-bd-text-muted hover:text-bd-text"
              }`}
            >
              <span aria-hidden="true" className="text-base ">
                {category.icon}
              </span>
              {category.nameBn}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
