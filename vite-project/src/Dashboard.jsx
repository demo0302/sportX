import React from "react";
import Matchmaking from "./Matchmaking";
import SportsList from "./SportsList";
import Chat from "./Chat";
import Geolocation from "./Geolocation";
import Scheduling from "./Scheduling";
import OtherSports from "./OtherSports";
import Footer from "./Footer";
import Done from "./Done";
import CallToAction from "./CallToAction";
function Dashboard({ user }) {
  return (
    <div>
      
      {/* Add more content here */}
      
       <section>
        <Done />
       </section>
      <section>
        <Matchmaking />
      </section>

      <section>
        <SportsList />
      </section>

      <section>
        <Chat />
      </section>

      <section>
        <Geolocation />
      </section>

      <section>
        <Scheduling />
      </section>

      <section>
        <OtherSports />
      </section>
<section>     <div> <CallToAction /></div></section>
      <Footer />
    </div>
  );
}

export default Dashboard;
