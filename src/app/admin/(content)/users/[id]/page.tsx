import React from 'react'

type PageProps = {
  params: {
    id: string
  }
}

const EditUser = ({ params }: PageProps) => {
  const { id } = params
  return (
    <div>EditUser: {id}</div>
  )
}

export default EditUser