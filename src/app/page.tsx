import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

export default function Dashboard() {
  return (
    <div className="relative h-screen">
      <FlickeringGrid
        className="absolute inset-0 -z-2 bg-white"
        squareSize={4}
        gridGap={6}
        flickerChance={0.3}
        color="rgba(56, 56, 56, 1)"
        maxOpacity={0.2}
      />
      <div className="flex h-full w-full items-center justify-center">
        <h1 className={`${bebasNeue.className} sm:text-8xl text-4xl text-black`}>
          PAUGNAT
        </h1>
      </div>
    </div>
  );
}