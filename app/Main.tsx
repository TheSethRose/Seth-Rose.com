import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

const MAX_DISPLAY = 3

/**
 * Renders the home page.
 *
 * @param {Object} posts - an array of posts
 * @return {JSX.Element} the rendered home page
 */
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
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5 max-w-6xl mx-auto'>
          <h3 className='text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14'>
            Hi there! I'm Seth!
          </h3>
        </div>
        <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 mt-1 mb-1 max-w-6xl mx-auto'>
          <div className='flex flex-col items-center space-x-2 pt-8'>
            {avatar && (
              <Image
                src={avatar}
                alt='avatar'
                width={192}
                height={192}
                className='h-36 w-36 rounded-full'
              />
            )}
            <h3 className='pb-2 pt-4 text-xl font-bold leading-8 tracking-tight'>
              {name}
            </h3>
            <div className='text-gray-500 dark:text-gray-400'>{occupation}</div>
            <div className='text-gray-500 dark:text-gray-400'>{company}</div>
            <div className='flex space-x-3 pt-6'>
              <SocialIcon kind='mail' href={`mailto:${email}`} />
              <SocialIcon kind='github' href={github} />
              <SocialIcon kind='linkedin' href={linkedin} />
              <SocialIcon kind='twitter' href={twitter} />
            </div>
          </div>
          <div className='prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2'>
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
      <div className='my-1 border-t border-gray-200 dark:border-gray-700'></div>

      {/* Latest Posts Section */}
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5 max-w-6xl mx-auto'>
          <h3 className='text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14'>
            Latest Posts
          </h3>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700 max-w-6xl mx-auto'>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className='py-12'>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                    <dl>
                      <dt className='sr-only'>Published on</dt>
                      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className='space-y-5 xl:col-span-3'>
                      <div className='space-y-6'>
                        <div>
                          <h3 className='text-xl font-bold leading-8 tracking-tight'>
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
                        <div className='prose text-gray-500 max-w-none dark:text-gray-400'>
                          {summary}
                        </div>
                      </div>
                      <div className='text-base font-medium leading-6'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                          aria-label={`Read "${title}"`}
                        >
                          Read more →
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
      {posts.length > MAX_DISPLAY && (
        <div className='flex justify-end text-base font-medium leading-6'>
          <Link
            href='/blog'
            className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
            aria-label='All posts'
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
