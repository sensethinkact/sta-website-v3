import Footer from './footer'
import Meta from './meta'

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout = ({children, title}: Props) => {
  return (
    <>
      <Meta title={title} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
