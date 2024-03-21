import React from "react";
import { DiGithubFull } from "react-icons/di";
import { TbBrandGumroad } from "react-icons/tb";

const icons: { [key: string]: React.ElementType } = {
    "github": DiGithubFull,
    "gumroad": TbBrandGumroad,
};
const descriptions: { [key: string]: string } = {
    "github": "Import your GitHub repositories and activity.",
    "gumroad": "Import your Gumroad products."
}

export const INTEGRATIONS = Object.keys(icons);
export const INTEGRATION_DESCRIPTIONS = descriptions;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    icon: keyof typeof icons;

}

export const Icon = ({ icon, ...props }:IconProps) => {
    const IconComponent = icons[icon];
    
    if (!IconComponent) return null; // Handle case where icon is not found
    
    return <IconComponent {...props} />;
};
