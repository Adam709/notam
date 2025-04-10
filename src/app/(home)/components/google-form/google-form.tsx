import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const GoogleForm = () => {
  return (
    <section
      className='container mt-14 border-b pb-5 md:mt-20'
      id='reports'
    >
      <h2 className='text-2xl leading-none font-semibold tracking-tight transition-colors md:text-3xl'>
        Pilot & Airport Reports
      </h2>
      <Link
        className='mt-3 block'
        href='https://docs.google.com/forms/d/e/1FAIpQLSdDHNLpCmB-Q5kkR81fxAtBlH76gw_kur5xDNt0IvZqEB2z9Q/viewform'
        target='_blank'
      >
        <Button>Leave a complaint</Button>
      </Link>
    </section>
  )
}
