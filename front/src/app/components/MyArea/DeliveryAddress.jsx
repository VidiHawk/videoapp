import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import { ButtonLink } from './../Elements/ButtonLink'
import { useHistory } from 'react-router-dom'
import EditIcon from '../../../../public/images/edit_icon.svg'
import DeleteIcon from '../../../../public/images/delete_icon.svg'
import ShopifyGraphClient from './../../graphql/client'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ADDRESSES } from '../../graphql/queries'
import { DELETE_ADDRESS, MARK_DEFAULT_ADDRESS } from '../../graphql/mutations'
import AddAddress from './../MyArea/AddAddress';
import { LuxeSpin } from '../Elements/Spin'
import AuthContext from '../../helpers/authContext'
import { NoLogin } from "./../Common/EmptyPages";

const shopifyClient = ShopifyGraphClient()

const DeliveryAddress = (props) => {
  if(typeof Util !== 'undefined'){
    const [page, setPage] = useState('list');
    const [editId, setEditId] = useState('');
    const customerAccessToken = Util.getLocalstorage('customerAccessToken')
    const [addressListData, setAddressListData] = useState(undefined)

    const { data: addressList, loading: addressLoading, refetch: reFetchAddressList } = useQuery(GET_ADDRESSES, {
      client: shopifyClient,
      variables: {
        customerAccessToken,
        first: 10,
      },
    })

    useEffect(() => {
      addressList && setAddressListData(addressList)
    }, [addressList])

    const refreshList = () =>{
      reFetchAddressList({
        variables: {
          customerAccessToken,
          first: 10,
        },
      })
    }

    useEffect(() => {
      console.log(page,"called")
      const pathname = props.location.pathname.split('/');
      page == 'list' && pathname[2] === 'address-details' && refreshList()
    }, [page])

    useEffect(() => {
      const pathname = props.location.pathname.split('/');
      if(pathname && pathname[2] && pathname[2] === 'add-address'){
        setPage(pathname[2])
      } else if (pathname && pathname[2] && pathname[2] === 'edit-address') {
        if(props?.location?.state?.editId){
          setEditId(props?.location?.state?.editId)
          setPage('edit-address')
        } else {
          setPage('list')
          props.history.push('/my-area/address-details');
        }
      }
    },[props?.location])

    if(page == 'list') return <AddressList {...props} setPage={setPage} setEditId={setEditId} refreshList={refreshList} addressListData={addressListData} addressLoading={addressLoading}/>
    if(page == 'add-address') return <AddAddress {...props} setPage={setPage} refreshList={refreshList}/>
    if(page == 'edit-address') return <AddAddress {...props} editId={editId} setPage={setPage} refreshList={refreshList}/>
  }
  else return null;
}

const AddressList = (props) =>{
  const context = React.useContext(AuthContext)
  const history = useHistory()
  const customerAccessToken = Util.getLocalstorage('customerAccessToken')

  const onClickAdd = () => {
    props.setPage('add-address');
    props.history.push('/my-area/add-address');
  }

  const [deleteAddress, { loading: deleteLoading }] = useMutation(DELETE_ADDRESS, { client: shopifyClient })

  const deleteAddressItem = (addressId) => {
    deleteAddress({ variables: { customerAccessToken, id: addressId } }).then((response) => {
      context.showToastMessage({
        message: "Address deleted successfully",
        type: 'success',
      })
      props.refreshList();
    })
  }

  const [markDefaultAddress, {loading: defaultLoading }] = useMutation(MARK_DEFAULT_ADDRESS, { client: shopifyClient })

  const setDefaultAddress = (addressId) => {
    markDefaultAddress({
      variables: {
        customerAccessToken,
        addressId: addressId,
      },
    }).then((response) => {
      context.showToastMessage({
        message: "Default address successfully",
        type: 'success',
      })
      props.refreshList();
    })
  }

  if(context.authenticated) {
    return (
      <div className="luxe-slidecard delivery-address-container">
        <div className="container-terms">
          {props.addressLoading || deleteLoading || defaultLoading && <LuxeSpin/>}
          {(!props.addressLoading && !deleteLoading && !defaultLoading) && (
            <>
              <Row justify="center">
                <Col md={14} lg={10} xxl={8} span={24}>
                  <div className="settings-sub-container" style={{ display: 'block' }}>
                    {props.addressListData?.customer?.addresses?.edges?.length ? (
                      props.addressListData?.customer?.addresses?.edges.map((addressItem, index) => {
                        return (
                          <AddressItem
                            key={index}
                            {...props}
                            addressDetail={{ ...addressItem.node, cId: addressItem.cursor }}
                            deleteAddressItem={deleteAddressItem}
                            setDefaultAddress={setDefaultAddress}
                            history={history}
                            defaultAddress={props.addressListData?.customer?.defaultAddress?.id === addressItem.node.id}
                          />
                        )
                      })
                    ) : (
                      <div className="no-address">No Address Found</div>
                    )}
                  </div>
                  <ButtonLink className="add-btn" onClick={onClickAdd}>
                    + Add Address
                  </ButtonLink>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    )
  } else {
    return <NoLogin/>
  }
  
}


const AddressItem = (props) => {
  const { addressDetail, deleteAddressItem, setEditId, setPage, history, defaultAddress, setDefaultAddress } = props
  const {
    address1,
    address2,
    city,
    country,
    company,
    firstName,
    formatted,
    formattedArea,
    cId,
    id,
    lastName,
    latitude,
    longitude,
    name,
    phone,
    province,
    provinceCode,
    zip,
  } = addressDetail


  const editAddress =(cId) => {
    setEditId(cId);
    setPage('edit-address');
    props.history.push({
      pathname: `/my-area/edit-address`,
      state: { editId: cId}
  })
  }

  return (
    <Card hoverable className="delivery-address-section" bodyStyle={{ padding: '0px' }}>
      <Row>
        <Col span={18}>
          <div className="address-discription">
            <h3>
              {firstName} {lastName}
            </h3>
            <address>
              {address1 && `${address1} ,`} <br />
              {zip && country && `${zip}-${country}, ${company || ''}`}
              {/*{address1 && `${address1}`} <br />
              {zip && `${zip}-${country}`}{company && `, ${company}`}*/}
            </address>
            {defaultAddress && <span className="dft-btn">DEFAULT</span>}
          </div>
        </Col>
        <Col span={3} className="top-btm-center">
          <EditIcon onClick={() => editAddress(cId)} />
        </Col>
        <Col span={3} className="top-btm-center">
          <DeleteIcon onClick={() => deleteAddressItem(id)} />
        </Col>
      </Row>
      {!defaultAddress && <Row>
        <ButtonLink onClick={() => setDefaultAddress(id)} className="default-btn">Define as default</ButtonLink>
      </Row>}
    </Card>
  )
}

export default DeliveryAddress;
