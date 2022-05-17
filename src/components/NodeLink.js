import React from 'react';
import { Link } from 'react-router-dom';
import PathSeparator from './PathSeparator';

const NodeLink = ({
  node,
  children,
}) => {
  if (node.children) {
    return (
      <span>
        <Link to={node.path}>{children}</Link>
        <PathSeparator />
      </span>
    );
  } else {
    return (
      <span style={
        {
          'a:visited': {
            color: 'green'
          }
        }
      }>
        <a href={node.url}>{children}</a>
      </span>
    );
  }
}

export default NodeLink