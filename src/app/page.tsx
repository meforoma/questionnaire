'use client';

import { useRouter } from 'next/navigation';
import { QuestionIds } from '@/data/types';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      {`Let's get to know you better`}
      <button onClick={() => router.push(`/question/${QuestionIds.entry}`)}>
        {`Sure, let's start`}
      </button>
    </main>
  );
}
