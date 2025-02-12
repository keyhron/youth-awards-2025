import { year } from "@/data";
import Navbar from "../molecules/Navbar";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full flex justify-center flex-col bg-[url(/images/hero-5.jpg)] bg-cover bg-center"
    >
      <div className="w-full h-full bg-black/40 text-white min-h-screen flex flex-col">
        <Navbar />

        <div className="container px-4 mx-auto flex flex-col items-center justify-center gap-20 flex-1 h-full">
          <div className="font-bold font-orbitron">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">Premios</h2>
            <h1 className="text-5xl xs:text-6xl sm:text-8xl lg:text-9xl leading-none">
              Juventud
            </h1>
          </div>

          <div className="text-center max-w-xs sm:max-w-lg">
            <p className="text-xs sm:text-base font-medium">
              Los jovenes de la Misión Guanare 63 te invitan a disfrutar de este
              gran evento.
            </p>

            <p className="sm:text-lg font-bold mt-5">
              ??? de febrero de {year}
            </p>
            <p className="sm:text-lg font-bold">
              En La Iglesia Luz Del Mundo Misión Guanare 63
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
