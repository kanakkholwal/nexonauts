import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NavLink({ href, exact = false, children, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}
