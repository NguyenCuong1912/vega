import _ from "lodash";
export const truncateString = (text, limit) => {
  return _.truncate(text, {
    length: limit,
    separator: "...",
  });
};
