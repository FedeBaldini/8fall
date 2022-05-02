import { WithChildren } from "../../utils/types";
import { Header } from "./Header";

export function Layout({ children }: WithChildren) {
  return (
    <main>
      <Header />
      <img
        src="background.png"
        alt="8 Fall"
        className="absolute top-0 right-0 left-0 -z-10"
      />
      <div>{children}</div>
    </main>
  );
}
