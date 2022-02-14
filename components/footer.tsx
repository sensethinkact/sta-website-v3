import podcastConfig from '../podcast.config'
const Footer = () => {
  return (
    <>
      <nav className="content has-text-centered">
        <div className="columns is-variable is-3 is-multiline is-centered">
          {
            podcastConfig.footer.map(link => {
              return (
                <div key={link.name} className="column is-narrow">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </div>
              )
            })
          }
          <div className="column is-12">
            {podcastConfig.copyright}
          </div>
        </div>
      </nav>
    </>

  )
}

export default Footer