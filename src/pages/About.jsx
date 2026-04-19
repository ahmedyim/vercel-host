import React from "react";
import Layout from "../Layout";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
function About() {
  return (
    <div>
      <Layout sidebar={<SideBar />} header={<Header />}>
        <div> About Page</div>
      </Layout>
    </div>
  );
}
export default About;
