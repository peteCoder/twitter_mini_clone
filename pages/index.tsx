import Image from "next/image";
import { Inter } from "next/font/google";

import Layout from "../components/Layout";
import Header from "@/components/Header";
import Form from "@/components/Form";

const inter = Inter({ subsets: ["latin"] });


// Continue from: 31:08

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
    </>
  );
}
