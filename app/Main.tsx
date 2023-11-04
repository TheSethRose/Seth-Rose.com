import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import SocialIcon from '@/components/social-icons'
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
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h2 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            About Me
          </h2>
        </div>
        <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
          <div className='flex flex-col items-center space-x-2 pt-8'>
            {avatar && (
              <Image
                src={avatar}
                alt='avatar'
                width={192}
                height={192}
                className='h-48 w-48 rounded-full'
              />
            )}
            <h3 className='pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight'>
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
              As a Senior Software Engineer with expertise in the ServiceNow
              platform, I guide businesses through their digital transformation
              by crafting tailored solutions that boost efficiency, automate
              operations, and unlock valuable insights to advance their digital
              goals. My passion for cutting-edge gadgets fuels my ongoing
              learning, enhancing my programming skills in languages like
              JavaScript and Python, and keeping me up-to-date with the latest
              in AI technology. This relentless pursuit of knowledge ensures
              that my contributions remain effective and relevant in the rapidly
              evolving tech landscape.
            </p>
            <p>
              My commitment extends beyond my professional life. I place high
              value on the balance between work and personal time, understanding
              that it's essential for personal growth and success in the tech
              field. This balance helps me stay creative and refreshed. Through
              my digital portfolio, my aim is to share my journey and insights,
              inviting the tech community to explore and discuss innovative
              ideas. By highlighting my projects and sharing my experiences in
              blog posts, I aim to enrich the collective understanding and spark
              meaningful engagement in the dynamic arena of technology.
            </p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className='my-8 border-t border-gray-200 dark:border-gray-700'></div>

      {/* Latest Posts Section */}
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h2 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Latest Posts
          </h2>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
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
                          <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                            <Link
                              href={`/blog/${slug}`}
                              className='text-gray-900 dark:text-gray-100'
                            >
                              {title}
                            </Link>
                          </h2>
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
                          aria-label={`Read more: "${title}"`}
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
