import Link from "next/link";
import CategoryList from "./CategoryList";
import { getCategories } from "@/lib/api";


const NavLinks = async () => {
  const categories = await getCategories();

  return (
    <div>
      <CategoryList categories={categories}></CategoryList>
    </div>
  );
};

export default NavLinks;
