import Script from "next/script"
import endent from "endent"

type Props = {
  pageUrl: string
}

const Comments = ({ pageUrl}: Props) => {
  return (
    <>
      <section className="comments">
        <div id='discourse-comments'></div>
      </section>

      <Script type="text/javascript" id="discourse-comments" strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            DiscourseEmbed = {
              discourseUrl: 'https://discourse.ros.org/',
              discourseEmbedUrl: '${pageUrl}',
            };

            (function() {
              const d = document.createElement('script');
              d.type = 'text/javascript'; d.async = true;
              d.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
            })();
          `
        }}
      />
    </>
  )
}

export default Comments