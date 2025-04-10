import { NewsCard } from './news-card'
import { SupabaseNews } from '@/types/news'
import { createClient } from '@/utils/supabase/server'

const fetchNews = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data as SupabaseNews[]
}

export const News = async () => {
  const data = await fetchNews()

  return (
    <section
      className='container mt-14 md:mt-20'
      id='media'
    >
      <h2 className='border-b pb-5 text-2xl leading-none font-semibold tracking-tight transition-colors md:text-3xl'>
        Media
      </h2>

      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {data.length > 0
          ? data.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
              />
            ))
          : 'No news found'}
      </div>
    </section>
  )
}
