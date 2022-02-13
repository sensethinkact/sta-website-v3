import Footer from './footer'
import Meta from './meta'

import podcastConfig from '../podcast.config'

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Meta title={title}/>
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer copyright={podcastConfig.copyright}/>
    </>
  )
}

export default Layout