import {
  questionsPool,
} from "@/data/questions"
import {
  BaseQuestion,
  QuestionIds,
} from "@/data/types";
import { QuestionLayout } from "@/QuestionLayout";
import ReduxProvider from "@@/redux/provider";

export const getStaticPaths = async () => {
  const paths = Object.values(QuestionIds)
    .map((questionId) => ({
      params: { questionId },
    }));

  // other routes -> 404
  return { paths, fallback: false }
}

export const getStaticProps = ({ params }: {
    params: { questionId: QuestionIds },
  }) => {
  const question = questionsPool[params.questionId];

  return { props: { question } }
}

export default function Question(
  { question }: { question: BaseQuestion }
) {

  return (
    <ReduxProvider>
      <QuestionLayout question={question} />
    </ReduxProvider>
  )
}
