import React, { Component } from 'react';
import IconFooty from '/dist/img/icon-footy.svg';
import IconAge from '/dist/img/icon-age.svg';

export class ToggleButton extends Component
{
    constructor(props)
    {
      super(props);

      this.state = {
          isFirstChoice: true,
          choiceOffset: '4px'
        };
      this.handleClick = this.handleClick.bind(this);

      this.firstChoice = React.createRef();
      this.lastChoice = React.createRef();
    }

    handleClick() {
        this.setState(prevState => ({
            isFirstChoice: !prevState.isFirstChoice,
            choiceWidth: (prevState.isFirstChoice ? this.lastChoice.current.offsetWidth : this.firstChoice.current.offsetWidth)+'px',
            choiceOffset: prevState.isFirstChoice ? 'calc(100% - '+(this.lastChoice.current.offsetWidth+4)+'px)' : '4px'
        }));

        this.props.handler(!this.state.isFirstChoice);
    }

    render() {
        return (
            <div className={this.state.isFirstChoice ? 'task-toggle-button task-toggle-button--firstchoice' : 'task-toggle-button'} onClick={this.handleClick}>
                <ToggleButtonIndicator left={this.state.choiceOffset} width={this.state.choiceWidth}/>
                <ToggleButtonChoice referene={this.firstChoice} label={'Age'} icon={IconAge} />
                <ToggleButtonChoice referene={this.lastChoice} label={'Footy'} icon={IconFooty} />
            </div>
        );
    }
}

export class ToggleButtonIndicator extends Component
{
    render() {
        return (
           <div style={{ left:this.props.left, width: this.props.width}} className="task-toggle-button_indiator"></div>
        );
    }
}

export class ToggleButtonChoice extends Component
{
    constructor(props)
    {
      super(props);
    }

    render() {
        return (
            <div ref={this.props.referene} className="task-toggle-button_choice">
               <img className="task-toggle-button_choice_icon" src={this.props.icon} alt="" />
               <label className="task-toggle-button_choice_label">{ this.props.label }</label>
            </div>
        );
    }
}