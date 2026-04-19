import React from 'react'
import Layout from "../Layout";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
function Profile() {
  return (
    <div>
      <Layout sidebar={<SideBar/>} header={<Header/>}>
        <div>
            Profile Page
        </div>
      </Layout>
    </div>
  )
}
export default Profile;
