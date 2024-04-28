import { QuestionIds } from "@/data/types";
import { resetAnswers } from "@@/redux/features/answersSlice";
import { AppDispatch } from "@@/redux/store";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const navigateToEntryQuestion = () => {
    router.push(`/question/${QuestionIds.entry}`);
  }

  return (
    <header>
      <IconButton
        onClick={() => router.back()}
      >
        {'<'}
      </IconButton>

      <button onClick={() => {
        dispatch(resetAnswers());
        navigateToEntryQuestion();
      }}>
        reset
      </button>
    </header>
  );
};
