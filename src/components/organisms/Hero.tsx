import { year } from "@/data";
import Navbar from "../molecules/Navbar";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full flex justify-center flex-col bg-[url(/images/hero.jpg)] bg-cover bg-no-repeat bg-center"
    >
      <div className="w-full h-full text-black min-h-[100dvh] flex flex-col">
        <Navbar />


        <div className="container px-4 mx-auto flex flex-col items-center justify-center gap-20 flex-1 h-full">
          <div className="font-bold font-orbitron -skew-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">Premios</h2>
            <h1 className="text-5xl xs:text-6xl sm:text-8xl lg:text-9xl leading-none">
              Juventud
            </h1>
          </div>

          <div className="text-center -skew-2 max-w-xs sm:max-w-lg px-10 py-7 bg-[#FFD166]/70 text-black">
            {/* <p className="text-xs sm:text-base font-medium mb-5">
              Los jovenes de la Misión Guanare 63 te invitan a disfrutar de este
              gran evento.
            </p> */}

            <p className="sm:text-lg font-bold skew-2">11 de febrero de {year}</p>
            <p className="sm:text-lg font-bold skew-2">
              En La Iglesia Luz Del Mundo Misión Guanare 63
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
