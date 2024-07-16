import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image src="/next.svg" alt="Logo" height={30} width={30} />
        <p className="pb-1 text-lg font-bold text-neutral-700">Azello</p>
      </div>
    </Link>
  );
};

export default Logo;
