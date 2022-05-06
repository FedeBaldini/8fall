import { WithChildren } from "../../utils/types";
import { Header } from "./Header";

export function Layout({ children }: WithChildren) {
  return (
    <main className="h-screen bg-[url('/background.png')] bg-cover bg-fixed bg-center">
      <Header />
      <div className="absolute left-0 right-0 pt-8 px-4 md:px-8">
        {children}
      </div>
    </main>
  );
}
