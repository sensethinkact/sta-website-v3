import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

import type Episode from '../types/Episode'

const episodesDirectory = path.join(process.cwd(), 'episodes')

// TODO leverage example from
// https://github.com/vercel/next-learn/blob/master/basics/typescript-final/lib/posts.ts

export function getSortedEpisodeData(){
  const episodes = fs.readdirSync(episodesDirectory)
  const episodeData = episodes.map(episode => {
    const episodePath = path.join(episodesDirectory, episode)
    const episodeYaml = fs.readFileSync(path.join(episodePath, 'info.yaml'), 'utf8')
    const episodeYamlData = YAML.parse(episodeYaml) as Episode
    return episodeYamlData
  })
  return episodeData.sort(({ publicationDate: a }, { publicationDate: b }) => {
    if (a > b) {
      return -1
    }
    if (a < b) {
      return 1
    }
    return 0
  })
}
