/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ProductFilter from "./ProductFilter";
import Cart from "./Cart";

function Menu({ onChange, brands, articles, genders, sizes }) {
  return (
    <Sheet>
      <div className="flex justify-between items-center">
        <Link href="/">
          <img src='https://grupomarlan.com.br/wp-content/uploads/2021/06/Grupomarlan-sem-slogan.svg' alt='Grupomarlan' width={200}/>
        </Link>
        <Cart />
      </div>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="ghost">
          <MenuIcon/>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-gray-800 p-4" side="left">
        <nav className="flex flex-col space-y-4">
          <ProductFilter
            onChange={onChange}
            brands={brands}
            articles={articles}
            genders={genders}
            sizes={sizes}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default Menu;



function MenuIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
