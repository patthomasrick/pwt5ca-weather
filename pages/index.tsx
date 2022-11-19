import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Pwt5caFooter from "./components/footer";
import Pwt5caHeader from "./components/header";

export default function Home() {
  return (
    <div className="container">
      <Pwt5caHeader />

      <main>
        <section>
          <h1 className="display-1">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p>Hello world!</p>
        </section>
      </main>

      <Pwt5caFooter />
    </div>
  );
}
