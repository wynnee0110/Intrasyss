import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import { Bebas_Neue } from "next/font/google";
import Header from "@/components/header";
import LeaderboardSection from "@/components/LeaderboardSection";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Dashboard() {
  return (
    <div>
      <div className="absolute text-start inset-0 z-2">
        <Header />
      </div>

      <div className="relative h-screen bg-black opacity-90 overflow-hidden">
        <FlickeringGrid
          className="absolute inset-0 -z-1 bg-blue-900"
          squareSize={4}
          gridGap={1}
          flickerChance={0.3}
          color="rgba(0, 0, 0, 1)"
          maxOpacity={0.2}
        />


        <div className="flex h-full w-full items-center justify-center">
          <h1
            className={`${bebasNeue.className} sm:text-[200px] text-4xl text-yellow-100 drop-shadow-lg`}
          >
            PAUGNAT 2026
          </h1>
        </div>
      </div>

      <div className="p-8 bg-white w-full h-screen">
        <h1 className={`${bebasNeue.className} text-black sm:text-6xl text-center text-4xl `}>LEADERBOARD </h1>

<LeaderboardSection />
      </div>

    </div>
  );
}
