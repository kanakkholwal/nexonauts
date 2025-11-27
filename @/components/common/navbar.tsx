"use client";
import {
  MobileNav,
  MobileNavHeader,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems
} from "@/components/ui/resizable-navbar";
import { ButtonLink } from "@/components/utils/link";
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
            <ButtonLink variant="rainbow_outline" rounded="full" href="/signup">Register</ButtonLink>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-4">
              <ButtonLink variant="rainbow_outline" rounded="full" href="/signup">Register</ButtonLink>
            </div>
          </MobileNavHeader>
        </MobileNav>
      </Navbar>

    </div>
  );
}

