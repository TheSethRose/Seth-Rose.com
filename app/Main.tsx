import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

const MAX_DISPLAY = 3

export default function Home({ posts }) {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const content = coreContent(author)

  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
  } = content

  return (
    <>
      {/* About Me Section */}
      <div className='divide-y divide-gray-200 dark:divide-gray-700 my-1'>
        <div className='space-y-2 pb-4 pt-3 md:space-y-5 max-w-6xl mx-auto'>
          <h3 className='text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14'>
            Hi there! I'm Seth!
          </h3>
        </div>
        <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 mt-4 mb-4 max-w-6xl mx-auto'>
          <div className='flex flex-col items-center space-x-2 pt-4'>
            {avatar && (
              <Image
                src={avatar}
                alt='avatar'
                width={192}
                height={192}
                className='h-36 w-36 rounded-full'
              />
            )}
            <h3 className='pt-4 text-xl font-bold leading-8 tracking-tight'>
              {name}
            </h3>
            <div className='text-gray-500 dark:text-gray-400'>{occupation}</div>
            <div className='text-gray-500 dark:text-gray-400'>{company}</div>
          </div>
          <div className='prose max-w-none pt-4 pb-4 dark:prose-invert xl:col-span-2'>
            <p>
              I'm a Senior Software Engineer specializing in the ServiceNow
              platform. I’m passionate about creating streamlined, automated
              solutions that deliver key for my clients. My enthusiasm for the
              latest tech news and gadgets further enhances my skills in
              JavaScript, Python, and AI.
            </p>
            <p>
              Beyond my professional role, I value a work-life balance that
              inspires my creativity and career growth. My digital portfolio is
              where I share my technological pursuits, keeping the world in the
              loop on my latest projects and developments.
            </p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className='mt-4 border-t border-gray-200 dark:border-gray-700'></div>

      {/* Latest Posts Section */}
      <div className='divide-y divide-gray-200 dark:divide-gray-700 my-1'>
        <div className='space-y-2 pb-4 pt-3 md:space-y-5 max-w-6xl mx-auto'>
          <h3 className='text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14'>
            Latest Blog Posts
          </h3>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700 max-w-6xl mx-auto'>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className='py-8'>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-3 xl:items-baseline xl:space-y-0'>
                    <dl>
                      <dt className='sr-only'>Published on</dt>
                      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400 text-center'>
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className='space-y-5 xl:col-span-2'>
                      <div className='space-y-6'>
                        <div>
                          <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                            <Link
                              href={`/blog/${slug}`}
                              className='text-gray-900 dark:text-gray-100'
                            >
                              {title}
                            </Link>
                          </h3>
                          <div className='flex flex-wrap'>
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                          {summary}
                        </div>
                      </div>
                      <div className='text-base font-medium leading-6'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='mt-4 border-t border-gray-200 dark:border-gray-700'></div>
    </>
  )
}
