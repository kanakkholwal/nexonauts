import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NavLink({ href, exact = false, children, ...props }) {
    const { asPath } = useRouter();

    const isActive = asPath === props.href || asPath === props.as;
    if (isActive) {
        props.className += ' active';
    }
    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}
