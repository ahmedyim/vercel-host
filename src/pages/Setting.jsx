import React from 'react'
import Layout from "../Layout";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
function Setting() {
  return (
    <div>
       <Layout sidebar={<SideBar />} header={<Header />}>
        <div>Setting</div>
      </Layout>
    </div>
  )
}
export default Setting;
