import React from "react";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import IndexHeader from "../components/Headers/IndexHeader.js";
import DarkFooter from "../components/Footers/DarkFooter";

// sections for this page
import Banner from "../assets/img/bannerHome.svg";
import Carousel from "./index-sections/Carousel.js";
function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <div class="hero-wrap js-fullheight" style={{ height: 600 }}>
      <div class="overlay"></div>
      <div class="container-fluid px-0">
        <div
          class="row d-md-flex no-gutters slider-text align-items-center js-fullheight justify-content-end"
          style={{ height: 600 }}
        >
          <img
            class="one-third js-fullheight align-self-end order-md-last img-fluid"
            src={Banner}
            style={{ height: 600, marginTop: 100 }}
          />
          <div
            class="one-forth d-flex align-items-center ftco-animate js-fullheight fadeInUp ftco-animated"
            style={{ height: 600 }}
          >
            <div class="text mt-5">
              <span class="subheading">Propstory Magic Pages</span>
              <h1 class="mb-3">
                <span>Clone,</span> <span>Design, </span>
                <span>Host</span>
              </h1>
             
              <p>
                <a href="login-page" class="btn btn-primary px-4 py-3" style={{fontWeight: "bold", letterSpacing: 1}}>
                  Get Started
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
