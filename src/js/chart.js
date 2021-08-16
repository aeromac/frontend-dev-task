import React, { Component } from 'react';

export class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isLoaded, items, style, series, resetting } = this.props;

        if (!isLoaded || !items) return (
            <div>Loading...</div>
        )
        else {
            let max = Math.max.apply(null,
                Object.keys(items).map((key, i) => (
                    items[key]
                )));

            let step = 1;
            if(max >= 10)
            {
                max = Math.ceil(max / 10) * 10;
                step = 10;
            }

            return (
                <div className={resetting ? 'task-chart task-chart--resetting' : 'task-chart'} style={style}>
                    <ChartAxisY items={items} step={step} max={max}></ChartAxisY>
                    <ChartAxisX items={items}></ChartAxisX>
                    <ChartBarArea items={items} max={max} series={series} resetting={resetting}></ChartBarArea>
                </div>
            );
        }
    }

    static scale(number, inMin, inMax, outMin, outMax)
    {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
}

export class ChartAxisX extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items } = this.props;
        let keys = Object.keys(items);

        return (
            <div className='task-chart_axis task-chart_axis-x'>
            {
                keys.map((key, i) => (
                    <div key={i} style={{ width: (100/keys.length)+'%'}}>{key}</div> ))
            }
            </div>
        );
    }
}

export class ChartAxisY extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items, step, max } = this.props;

        let rows = [];
        for(let i = max; i >= 0; i-= step) rows.push(i);

        return (
            <div className='task-chart_axis task-chart_axis-y'>
            {
                rows.map(i =>
                (
                    <div key={i}>
                        <div className='task-chart_axis-y_label'>{i}</div>
                        <div className='task-chart_axis-y_ticks'></div>
                    </div>
                ))
            }
            </div>
        );
    }
}

export class ChartBarArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items, max, series, resetting } = this.props;

        if(items != null) return (
            <div className='task-chart_bars'>
            {
                Object.keys(items).map((key, i) =>
                {
                    let height = resetting == true ? 0 : Chart.scale(items[key], 0, max, 0, 100);
                    let barKey = series+'_'+i;

                    return ( <ChartBar key={barKey} height={height} label={key} item={items[key]}></ChartBar>
                    )
                })
            }
            </div>
        );
        else return ( <div className='task-chart_bars'></div> );
    }
}

export class ChartBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, height } = this.props;
        return (
            <div className='task-chart_bar' title={label} style={{ height: height+'%' }}></div>
        );
    }
}