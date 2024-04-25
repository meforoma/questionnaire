import {
  questionsPool,
} from "@/data/questions"
import {
  BaseAnswer,
  BaseQuestion,
  QuestionIds,
} from "@/data/types";
import { useRouter } from "next/navigation";

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
  const isFinalQuestion = (
    !question?.nextQuestionId
    && question.answers.every((answer) => !answer?.nextQuestionId)
  );

  const router = useRouter();
  const navigateToNextQuestion = (answer: BaseAnswer) => {
    if (question.nextQuestionId) {
      router.push(`/question/${question.nextQuestionId}`)
    }

    if (answer.nextQuestionId) {
      router.push(`/question/${answer.nextQuestionId}`)
    }
  }

  const onClick = (answer: BaseAnswer) => {
    if (isFinalQuestion) {
      // route to pre-submit summary page
      console.log('route to pre-submit summary page');
    }

    // record answer in redux store
    // update answer in redux store if different
    navigateToNextQuestion(answer);
  }

  return (
    <div>
      {/*
        router back button
        highlight current answer from redux store
      */}
      {isFinalQuestion && `heads up, final question!`}
      <h1>{question.title}</h1>
      <p>{question.subTitle}</p>
      <ul>
        {question.answers.map((answer) => (
          <div key={answer.title}>
            <button
              onClick={() => onClick(answer)}
            >
              {answer.title}
            </button>
          </div>
        ))}
      </ul>
    </div>
  )
}
