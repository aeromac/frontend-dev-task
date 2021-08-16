import React, { Component } from 'react';
import { Layout } from './layout';
import { Chart } from './chart';
import { Table } from './table';
import { ToggleButton } from './toggle-button';
import '../css/app.css'; 

const axios = require('axios');

class TaskApp extends Component
{
    constructor(props)
    {
      super(props);

      this.ageDefault = true;

      this.state = {
        error: null,
        isLoaded: false,
        chartItems: null,
        byAge: true
      };

      this.items = null;
    }

    componentDidMount()
    {
        axios.get('/dist/frontend-dev-task-data.json').then((result) =>
        {
            this.items = result.data;

            this.setState({ isLoaded: true });
            this.filter(this.ageDefault);
        })
        .catch((error) => {
            this.setState({
              isLoaded: true,
              error
            });
        });
    }

    onToggle(byAge)
    {
        this.state.byAge = byAge;
        this.filter();
    }

    filter()
    {
        this.setState({ chartItems: this.getChartItems(), series: this.state.byAge ? 'age' : 'team', resetting: true });
    }

    componentDidUpdate()
    {
        if(!this.state.resetting) return;
        setTimeout(() => this.setState({ chartItems: this.getChartItems(), series: this.state.byAge ? 'age' : 'team', resetting: false }), 50);
    }

    getChartItems()
    {
        let chartItems = [];
        this.sort(this.state.byAge).forEach(item => {
            return this.state.byAge ? chartItems[item.Name] = item.Age :
            chartItems[item.FootyTeam] = chartItems[item.FootyTeam]+1 || 1;
        });
        return chartItems;
    }

    sort(byAge)
    {
        return [...this.items].sort((a, b) =>
        {
            if((byAge && a.Name < b.Name) || (!byAge && a.FootyTeam < b.FootyTeam)) { return -1; }
            if((byAge && a.Name > b.Name) || (!byAge && a.FootyTeam > b.FootyTeam)) { return 1; }
            return 0;
        });
    }

    render() {
        const { error, isLoaded, chartItems, resetting } = this.state;
        if(!error)
        {
            return (
                <Layout chart = {
                    <Chart
                        style={{ height:'250px' }}
                        isLoaded = {isLoaded}
                        items = {chartItems}
                        resetting = {resetting} />
                }
                toggleButton = {
                    <ToggleButton 
                        handler = {this.onToggle.bind(this)}
                        isLoaded = {isLoaded} />
                }
                table = {
                    <Table 
                        isLoaded = {isLoaded}
                        items = {this.items} />
                }></Layout >
            );
        }
        else
        {
            return <div>Error: {error.message}</div>;
        }
    }
}
export default TaskApp;