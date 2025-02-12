import Footer from "@/components/molecules/Footer";
import Hero from "@/components/organisms/Hero";
import Categories from "@/components/organisms/Categories";
import CurrentWinners from "@/components/organisms/CurrentWinners";
import OldWinners from "@/components/organisms/OldWinners";
import oldWinners from "@/data/oldWinners";
import Confetti from "@/components/molecules/Confetti";

export default function Home() {
  return (
    <>
      <main>
        <Confetti />
        <Hero />

        <Categories />
        <CurrentWinners />

        <OldWinners
          data={[
            { year: "2024", winners: oldWinners[2024] },
            { year: "2023", winners: oldWinners[2023] },
            { year: "2022", winners: oldWinners[2022] },
          ]}
        />

        <Footer />
      </main>
    </>
  );
}
