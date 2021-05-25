import React from "react";
import styled from "styled-components";

import { Container, Grid, Typography } from "@material-ui/core";

const CleanHeader = (props) => {
  const { currentCity, currentWeather, currentTemp } = props;
  return (
    <Container className={props.className}>
      <Grid item container className="current" spacing={2}>
        <Grid item xs={12} className="current-city">
          <h4>{currentCity}</h4>
        </Grid>
        <Grid item xs={12} className="current-weather">
          {currentWeather?.description}
        </Grid>
        <Grid item xs={12} className="current-temp">
          <Typography variant="h1">
            {currentTemp && `${currentTemp}°`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export const Header = styled(({ ...props }) => <CleanHeader {...props} />)`
  .current {
    text-align: center;
  }
  .current-temp {
    font-size: 4em;
  }
`;
