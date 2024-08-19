import { useState, useEffect } from "react";
import "./Main.css";
import Hero from "../../Components/Home/Hero/Hero";
import Loader from "../../Components/Loader/Loader";
import Title from "../../Components/Home/Title/Title";
import Program from "../../Components/Home/Services/Program";
import About from "../../Components/Home/About/About";
import Contact from "../../Components/Home/Contact/Contact";
import Footer from "../../Components/Home/Footer/Footer";
import Navbar from "../../Components/Home/Nabvar/Navbar";

const Main = () => {
  //Loader state
  const [isLoading, setIsLoading] = useState(true);

  //async method to fecth fake data
  useEffect(() => {
    const loader = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    loader();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="body-main">
      <Navbar />
      <Hero />
      <div className="container">
        <Title subTitle="Aming Serbisyo" title="Ang handog namin sa inyo" />
        <Program />
        <About />
        <Title
          subTitle="Kami ay kontakin"
          title="Tayu'y maging malapit sa isa't-isa"
        />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Main;
