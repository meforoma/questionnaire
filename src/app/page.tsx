'use client'

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { QuestionIds } from "@/data/types";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      {`Let's get to know you better`}
      <button onClick={() => router.push(`/question/${QuestionIds.entry}`)}>
        {`Sure, let's start`}
      </button>
    </main>
  );
}
