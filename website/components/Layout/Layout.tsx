import { WithChildren } from "../../utils/types";

import { Header } from "./Header";

export function Layout({ children }: WithChildren) {
  return (
    <main>
      <Header />
      <div>{children}</div>
    </main>
  );
}
