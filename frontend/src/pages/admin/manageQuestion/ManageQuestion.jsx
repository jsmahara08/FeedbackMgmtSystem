import React from 'react'
import AdminHeader from '../components/AdminHeader'
import DropdownMenu from '../components/DropdownMenu'
import AdminFooter from '../components/AdminFooter'

const ManageQuestion = () => {
    const menuItems = [
        { text: 'Question', link: 'option' },
        { text: 'Option', link: 'question' },
       ];

  return (
    <React.Fragment>
      <AdminHeader />
     <DropdownMenu title="Manage Questions" menuItems={menuItems} />
      
      
      <AdminFooter/>
    </React.Fragment>
  )
}

export default ManageQuestion
