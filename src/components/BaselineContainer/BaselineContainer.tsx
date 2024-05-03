import { bodyGlobalStyle, boxStyle, containerStyle, infoBodyStyle } from '@@/components/BaselineContainer/styles';
import { Box, Container, CssBaseline, GlobalStyles } from '@mui/material';
import { FC, ReactElement, ReactNode } from 'react';
import { Header } from '@@/components/Header';
import ReduxProvider from '@@/redux/provider';

type Props = {
  children: ReactNode;
};

export const BaselineContainer: FC<Props> = ({
  children,
}) => {
  return (
    <ReduxProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: !true
            ? infoBodyStyle
            : bodyGlobalStyle
        }}
      />

      <Container
        sx={containerStyle}
      >
        <Box sx={boxStyle}>
          <Header />
          {children}
        </Box>
      </Container>
    </ReduxProvider>
  );
};
