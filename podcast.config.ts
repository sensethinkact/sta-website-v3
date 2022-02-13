import {join} from 'path'
import type { PodcastConfig as PodcastConfigImported } from '@sta-podcast/types'

const siteUrl = 'https://sensethinkact.com/'
const feedFile = 'itunes.xml'
const feedUrl = join(siteUrl, feedFile)

const appleUrl = 'https://podcasts.apple.com/us/podcast/sense-think-act/id1582090036'
const spotifyUrl = 'https://open.spotify.com/show/52wK4oMDvgijRk6E82tC5d'
const youtubeUrl = 'https://www.youtube.com/c/SenseThinkActPodcast'
const youtubeClipsUrl = 'https://www.youtube.com/channel/UChfnCpNwZzYtZ32J-pZvNDg'
const googleUrl = 'https://podcasts.google.com/feed/aHR0cHM6Ly9zZW5zZXRoaW5rYWN0LmNvbS9pdHVuZXMueG1s'
const overcastUrl = 'https://overcast.fm/itunes1582090036/sense-think-act'
const pocketcastsUrl = 'https://pca.st/g667w2c4'
const imageDir = join('/img')

export type PodcastConfig = {
  availableOn: {[site: string]: {url: string, iconUrl: string}}
} & PodcastConfigImported

const podcastConfig: PodcastConfig = {
  name: 'Sense Think Act Podcast',
  tagline: 'Conversations about robotics',
  description:
    'An accessible, long-form podcast about all areas of robotics that is hosted by Audrow Nash and sponsored by Open Robotics.',
  copyright: `© ${new Date().getFullYear()} Open Source Robotics Foundation`,
  owner: {
    name: 'Open Robotics',
    email: 'sensethinkact@googlegroups.com',
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
    image: 'https://www.sensethinkact.com/assets/img/cover.jpg',
    language: 'en-us',
  },
  hosting: {
    baseMp3Url:
      'https://ftp.osuosl.org/pub/ros/download.ros.org/sensethinkact/episodes/',
  },
  siteUrl,
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
        url: 'https://twitter.com/sense_think_act',
      },
      {
        name: 'Discourse',
        url: 'https://discourse.ros.org/c/sensethinkact/71',
      },
    ],
  },
  availableOn: {
    apple: {
      url: appleUrl,
      iconUrl: join(imageDir, 'apple.svg'),
    },
    spotify: {
      url: spotifyUrl,
      iconUrl: join(imageDir, 'spotify.svg'),
    },
    google: {
      url: googleUrl,
      iconUrl: join(imageDir, 'google.svg'),
    },
    overcast: {
      url: overcastUrl,
      iconUrl: join(imageDir, 'overcast.svg'),
    },
    pcaUrl: {
      url: pocketcastsUrl,
      iconUrl: join(imageDir, 'pocketcasts.svg'),
    },
    youtube: {
      url: youtubeUrl,
      iconUrl: join(imageDir, 'youtube.svg'),
    },
    rss: {
      url: feedUrl,
      iconUrl: join(imageDir, 'rss.svg'),
    }
  },
}

export default podcastConfig
