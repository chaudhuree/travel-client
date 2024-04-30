import React from "react";
import Slider from "../components/Slider";
import ProcedureToJoin from "../components/ProcedureToJoin";
import ShowSpotsData from "../components/ShowSpotsData";
import Promo from "../components/Promo";
import ShowData from "../components/ShowData";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Travel</title>
      </Helmet>

      <Slider />
      <section className="container mx-auto">
        <ShowSpotsData />
        <ProcedureToJoin />
        <ShowData />
      </section>
      <Promo />
    </>
  );
}

export default Home;
