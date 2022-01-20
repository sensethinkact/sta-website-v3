import { GetServerSideProps } from 'next'
import React from 'react'
import { getSortedEpisodeData } from '../lib/episodes'
import podcast from 'podcast'
import { getFileSizeAtUrl } from '../lib/get-file-size-at-url'

const RssFeed: React.FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const episodes = getSortedEpisodeData()
    const url = "https://ftp.osuosl.org/pub/ros/download.ros.org/sensethinkact/episodes/STA%20Ep%2010%20-%20Brett%20Aldrich.mp3"
    const fileSize = await getFileSizeAtUrl(url)

    res.setHeader('Content-Type', 'text/text')
    // res.setHeader('Content-Type', 'text/xml')
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${episodes.map(e => e.slug).join('; ')}
      ${fileSize}
    </urlset>`)
    res.end()
  }
  return {
    props: {},
  }
}

export default RssFeed