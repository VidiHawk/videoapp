import React from 'react'
import handleViewport from './../Elements/HandleViewPort'

const PrivacyPolicy = (props) => {
  const { forwardedRef, inViewport } = props
  return (
    <div className="settings-container-section" ref={forwardedRef} id={props.id}>
      <div className="container-terms">
        <div className="settings-title-container">PRIVACY POLICY</div>
        <div className="settings-desc-container mt-3">
          EMK PRODUCTS, LLC (EMK) is strongly committed to protecting the online privacy on this website of its
          visitors, customers, and friends. We do not collect and keep any personal information from you — unless you
          volunteer it and are age 13 or older. By using this site, you signify your acceptance of our Online Privacy
          Policy.
        </div>
        <div className="settings-title-container">Online Security</div>
        <div className="settings-desc-container">
          Your security is important to us. We use industry-standard Secure Sockets Layer (&quot;SSL&quot;)
          authentication to guarantee the confidentiality of online transactions made on our site. SSL authentication
          and encryption of the information that you send to us over the Internet help protect your online transaction
          information from third party interception.
          <br />
          <br /> We never display your full credit card number once it has been entered. We will only reveal the last
          four digits of your credit card for verification purposes. We urge you to protect your own privacy. We
          recommend that you do not share your password with anyone or share your password in an unsolicited phone call
          or e-mail.
        </div>
        <div className="settings-title-container">Public Information</div>
        <div className="settings-desc-container">
          Please note that if you choose to share information about yourself in an open format, such as through a Third
          Party Site like Face book or Twitter or in the user-generated content elements of our own Sites, we consider
          that information to be public information, not personal information.
        </div>
        <div className="settings-title-container">Personal Information</div>
        <div className="settings-desc-container">
          EMK collects personal information primarily to make our services more rewarding for you to use. We usually use
          this information for internal purposes, such as studying our customers preferences. We may also use your
          information to contact you for account and promotional purposes.
        </div>
        <div className="settings-title-container">When You Register</div>
        <div className="settings-desc-container">
          Visitors may browse our website without registering or submitting any personally identifiable information.
          However, we may ask you to provide personally identifiable information at various times and places on this
          website. In some cases, if you choose not to provide us with the requested information, you may not be able to
          access all of this website or participate in all of its features. If you decide to register with us online,
          you will be asked to provide personally identifiable information that may include a user name and password,
          your name, email address, postal address, and telephone number. We store this information, along with your
          other preferences, on our secured server so that you need not reenter it when you return to the site.
        </div>
        <div className="settings-title-container">When You Shop Online at our Store</div>
        <div className="settings-desc-container">
          Our store will ask you to provide personally identifiable information necessary to fulfill your order. This
          can include your name, billing and shipping addresses, email address, telephone number, and credit card
          information. When you make a purchase online at our Store, your credit card information will be temporarily
          stored on a secured server. We will retain the personally identifiable information you provided with your
          order for our records, to facilitate customer service, and to inform you of our products and promotional
          offers.
        </div>
        <div className="settings-title-container">What We Do With Information Collected On this Site</div>
        <div className="settings-desc-container">
          We will use personally identifiable information provided by visitors to fulfill the purpose for which it was
          provided, as described in this Policy, and as disclosed at the time the visitor information is requested, such
          as, providing product and promotions information, or fulfilling orders. Additionally, we may use information
          about your activities on this site, your purchases, and your computer equipment and servers, to improve the
          performance of our site, and to customize the content and layout of our site pages to better serve you.
        </div>
        <div className="settings-title-container">Sharing Your Information</div>
        <div className="settings-desc-container">
          We will not share the information you provide with any third parties without your prior consent.
        </div>
        <div className="settings-title-container">Who Views Your Personal Information</div>
        <div className="settings-desc-container">EMK does not sell or license personal information.</div>
        <div className="settings-title-container">Your Content Submissions</div>
        <div className="settings-desc-container">
          By submitting Content to EMK, you represent and warrant that:
          <br /> -you understand you are participating in a public forum and that your Content may be available to all
          other users of the Sites, the Interactive Services and potentially Third Party Sites; <br />
          -you are the sole author and owner of the intellectual property and other rights thereto (or have the
          necessary licenses, rights, consents and permissions to use and authorize EMK to use all intellectual property
          and other rights thereto to enable inclusion and use of the Content in the manner contemplated
          <br />
          -all Content that you post is accurate; <br />
          -you are at least 13 years old and, if you are a minor, that you have obtained the consent of your parent or
          legal guardian to use the Site and agree to these Terms of Use; and that use of the Content you supply does
          not violate these Terms of Use and will not cause injury to any person or entity.
          <br />
          <br /> For any Content that you submit, you grant EMK a worldwide, perpetual, irrevocable, royalty-free,
          sub-licensable and transferable right and license to use, reproduce, communicate, distribute, copy, modify,
          delete in its entirety, edit, adapt, publish, translate, publicly display, publicly perform, use, create
          derivative works from and/or sell and/or distribute such Content and/or incorporate such Content into any
          form, medium or technology whether now or hereafter known throughout the world without compensation to you.
          This license will survive the termination of these Terms of Use and your use of the Site.
          <br />
          <br /> EMK reserves the right to not post a review or to withdraw a posted review for any reason. Your review
          will be excluded if it violates Guidelines or the provisions in these Terms of Use regarding submission of
          Content generally.
        </div>
        <div className="settings-title-container">Modification of Content</div>
        <div className="settings-desc-container">
          All Content that you submit is not confidential and may be used at EMK’s sole discretion. EMK may or may not
          pre-screen Content. However, EMK and its designees will have the right (but not the obligation) in their sole
          discretion to pre-screen, change, condense, or delete any Content on the Sites. You acknowledge that you, not
          EMK, are responsible for the contents of any Content you submit. None of the Content that you submit shall be
          subject to any obligation of confidence on the part of EMK, its agents, subsidiaries, affiliates, partners or
          third-party service providers and their respective directors, officers and employees.
        </div>
        <div className="settings-title-container">Reservation of Rights</div>
        <div className="settings-desc-container">
          EMK reserves the right, at any time, without notice and in its sole discretion, to terminate your license to
          use the Interactive Services and the Sites and to block or prevent your future access to and use of the
          Interactive Services and the Sites.
        </div>
        <div className="settings-title-container">Cookies and Tracking</div>
        <div className="settings-desc-container">
          EMK wants to give you the best possible experience when you visit emkbh.com, emkbeverlyhills.com and our other
          Sites. We like to constantly update and improve the features on our Sites; we like to personalize your
          browsing and shopping experience. While our site itself does not use cookies, some add on modules, such as
          videos hosted on YouTube, do use cookies. A cookie is a small data file that identifies the web browser on a
          particular computer. No personal information is stored in the cookie itself. When you visit one of our Sites,
          a cookie will be sent to your browser and then stored on your computer&apos;s hard drive. We use these cookies
          to track information about how often you visit our web site, what pages you view, and where you go after you
          leave the site. The analytics also link the visitor ID from your cookie to a user ID in our database to help
          us analyze web traffic and statistics. Other companies help us with data research and analysis, but they are
          prohibited from using that data for any other purpose. If you don&apos;t like cookies, you can set your
          browser to reject cookies or to notify you when you are sent a cookie, giving you the chance to decide whether
          or not to accept it. For instructions, look at your browser&apos;s Help menu.
        </div>
        <div className="settings-title-container">Children Under 13</div>
        <div className="settings-desc-container">
          We comply with the Children&apos;s Online Privacy Protection Act of 1998. Our Sites are not designed for
          children. We do not wish to collect personal information from children under 13. This policy is designed to
          protect children. Federal law requires us to take special steps to safeguard children&apos;s privacy. For more
          information about this federal law and about children&apos;s privacy, visit
          http://www.ftc.gov/bcp/edu/pubs/consumer/tech/tec08.shtm. If you are under 18, please be sure to read this
          policy with your parents or legal guardians and ask questions about things you do not understand.
        </div>
        <div className="settings-title-container">Social Commerce and Other Third Parties</div>
        <div className="settings-desc-container">
          We work with trusted third parties, including social network sites like Face book, Twitter, Instagram, and You
          Tube and with application developers who specialize in social commerce so we can connect to your social
          networks. All of these companies operate Third Party Sites. We provide access to our Sites by third parties
          and business partners so we can generate interest in our products among members of your social networks and to
          allow you to share product interests with friends in your network. The use of any features made available to
          you on our Sites by a third party may result in information being collected or shared about you by us or by
          the third party. Information collected or shared through any such third party features is considered
          &quot;public information&quot; by us because the Third Party Sites made it publicly available. If you do not
          want us to be able to access information about you from Third Party Sites, you must instruct Third Party Sites
          not to share the information. EMK is not responsible for how these third parties may use information collected
          from or about you.
        </div>
        <div className="settings-title-container">How to Unsubscribe</div>
        <div className="settings-desc-container">
          We use email addresses to send out newsletters and other announcements with information about new products,
          gifts, and special promotions featured on emkbh.com. You can choose not to receive these announcements by
          opting out of delivery. If you receive an email and want to avoid further messages, look at the end of the
          email for instructions on how to remove yourself from the mailing list.
        </div>
        <div className="settings-title-container">Questions About This Policy</div>
        <div className="settings-desc-container">
          If you have any questions about this Privacy Policy, or the content or practices of our website, please
          contact EMK customer service at 1.323.866.1800 Monday through Friday (except major holidays) between 9:00 a.m.
          and 5:00 p.m. PT. Or email info@emkbh.com.
        </div>
      </div>
    </div>
  )
}


export default PrivacyPolicy;
