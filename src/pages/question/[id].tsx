import {
  configPool,
} from "@/data/questions"
import {
  BaseQuestion,
  QuestionIds,
} from "@/data/types";
import { QuestionLayout } from "@@/layouts/QuestionLayout";
import ReduxProvider from "@@/redux/provider";

export const getStaticPaths = async () => {
  const paths = Object.values({...QuestionIds})
    .map((id) => ({
      params: { id },
    }));

  // other routes -> 404
  return { paths, fallback: false }
}

export const getStaticProps = ({ params }: {
    params: { id: QuestionIds},
  }) => {
  const config = configPool[params.id];

  return { props: { question: config } }
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
