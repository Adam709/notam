'use client'

import Link from 'next/link'

import { Button } from './ui/button'

const navItems = [
  { href: '/#tracker', label: 'Tracker' },
  { href: '/#reports', label: 'Reports' },
  { href: '/#media', label: 'Media' }
]

export const HeaderNav = () => {
  return (
    <nav>
      <ul className='flex items-center gap-4'>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              scroll
            >
              <Button
                size='sm'
                variant={'ghost'}
              >
                {item.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
