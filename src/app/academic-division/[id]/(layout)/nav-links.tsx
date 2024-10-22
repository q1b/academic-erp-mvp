'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks() {
    const pathname = usePathname();
    const params = useParams<{ id: string; }>()

    const panels = [
        {
            label: 'Faculties',
            slug: '/faculties'
        },
        {
            label: 'Programs',
            slug: '/programs'
        },
        {
            label: 'News & Events',
            slug: '/news-events'
        },
        {
            label: 'Settings',
            slug: '/settings'
        }
    ]
    return (
        <nav className="flex items-center gap-x-6 pl-4">
            {panels.map(panel => (
                <Link
                    key={panel.label}
                    className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium aria-[current='true']:bg-gray-100 text-gray-900 hover:bg-gray-50 hover:text-gray-900" 
                    aria-current={pathname === `/academic-division/${params.id}${panel.slug}`}
                    href={`/academic-division/${params.id}${panel.slug}`}
                >
                    {panel.label}
                </Link>
            ))}
        </nav>
    )
}