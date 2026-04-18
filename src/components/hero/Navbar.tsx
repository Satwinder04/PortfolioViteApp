import { useState } from "react";
import { Menu } from "lucide-react";
import NavMenu from "../NavMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="select-none text-light text-3xl flex justify-between w-full items-center h-[90px] px-8 absolute top-0 z-40">
        <p className="text-3xl">SS</p>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Open menu"
        >
          <Menu size={32} />
        </button>
      </div>
      <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
