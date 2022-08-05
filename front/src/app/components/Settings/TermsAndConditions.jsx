import React from 'react'
import handleViewport from './../Elements/HandleViewPort'

const TermsAndConditions = (props) => {
  const { forwardedRef, inViewport, onChangeBottomTab } = props
  return (
    <div className="settings-container-section" ref={forwardedRef} id={props.id}>
      <div className="container-terms">
        <div className="settings-title-container">TERMS OF USE</div>
        <div className="settings-desc-container mt-3">
          These are the terms (“Terms of Use”) for your use of services or features on the sites owned and controlled by
          EMK Products, LLC. (“EMK”). By using the Sites, you signify your agreement to these Terms of Use, our Privacy
          Policy, whether or not you have read them. If you do not agree with any of these, you should not use our
          Sites.
        </div>
        <div className="settings-title-container">Sales Tax</div>
        <div className="settings-desc-container">
          For orders being shipped to California, we are required by law to collect state sales tax. Sales tax is
          calculated on the purchase amount including products along with shipping and handling. We do not charge sales
          tax for all other worldwide destinations.
        </div>
        <div className="settings-title-container">When You Will Be Charged</div>
        <div className="settings-desc-container">
          The credit card that you specify for your purchase will be charged only when the order is shipped.
        </div>
        <div className="settings-title-container">Promotional Offers</div>
        <div className="settings-desc-container">
          At checkout, you may enter the code of any coupon, promotional offer, or discount in the Enter Code boxed
          area. The offer will be displayed on the “Confirm Order” page. Code entry is case sensitive and must be
          entered as it appears on the offer you received. Only one offer code may be used per online purchase.
        </div>
        <div className="settings-title-container">Copyright</div>
        <div className="settings-desc-container">
          All design, text, graphics, logos, button icons, images, audio and video clips, the selection and arrangement
          thereof, and all software on the Sites is Copyright © EMK® ALL RIGHTS RESERVED. The compilation (meaning the
          collection, arrangement and assembly) of all content on the Sites is the exclusive property of EMK and
          protected by U.S. and international copyright laws. All software used on the Sites is the property of EMK or
          its software suppliers and is protected by U.S. and international copyright laws. Permission is granted to
          electronically copy and to print in hard copy portions of the Sites for the sole purpose of placing an order
          with EMK. Any other use of materials on the Sites - including reproduction for purposes other than those
          permitted above, modification, distribution, republishing, transmission, display or performance - without the
          prior written permission of EMK is strictly prohibited.
        </div>
        <div className="settings-title-container">Trademarks</div>
        <div className="settings-desc-container">
          emkbh.com and emkbeverlyhills.com and all page headers, custom graphics and button icons are service marks,
          trademarks, and/or trade dress of EMK and may not be used in connection with any product or service that is
          not offered by EMK in any manner that is likely to cause confusion among customers, or in any manner that
          disparages or discredits EMK. All other trademarks, product names and company names or logos cited herein are
          the property of their respective owners.
        </div>
        <div className="settings-title-container">Product Information</div>
        <div className="settings-desc-container">
          The products displayed on the Sites can be ordered and delivered in US and foreign markets. EMK products
          displayed on the Sites may be available in select EMK retail stores in the U.S. and certain foreign markets.
          All prices displayed on the Sites are quoted in U.S. Dollars and are valid and effective only in the U.S. If
          any minor uses any goods or product from EMK it should be only after the legal or parental guardian has
          discussed the product with the minor&apos;s doctor. Reference to any products, services, processes, or other
          information by trade name, trademark, manufacturer, and supplier or otherwise does not constitute or imply
          endorsement, sponsorship, or recommendation thereof by EMK.
          <br />
          <br /> All material and information presented by EMK is intended to be used for personal educational or
          informational purposes only. The statements and products are not intended to diagnose, treat, cure, or prevent
          any condition or disease. All products should be used strictly in accordance with their instructions,
          precautions, and guidelines. You should always check the ingredients for products to avoid potential allergic
          reactions. Use of the Sites is not meant to serve as a substitute for professional medical advice.
        </div>
        <div className="settings-title-container">Applicable Law</div>
        <div className="settings-desc-container">
          The Sites and Interactive Services are created and controlled by EMK in the State of California, US. As such,
          the laws of the State of California will govern these Terms of Use, without giving effect to any principles of
          conflicts of laws. EMK reserves the right to make changes to its Web site and these Terms of Use at any time.
          <br />
          <div>
            You may also be interested to learn about our{' '}
            <div
              className="link-privacy-policy"
              onClick={() => onChangeBottomTab('4')}
              onKeyPress={() => onChangeBottomTab('4')}
              role="button"
              tabIndex="0"
            >
              Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default TermsAndConditions;
