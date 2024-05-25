import React from "react";
import "../styles/AboutUs.css";
export default function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>

      <div className="about-us-content">
        <nav className="about-us-nav">
          <a href="#our-mission">Our Mission</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#safety">Safety</a>
          <a href="#contact-us">Contact Us</a>
        </nav>

        <div className="about-us-sections">
          <section id="our-mission" className="about-us-section fade-in">
            <h2>Our Mission</h2>
            <p>
              Welcome to our ride-sharing platform exclusively for university
              students! We provide a safer and more reliable transportation
              alternative by allowing only verified university students as both
              drivers and passengers. This creates a trusted community where you
              can feel secure.
            </p>
          </section>
          <br></br>

          <section id="how-it-works" className="about-us-section fade-in">
            <h2>How It Works</h2>
            <p>
              Our platform ensures quality control by allowing passengers to
              rate their drivers after each ride. Drivers can post ride offers,
              detailing their destination, available seats, and proposed price.
              Passengers can then respond to these offers via an integrated chat
              system to discuss trip specifics and negotiate the price.
            </p>
          </section>
          <br></br>
          <section id="safety" className="about-us-section fade-in">
            <h2>Safety</h2>
            <p>
              Safety is our top priority. We verify the identity of all
              university students through their student IDs and email addresses,
              ensuring that only legitimate students can use our services as
              both drivers and passengers.
            </p>
          </section>
          <br></br>
          <section id="contact-us" className="about-us-section fade-in">
            <h2>Contact Us</h2>
            <p>
              Have questions or need support? Feel free to reach out to us at{" "}
              <a href="mailto:support@rideshareuniversity.com">
                support@rideshareuniversity.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
