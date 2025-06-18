"use client";
import { Button } from "@/components/ui/button";
import {
  MobileNav,
  MobileNavHeader,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems
} from "@/components/ui/resizable-navbar";
import { nav_list } from "@/constants/links";

export default function NavbarGlobal() {


  return (
    <div className="w-full mt-6">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={nav_list} />
          <div className="flex items-center gap-4">
            <Button variant="rainbow_outline" rounded="full">Register</Button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-4">
              <Button variant="rainbow_outline" rounded="full">Register</Button>
            </div>
          </MobileNavHeader>
        </MobileNav>
      </Navbar>

    </div>
  );
}

