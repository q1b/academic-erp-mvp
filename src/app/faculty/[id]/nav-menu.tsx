'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function SidebarNavMenu() {
    const pathname = usePathname();
    const params = useParams<{ id: string; }>()

    const panels = [
        {
            label: 'Faculties',
            slug: '/faculties'
        },
        {
            label: 'Departments',
            slug: '/departments'
        },
        {
            label: 'Programs',
            slug: '/programs'
        },
        {
            label: 'Courses',
            slug: '/courses'
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
        <SidebarMenu>
            {panels.map(panel => (
                <SidebarMenuItem key={panel.slug} >
                    <SidebarMenuButton isActive={pathname === `/faculty/${params.id}${panel.slug}`} asChild>
                        <Link href={`/faculty/${params.id}${panel.slug}`}>
                            {panel.label}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}