import React, { useContext } from 'react'
import { Input } from 'antd'
import AuthContext from './../../helpers/authContext'
const { Search } = Input

const ApplyCoupon = (props) => {
  const context = useContext(AuthContext)
  const searchCoupon = (value) => {
    if (value) {
      props.applyCoupon(value, (res) => {
        if (
          res &&
          res.data &&
          res.data.checkoutDiscountCodeApplyV2 &&
          res.data.checkoutDiscountCodeApplyV2.checkoutUserErrors &&
          res.data.checkoutDiscountCodeApplyV2.checkoutUserErrors[0] &&
          res.data.checkoutDiscountCodeApplyV2.checkoutUserErrors[0].message
        ) {
          const errorMessage =
            res.data.checkoutDiscountCodeApplyV2.checkoutUserErrors[0].code == 'DISCOUNT_NOT_FOUND'
              ? 'Invalid Promo Code'
              : res.data.checkoutDiscountCodeApplyV2.checkoutUserErrors[0].message

          context.showToastMessage({ message: errorMessage, type: 'error' })
        }
      })
    }
  }
  return (
    <div className="coupon">
      <div className="coupon-title">Add a promo code!</div>
      <Search placeholder="Enter Promo Code" allowClear enterButton="Add Code" size="large" onSearch={searchCoupon} />
    </div>
  )
}

export default ApplyCoupon;
