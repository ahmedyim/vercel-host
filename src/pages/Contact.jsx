import React from "react";
import Layout from "../Layout";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
function Contact() {
  return (
    <div>
      <Layout sidebar={<SideBar />} header={<Header />}>
        <div> Contact Page</div>
      </Layout>
    </div>
  );
}
export default Contact;
