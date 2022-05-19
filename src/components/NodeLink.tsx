import React from 'react';
import { Link } from 'react-router-dom';
import PathSeparator from './PathSeparator';
import { Node } from '../types'

interface NodeLinkInterface {
  node: Node,
  children: React.ReactNode
}

const NodeLink: React.FC<NodeLinkInterface> = ({
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
      <span>
        <a href={node.url}>{children}</a>
      </span>
    );
  }
}

export default NodeLink
