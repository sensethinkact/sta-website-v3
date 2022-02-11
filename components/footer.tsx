type Props = {
  copyright: string
}
const Footer = ({copyright}: Props) => {
  return (
    <>
      <nav className="content has-text-centered">
        <div className="columns is-variable is-3 is-multiline is-centered">
          <div className="column is-narrow">
            <a href="{{site.sites.twitter}}" target="_blank">
              Twitter
            </a>
          </div>
          <div className="column is-narrow">
            <a href="mailto:sensethinkact@googlegroups.com" target="_blank" rel="noreferrer">
              Contact
            </a>
          </div>
          <div className="column is-12">
            {copyright}
          </div>
        </div>
      </nav>
    </>

  )
}

export default Footer