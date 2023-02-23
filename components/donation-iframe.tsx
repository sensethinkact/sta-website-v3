// @ts-nocheck

import Script from 'next/script'


function DonationIframe() {
    return (
        <div className="block columns is-narrow is-centered">
            <Script src="https://donorbox.org/widget.js" paypalExpress="false"></Script>
            <iframe src="https://donorbox.org/embed/sense-think-act-podcast" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="900px" width="100%"
                style={{ "max-width": "500px", "min-width": "250px", "max-height": "none!important" }}
            ></iframe>
        </div>
    )
}

export default DonationIframe