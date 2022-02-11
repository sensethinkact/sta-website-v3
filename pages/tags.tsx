import Head from 'next/head'
import Link from 'next/link'

import getPostLoader from '../lib/get-post-loader'
import podcastConfig from '../podcast.config'

type Props = {
  tags: string[]
}

const Tags = ({ tags }: Props) => {
  return (
    <>
      <Head>
        <title>{podcastConfig.name}</title>
        <meta name="description" content={podcastConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>Home</a>
      </Link>
      <main>
        <div className="container">
          <h1 className='title'>
            Tags
          </h1>
          <ul>
            {tags.map((tag) => (
              <li key={tag}>
                <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                  <a>{tag}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Tags

export const getStaticProps = async () => {
  const postLoader = await getPostLoader()
  return {
    props: {
      tags: postLoader.getTags()
    }
  }
}