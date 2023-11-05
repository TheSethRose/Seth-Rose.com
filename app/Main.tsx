import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import tagData from 'app/tag-data.json'

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
      {/* Content Section */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 max-w-6xl mx-auto'>
        {/* Left Column for Avatar and Info */}
        <div className='md:col-span-1'>
          <div className='flex flex-col items-center'>
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
          <div className='tag-list'>
            {Object.entries(tagData).map(([tagName, count]) => (
              <div key={tagName} className='tag'>
                <a href={`/tags/${slug(tagName)}`}>
                  {`${tagName.toUpperCase()} (${count})`}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column for Blurb and Blog Posts */}
        <div className='md:col-span-3'>
          <div className='divide-y divide-gray-200 dark:divide-gray-700 my-1'>
            <div className='prose max-w-none dark:prose-invert mb-8'>
              <h1 className='text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14'>
                Hi there! I'm Seth!
              </h1>
              <p>
                I'm a Senior Software Engineer specializing in the ServiceNow
                platform. I’m passionate about creating streamlined, automated
                solutions that deliver key for my clients. My enthusiasm for the
                latest tech news and gadgets further enhances my skills in
                JavaScript, Python, and AI.
              </p>
              <p>
                Beyond my professional role, I value a work-life balance that
                inspires my creativity and career growth. My digital portfolio
                is where I share my technological pursuits, keeping the world in
                the loop on my latest projects and developments.
              </p>
            </div>

            {/* Separator */}
            <div className='border-t border-gray-200 dark:border-gray-700'></div>

            {/* Latest Posts Section */}
            <div className='space-y-2 pb-4 pt-3'>
              <h3 className='text-2xl font-extrabold leading-9 tracking-tight'>
                Latest Blog Posts
              </h3>
            </div>
            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((post) => {
                const { slug, date, title, summary, tags } = post
                return (
                  <li key={slug} className='py-8'>
                    <article>
                      <div className='space-y-2'>
                        <dl>
                          <dt className='sr-only'>Published on</dt>
                          <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                            <time dateTime={date}>{formatDate(date)}</time>
                          </dd>
                        </dl>
                        <div>
                          <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                            <Link href={`/blog/${slug}`}>{title}</Link>
                          </h3>
                          <div className='flex flex-wrap'>
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className='prose max-w-none'>{summary}</div>
                        <Link
                          href={`/blog/${slug}`}
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {posts.length > MAX_DISPLAY && (
              <div className='text-base font-medium leading-6'>
                <Link href='/blog' aria-label='all posts'>
                  All Posts &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
