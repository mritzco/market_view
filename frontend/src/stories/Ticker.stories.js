// stories/Ticker.stories.js

import React from "react";

import Ticker from "./Ticker";
import { data } from "./TickerData";
console.log(data);
export default {
  component: Ticker,
  title: "Components/Ticker",
};

const Template = (args) => <Ticker {...args} />;

export const Default = Template.bind({});
// console.log(data);
const { symbol, stats, indicators } = data;
const ind = Object.keys(indicators).reduce(
  (ac, i) => {
    let pre;
    if (i.startsWith("change")) pre = "change";
    if (i.startsWith("pos")) pre = "pos";
    if (i.startsWith("vol")) pre = "vol";
    const key = i.replace(pre, "");
    ac[pre][key] = indicators[i];
    return ac;
  },
  { change:{}, pos:{}, vol:{} }
);

Default.args = {
  ticker: {
    symbol,
    stats,
    indicators: ind
  },
};
