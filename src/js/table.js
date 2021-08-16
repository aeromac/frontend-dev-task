import React, { Component } from 'react';

export class Table extends Component
{
    constructor(props)
    {
      super(props);
    }

    render() {
        const { isLoaded, items } = this.props;

        if(!isLoaded) return (
            <div>Loading</div>
        )
        else return (
            <table className='task-table'>
            <TableHeader></TableHeader>
                <tbody>
                {
                    items.map((item, i) => ( 
                        <TableRow key={i} item = {item}></TableRow>
                    ))
                }
                </tbody>
            </table>
        );
    }
}

export class TableHeader extends Component
{
    render() {
        return (
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Footy team</td>
                </tr>
            </thead>
        );
    }
}

export class TableRow extends Component
{
    constructor(props)
    {
      super(props);
    }

    render() {
        return (
                <tr>
                    <td>{ this.props.item.Name }</td>
                    <td>{ this.props.item.Age }</td>
                    <td>{ this.props.item.FootyTeam }</td>
                </tr>
        );
    }
}