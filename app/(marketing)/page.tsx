import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center font-bold">
        <div className="mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
          <Medal className="mr-2 size-6" />
          No 1 task managment
        </div>
        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          Azello helps team move
        </h1>
        <div className="w-fil rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className,
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Azello.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Azello for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
