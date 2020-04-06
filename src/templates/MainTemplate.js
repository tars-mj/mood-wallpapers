import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../theme/GlobalStyles';
import { theme } from '../theme/theme';
import { Helmet } from 'react-helmet';

const MainTemplate = ({ children }) => (
  <>
    <GlobalStyles />
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;700&display=swap"
        rel="stylesheet"
      ></link>
    </Helmet>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
