import React, { useEffect, useState } from 'react'
import { List } from 'antd-mobile'
import axios from "axios";
import { useParams } from 'react-router-dom'

const App = () => {
  const { userId } = useParams()
  const [products, setProducts] = useState([])

  // console.log(userId);
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios(`${process.env.REACT_APP_API_URL}/user/${userId}/products`)
      setProducts(res.data)
    }

    getProduct()
  }, [])



  return (
    <div>
      <List>
        {
          products.map(product => (
            <List.Item
              key={product.id}
              description={product.describe}
              extra={`￥${product.price+product.profit}`}
            >
              {product.Brand.name}{' '}
              {product.Model.name}{' '}
              {product.Capacity.name}{' '}
              {product.Color.name}{' '}
              {product.Version.name}{' '}
            </List.Item>
          ))
        }
      </List>
    </div>
  )
}

export default App