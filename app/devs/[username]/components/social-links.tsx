import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from 'lucide-react';

interface SocialLink {
    name: string;
    url: string;

}

export default function SocialLinks({ socials }: { socials: SocialLink[] }) {

    return (<>
        <div className="flex flex-row items-center justify-start gap-2">
            {socials.map((link: SocialLink) => {
                return <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>
                    <Badge variant="default_light">
                        {/* <Icon className="h-4 w-4"/> */}
                        {link.name}
                        <ArrowUpRight className="h-4 w-4" />
                    </Badge>
                </a>
            })}
        </div>
    </>)

}
