import React from 'react';

const SearchResultTitle = ({ matchData }) => {
  var first = true;
  var i = 0;

  const path = matchData.map(parts => {
    const result = [];
    if (first) {
      first = false;
    }
    else {
      result.push(<span key={i++}>/</span>);
    }
    parts.forEach(part => {
      const style = part.match ? { fontWeight: 'bold' } : {}
      result.push(<span key={i++} style={style}>{part.fragment}</span>);
    });
    return result;
  });

  return <span>{path}</span>;
}
export default SearchResultTitle 