"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { CiMenuKebab } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { enabledNewVote, navbarOptions } from "@/data";
import Button from "../atoms/Button";
import IconButton from "../atoms/IconButton";

const Navbar = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <nav
        className={twMerge(
          "w-full py-6 text-sm text-black relative",
          openMenu ? "bg-white" : ""
        )}
      >
        <div className="container px-4 mx-auto flex justify-between items-center h-full">
          <Link href="/" className="text-lg font-orbitron flex-1">
            Misión Guanare 63
          </Link>

          <ul className="hidden text-md gap-3 flex-1 justify-center sm:gap-12 md:flex md:gap-16 xl:gap-20">
            {navbarOptions.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="uppercase font-medium">
                  {item.name}
                </Link>
                {item.href === pathname && (
                  <div className="w-[50%] h-0.5 mt-0.5 rounded-full mx-auto bg-black" />
                )}
              </li>
            ))}
          </ul>

          <div className="flex-1 flex items-center justify-end gap-2">
            {enabledNewVote && (
              <Link href="/nuevo-voto" className="hidden md:flex">
                <Button
                  label="Votar"
                  variant="white"
                  className="uppercase"
                  id="vote"
                />
              </Link>
            )}

            <IconButton
              variant={openMenu ? "secondary" : "white"}
              className="uppercase flex md:hidden"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? (
                <IoCloseOutline size={14} />
              ) : (
                <CiMenuKebab size={14} />
              )}
            </IconButton>
          </div>
        </div>

        {openMenu && (
          <nav className="absolute top-[100%] left-0 w-full py-2 text-xs bg-white text-black rounded-b-lg flex flex-col uppercase font-medium md:hidden">
            {navbarOptions.map((item) => (
              <Link href={item.href} className="px-4 py-3" key={item.href}>
                {item.name}
              </Link>
            ))}
            {enabledNewVote && (
              <Link href="/nuevo-voto" className="px-4 py-3">
                Votar
              </Link>
            )}
          </nav>
        )}
      </nav>
    </>
  );
};

export default Navbar;
