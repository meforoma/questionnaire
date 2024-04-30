import { QuestionIds } from '@/data/types';
import { resetAnswers } from '@@/redux/features/answersSlice';
import { AppDispatch } from '@@/redux/store';
import { Box, IconButton, SxProps } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LoopIcon from '@mui/icons-material/Loop';
import Image from 'next/image';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const navigateToEntryQuestion = () => {
    router.push(`/question/${QuestionIds.entry}`);
  };

  const headerStyle: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <Box sx={headerStyle}>
      <IconButton
        title='navigate back'
        color='inherit'
        onClick={() => router.back()}
      >
        <ArrowBackIosNewIcon/>
      </IconButton>

      <IconButton
        title='logo'
        sx={{
          ':hover': {
            background: 'none',
          },
        }}
      >
        <Image
          src='/headerLogo.svg'
          alt='logo'
          width={15}
          height={16}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </IconButton>

      <IconButton
        title='reset questionnaire'
        color='inherit'
        onClick={() => {
          dispatch(resetAnswers());
          navigateToEntryQuestion();
        }}
      >
        <LoopIcon/>
      </IconButton>
    </Box>
  );
};
