import { WithChildren } from "../../utils/types";
import { Header } from "./Header";

export function Layout({ children }: WithChildren) {
  return (
    <main className="relative max-w-[120rem] my-0 mx-auto h-screen">
      <Header />
      <img
        src="background.png"
        alt="8 Fall"
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-1 object-cover h-full md:object-fill md:h-auto"
      />
      <div className="absolute left-0 right-0 pt-8 px-4 md:px-8">
        {children}
      </div>
    </main>
  );
}
