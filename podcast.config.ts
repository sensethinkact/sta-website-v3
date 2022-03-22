import type {
  Link,
  PodcastConfig as PodcastConfigImported,
} from '@sta-podcast/types'
import urlJoin from 'proper-url-join'
import {IMAGES_URL} from './lib/constants'

const siteUrl = 'https://sensethinkact.com'
const feedFile = 'itunes.xml'
const feedUrl = `${siteUrl}/${feedFile}`
const googleAnalyticsId = 'G-X1WYK4V72V'

const appleUrl =
  'https://podcasts.apple.com/us/podcast/sense-think-act/id1582090036'
const spotifyUrl = 'https://open.spotify.com/show/52wK4oMDvgijRk6E82tC5d'
const youtubeUrl = 'https://www.youtube.com/c/SenseThinkActPodcast'
const youtubeClipsUrl =
  'https://www.youtube.com/channel/UChfnCpNwZzYtZ32J-pZvNDg'
const googleUrl =
  'https://podcasts.google.com/feed/aHR0cHM6Ly9zZW5zZXRoaW5rYWN0LmNvbS9pdHVuZXMueG1s'
const overcastUrl = 'https://overcast.fm/itunes1582090036/sense-think-act'
const pocketcastsUrl = 'https://pca.st/g667w2c4'

const twitterUrl = 'https://twitter.com/sense_think_act'
const discourseUrl = 'https://discourse.ros.org/c/sensethinkact/71'
const staEmail = 'sensethinkact@googlegroups.com'
const staEmailUrl = `mailto:${staEmail}`

export type PodcastConfig = {
  availableOn: {[site: string]: {url: string; iconUrl: string}}
  footer: Link[]
  host: string
  googleAnalyticsId: string
} & PodcastConfigImported

const podcastConfig: PodcastConfig = {
  name: 'Sense Think Act Podcast',
  host: 'Audrow Nash',
  tagline: 'Conversations about robotics',
  description:
    'An accessible, long-form podcast about all areas of robotics that is hosted by Audrow Nash and sponsored by Open Robotics.',
  copyright: `© ${new Date().getFullYear()} Open Source Robotics Foundation`,
  owner: {
    name: 'Open Robotics',
    email: staEmail,
  },
  github: {
    organization: 'sensethinkact',
    repository: 'www.sensethinkact.com',
  },
  itunes: {
    feedFile,
    feedUrl,
    categories: ['Technology'],
    isExplicit: false,
    type: 'episodic',
    image: urlJoin(siteUrl, IMAGES_URL, 'cover.jpg'),
    language: 'en-us',
  },
  hosting: {
    baseMp3Url:
      'https://ftp.osuosl.org/pub/ros/download.ros.org/sensethinkact/episodes/',
  },
  siteUrl,
  googleAnalyticsId,
  links: {
    podcast: [
      {
        name: 'Podcast website',
        url: siteUrl,
      },
      {
        name: 'Apple Podcasts',
        url: appleUrl,
      },
      {
        name: 'Spotify',
        url: spotifyUrl,
      },
      {
        name: 'RSS',
        url: feedUrl,
      },
      {
        name: 'Full episodes',
        url: youtubeUrl,
      },
      {
        name: 'Clips',
        url: youtubeClipsUrl,
      },
    ],
    social: [
      {
        name: 'Twitter',
        url: twitterUrl,
      },
      {
        name: 'Discourse',
        url: discourseUrl,
      },
    ],
  },
  availableOn: {
    apple: {
      url: appleUrl,
      iconUrl: urlJoin(IMAGES_URL, 'apple.svg'),
    },
    spotify: {
      url: spotifyUrl,
      iconUrl: urlJoin(IMAGES_URL, 'spotify.svg'),
    },
    google: {
      url: googleUrl,
      iconUrl: urlJoin(IMAGES_URL, 'google.svg'),
    },
    overcast: {
      url: overcastUrl,
      iconUrl: urlJoin(IMAGES_URL, 'overcast.svg'),
    },
    pcaUrl: {
      url: pocketcastsUrl,
      iconUrl: urlJoin(IMAGES_URL, 'pocketcasts.svg'),
    },
    youtube: {
      url: youtubeUrl,
      iconUrl: urlJoin(IMAGES_URL, 'youtube.svg'),
    },
    rss: {
      url: `/${feedFile}`,
      iconUrl: urlJoin(IMAGES_URL, 'rss.svg'),
    },
  },
  footer: [
    {
      name: 'Twitter',
      url: twitterUrl,
    },
    {
      name: 'Discourse',
      url: discourseUrl,
    },
    {
      name: 'Contact',
      url: staEmailUrl,
    },
  ],
}

export default podcastConfig
