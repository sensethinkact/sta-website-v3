import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "bulma/css/bulma.css"
import getPostLoader from '../lib/get-post-loader'

import podcastConfig from '../podcast.config'
import type { SerializedPost } from '@sta-podcast/types'
import Link from 'next/link'

type Props = {
  posts: SerializedPost[]
}

const Home = ({posts}: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{podcastConfig.name}</title>
        <meta name="description" content={podcastConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Main site
        </h1>

        <div>
          <ul>
            {posts.map(p => (
              <li key={p.slug}>
                <Link href="/episodes/[slug]" as={`/episodes/${p.slug}`}>
                  <a>{p.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="block">
          <h2 className="title is-4">Available on</h2>
            <div className="columns is-mobile is-multiline is-variable is-2">
              <div className="column is-narrow">
                <a href="{{ site.sites.apple-podcasts }}" target="_blank">
                <figure className="image is-48x48">
                  <Image src="/img/apple.svg" layout='fill' alt="Apple Podcast logo"/>
                </figure>
                </a>
              </div>
              <div className="column is-narrow">
                <a href="{{ site.sites.spotify }}" target="_blank">
                <figure className="image is-48x48">
                  <Image src="/img/spotify.svg" layout='fill' alt="Spotify logo"/>
                </figure>
                </a>
              </div>
              <div className="column is-narrow">
                <a href="{{ site.sites.google-podcasts }}" target="_blank">
                <figure className="image is-48x48">
                    <Image src="/img/google.svg" layout='fill' alt="Google Podcasts Logo"/>
                </figure>
                </a>
              </div>
              <div className="column is-narrow">
                <a href="{{ site.sites.overcast }}" target="_blank">
                  <figure className="image is-48x48">
                    <Image src="/img/overcast.svg" layout='fill' alt="Overcast Logo"/>
                  </figure>
                </a>
              </div>
              <div className="column is-narrow">
                <a href="{{ site.sites.pocketcasts }}" target="_blank">
                  <figure className="image is-48x48">
                    <Image src="/img/pocketcasts.svg" layout='fill' alt="Pocketcasts Logo"/>
                  </figure>
                </a>
              </div>
              <div className="column is-narrow">
                <a href="{{ site.sites.youtube }}" target="_blank">
                <figure className="image is-48x48">
                  <Image src="/img/youtube.svg" layout='fill' alt="Youtube Logo"/>
                </figure>
                </a>
              </div>
              <div className="column is-narrow">
                <a href="/itunes.xml" target="_blank">
                  <figure className="image is-48x48">
                    <Image src="/img/rss.svg" layout='fill' alt="RSS Logo"/>
                  </figure>
                </a>
              </div>
            </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {
  const postLoader = await getPostLoader()
  return {
    props: {
      posts: postLoader.getPosts()
    }
  }
}

export default Home
