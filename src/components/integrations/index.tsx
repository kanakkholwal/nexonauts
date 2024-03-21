import React from "react";
import { DiGithubFull } from "react-icons/di";
import { TbBrandGumroad } from "react-icons/tb";

const icons: { [key: string]: React.ElementType } = {
    "github": DiGithubFull,
    "gumroad": TbBrandGumroad,
};


interface IconProps extends React.SVGProps<SVGSVGElement> {
    icon: keyof typeof icons;

}

export const Icon = ({ icon, ...props }:IconProps) => {
    const IconComponent = icons[icon];
    
    if (!IconComponent) return null; // Handle case where icon is not found
    
    return <IconComponent {...props} />;
};
