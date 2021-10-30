import React from "react";
// Styled components
import styled from "styled-components";
// Theme functionality
import { useContext } from "react";
import { ThemeContext } from "styled-components";
// The styled component
const StyledTicker = styled.div``;
const Tickername = styled.span`
  font-size: 1.1em;
  color: ${(props) => props.theme.palette.colors.highlight};
  font-weight: bold;
`;
const SymbolPrice = styled.span`
  font-size: 1.3em;
  float:right;
  color: ${(props) => props.theme.palette.colors.highlight};
`;

const StyledBlock =styled.div`
  margin: 4px;
  padding: 4px 6px;
  font-size: 0.7em;

  display: inline-block;
  width:50px;
  text-align: right;
  background: ${(props) => props.theme.palette.colors.paper};
  & > ul {
    line-height: 0.9em;
    list-style: none;
    padding: 0;
    font-size: 0.8em;
  }
`
const BlockTitle = styled.span`
  font-size: 0.3em;
  color: ${(props) => props.theme.palette.colors.muted };
  padding: 0;
  line-height: 1em;
`

const Grid = styled.div`
  display: flex;
`
const StyledValue = styled.li`
  color:  ${(props) => props.theme.palette.colors.primary }
  `
const StyledPrice = styled.li`
    color: ${(props) => props.value >= props.pos ? props.theme.palette.colors.green :
      props.theme.palette.colors.red
    };
`
export function Price({value = "-", pos = 0}){
  return <StyledPrice pos={pos} value={value}>{value}</StyledPrice>
}
export function Value({value = "-"}){
  return <StyledValue>{value}</StyledValue>
}

export function Labels() {
  return (
    <StyledBlock>
      <BlockTitle>Period</BlockTitle>
      <ul>
        <Value value="Open" />
        <Value value="change" />
        <Value value="position" />
        <Value value="Volume"  />
      </ul>
    </StyledBlock>
  );
}
export function Block({ period, data }) {
  return (
    <StyledBlock>
      <BlockTitle>{period}</BlockTitle>
      <ul>
        <Value value={data.change[period].open} />
        <Price value={data.change[period].change} />
        <Price pos={50} value={data.pos[period]} />
        <Price value={data.vol[period] ? data.vol[period].change : "-"} />
      </ul>
    </StyledBlock>
  );
}

export default function Ticker({ ticker }) {
  const themeContext = useContext(ThemeContext);

  return (
    <StyledTicker>
      <Tickername>{ticker.symbol}</Tickername>
      <SymbolPrice>{ticker.stats.close}</SymbolPrice>
      <Grid>

      <Labels />
      <Block period="all" data={ticker.indicators}></Block>
      <Block period="24h" data={ticker.indicators}></Block>
      <Block period="8c" data={ticker.indicators}></Block>
      <Block period="4c" data={ticker.indicators}></Block>
      <Block period="2c" data={ticker.indicators}></Block>
      <Block period="1c" data={ticker.indicators}></Block>
      </Grid>
    </StyledTicker>
  );
}
