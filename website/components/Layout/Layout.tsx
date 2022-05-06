import Image from "next/image";

import { WithChildren } from "../../utils/types";
import { Header } from "./Header";

export function Layout({ children }: WithChildren) {
  return (
    <main className="relative max-w-[120rem] my-0 mx-auto h-screen">
      <Header />
      <Image src="/background.png" alt="8 Fall" layout="fill" />
      <div className="absolute left-0 right-0 pt-8 px-4 md:px-8">
        {children}
      </div>
    </main>
  );
}
