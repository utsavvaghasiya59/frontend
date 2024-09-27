import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const param = useParams()

    return (
        <div>{param?.categoryName}</div>
    )
}

export default CategoryProduct