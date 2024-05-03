import { QuestionIds } from '@/data/types';
import { resetAnswers } from '@@/redux/features/answersSlice';
import { AppDispatch } from '@@/redux/store';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LoopIcon from '@mui/icons-material/Loop';
import Image from 'next/image';
import {
  centeredFlex,
  headerStyle,
  noHoverStyle,
} from '@@/components/Header/styles';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const navigateToEntryQuestion = () => {
    router.push(`/question/${QuestionIds.entry}`);
  };

  const handleReset = () => {
    dispatch(resetAnswers());
    navigateToEntryQuestion();
  };

  const navigateBack = () => {
    router.back();
  };

  return (
    <Box sx={headerStyle}>
      <IconButton
        title='navigate back'
        color='inherit'
        onClick={navigateBack}
      >
        <ArrowBackIosNewIcon/>
      </IconButton>

      <IconButton
        title='logo'
        sx={noHoverStyle}
      >
        <Image
          src='/headerLogo.svg'
          alt='logo'
          width={15}
          height={16}
          style={centeredFlex}
        />
      </IconButton>

      <IconButton
        title='reset questionnaire'
        color='inherit'
        onClick={handleReset}
      >
        <LoopIcon/>
      </IconButton>
    </Box>
  );
};
