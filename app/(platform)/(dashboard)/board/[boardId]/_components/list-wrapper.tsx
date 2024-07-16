import { type ReactNode } from "react";

interface ListWarpperProps {
  children: ReactNode;
}

const ListWarpper = ({ children }: ListWarpperProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none "> {children}</li>
  );
};

export default ListWarpper;
