import React from "react";
import SearchBox from "../Components/SearchBox";
import Intro from "../Components/Intro";
import CollectorDashboard from "../Components/CollectorDashboard";

function HomePage() {
  return (
    <>
      <Intro />
      {window.localStorage.getItem("user") === null && <SearchBox /> }
      <CollectorDashboard />
    </>

  );
}

export default HomePage;
