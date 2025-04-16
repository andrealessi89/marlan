import React, { useState } from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ProductFilter from "./ProductFilter";
import Cart from "./Cart";

function Menu({ onChange, brands, articles, genders, sizes }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-between items-center">
      
      <SheetTrigger asChild>
          <img src="images/Grupomarlan-sem-slogan.svg" alt="Grupomarlan" className="w-32 md:w-48 lg:w-52" />
          </SheetTrigger>
        <SheetTrigger asChild>
        <Button onClick={() => setIsOpen(!isOpen)} className="md:hidden" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
        <Cart />
      </div>

      
      <SheetContent className="bg-white dark:bg-gray-800 p-4" side="left">
        <nav className="flex flex-col space-y-4">
          <ProductFilter
            onChange={onChange}
            brands={brands}
            articles={articles}
            genders={genders}
            sizes={sizes}
            onClose={handleClose} 
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
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* lente */}
      <circle cx={11} cy={11} r={8} />
      {/* cabo/manípulo */}
      <line x1={21} y1={21} x2={16.65} y2={16.65} />
    </svg>
  );
}

