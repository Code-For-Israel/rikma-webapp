// input with icon inside.

import React from "react";

export default class InputWithIcon extends React.PureComponent {
  render() {
    return <div className="input-with-icon">{this.props.children}</div>;
  }
}
