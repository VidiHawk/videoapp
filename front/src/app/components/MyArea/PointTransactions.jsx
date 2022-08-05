import React from 'react'
import { Table } from 'antd'

const PointTransactions = (props) => {
  const dataSource = [
    {
      key: '1',
      name: 'Add a review',
      date: '03/04/20',
      point: 30,
    },
    {
      key: '2',
      name: 'Follow on social networks',
      date: '03/04/20',
      point: 30,
    },
    {
      key: '3',
      name: 'Point multiplier events',
      date: '03/04/20',
      point: 30,
    },
    {
      key: '4',
      name: 'Points useable for a period of',
      date: '03/04/20',
      point: 30,
    },
    {
      key: '5',
      name: 'Buy special product',
      date: '03/04/20',
      point: 30,
    },
    {
      key: '6',
      name: 'Share product',
      date: '03/04/20',
      point: 30,
    },
  ]

  const columns = [
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Points',
      dataIndex: 'point',
      key: 'point',
      render: (text) => <p className="table-active-point">{text}</p>,
    },
  ]
  return (
    <div className="luxe-slidecard">
      <div className="container-terms">
        <div className="my-area-title-container">My Actions</div>
        <div>
          <Table
            className="point-transaction-table table-with-space"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}

export default PointTransactions;