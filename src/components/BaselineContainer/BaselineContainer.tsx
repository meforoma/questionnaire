import { customGlobalStyles, boxStyle, containerStyle, questionBoxStyle } from '@@/components/BaselineContainer/styles';
import { Box, Container, CssBaseline, GlobalStyles } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Header } from '@@/components/Header';
import ReduxProvider from '@@/redux/provider';
import { CustomStyleNames } from '@/data/types';

type Props = {
  children: ReactNode;
  customStyleName?: CustomStyleNames;
};

export const BaselineContainer: FC<Props> = ({
  children,
  customStyleName,
}) => {
  return (
    <ReduxProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: customGlobalStyles[
            customStyleName || CustomStyleNames.default
          ],
        }}
      />

      <Container
        sx={containerStyle}
        maxWidth="sm"
      >
        <Box component="section" sx={boxStyle}>
          <Header />
          <Box sx={questionBoxStyle}>
            {children}
          </Box>
        </Box>
      </Container>
    </ReduxProvider>
  );
};
