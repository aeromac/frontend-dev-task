import React, { Component } from 'react';

export class Layout extends Component
{
    constructor(props)
    {
      super(props);
    }

    render() {
        return (
        <div className="task-layout">
            <div>{this.props.chart}</div>
            <div className="task-layout_toolbar">Chart showing {this.props.toggleButton}</div>
            <div>{this.props.table}</div>
        </div>
        );
    }
}