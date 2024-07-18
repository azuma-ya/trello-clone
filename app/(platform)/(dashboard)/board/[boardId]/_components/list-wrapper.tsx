import { type ReactNode } from "react";

interface ListWarpperProps {
  children: ReactNode;
}

const ListWarpper = ({ children }: ListWarpperProps) => {
  return (
    <li className="h-full w-[272px] shrink-0 select-none "> {children}</li>
  );
};

export default ListWarpper;
