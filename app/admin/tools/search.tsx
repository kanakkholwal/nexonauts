"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button";

export default function Search({ }) {
    const searchParams = useSearchParams() as URLSearchParams;
    const pathname = usePathname();
    const { replace } = useRouter();


    return <div className="flex items-stretch gap-2 flex-wrap">


        <Button variant="outline" size="sm"
            disabled={searchParams.get('page') === '1'}
            onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set('page', params.get('page') ? String(Number(params.get('page')) - 1) : '1');
                replace(`${pathname}?${params.toString()}`);
            }}>
            Prev
        </Button>
        <Button variant="outline" size="sm" onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set('page', params.get('page') ? String(Number(params.get('page')) + 1) : '1');
            replace(`${pathname}?${params.toString()}`);
        }}>
            Next
        </Button>
    </div>
}
