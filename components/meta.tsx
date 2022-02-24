import Head from 'next/head'
import podcastConfig from '../podcast.config'

type Props = {
  title?: string
}

const Meta = ({title = podcastConfig.name}: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={podcastConfig.description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </Head>
  )
}

export default Meta
