import Link from "next/link";
import React from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const getCategories = async():Promise<Category[]> =>{
    try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories',{
            next: {revalidate: 3600}
        })
        if(!res.ok)return [];
        return res.json()
    } catch (error) {
        throw new Error("Failed to fetch categories:");
    }
}

const NavLinks = async() => {

    const categories =await getCategories()

  return(
  <div>
    <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm hide-scrollbar">
        {categories?.map((category) => (
            <li key={category.slug} className="shrink-0">
                <Link href={`/category/${category.slug}`} className="btn btn-sm whitespace-nowrap btn-ghost font-normal text-bd-text-muted hover:text-bd-text">
                    <span aria-hidden="true" className="text-base">{category.icon}</span>
                    {category.nameBn}
                </Link>
            </li>
        ))}
    </ul>
  </div>
)};

export default NavLinks;
