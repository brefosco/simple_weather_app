import React from "react";
import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";

const CleanForecast = (props) => {
  const { dailyForecast, hourlyForecast } = props;
  // TODO: Add hourly forecast

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const today = new Date();

  React.useEffect(() => {}, []);

  return (
    <Container className={props.className}>
      <Grid container className="container">
        <Grid item xs={12}>
          <table>
            <tbody>
              {dailyForecast?.map((el, key) => (
                <tr key={key}>
                  <td>{today.addDays(key).toString().split(" ")[0]}</td>
                  <td align="right">
                    <span className="max-temp">{Math.trunc(el.temp.max)}°</span>
                    {Math.trunc(el.temp.min)}°
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
};

export const Forecast = styled(({ ...props }) => <CleanForecast {...props} />)`
  table {
    width: 100%;
  }

  td {
    padding: 0.7em;
  }
  .container {
    border-top: 1px solid white;
    padding-top: 1em;
  }

  .row {
    padding: 200px;
  }

  .max-min-temp {
    text-align: right;
  }

  .day {
    padding-top: 2em;
  }
  .max-temp {
    padding: 0 1em 0 0;
  }
`;
