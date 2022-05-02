import type { NextPage } from "next";
import { Logo } from "../components/Logo";

const Home: NextPage = () => {
  return (
    <main>
      <Logo />
      <h1 className="text-title">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="text-body">Get started by editing</p>

      <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
        <h2>Deploy &rarr;</h2>
        <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
      </a>
    </main>
  );
};

export default Home;
