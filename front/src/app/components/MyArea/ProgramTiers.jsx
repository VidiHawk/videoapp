import React from 'react'
import { Table } from 'antd'

const ProgramTiers = (props) => {
  const dataSource = [
    {
      key: '1',
      name: 'Free shipping on orders over',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'Seasonal savings events',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '3',
      name: 'Point multiplier events',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '4',
      name: 'Points useable for a period of',
      age: 42,
      address: '10 Downing Street',
    },
  ]

  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ingénue',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Glow Getter',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'A- Lister',
      dataIndex: 'address',
      key: 'address',
    },
  ]
  return (
    <div className="luxe-slidecard">
      <div className="container-terms">
        <div className="my-area-title-container">Ageless Beauty Rewards Program</div>
        <div>
          <Table className="program-tire-table" dataSource={dataSource} columns={columns} pagination={false} />
          <div className="program-tire-note">
            When you reach a certain tier status, it is valid through the end of the next calendar year. Points do not
            influence your tier status, but they allow you to redeems gifts and products.
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProgramTiers;
