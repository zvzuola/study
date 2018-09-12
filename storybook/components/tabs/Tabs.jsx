import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TabPane from './TabPane'

class Tabs extends Component {
    static propTypes = {
        selected: PropTypes.number,
        defaultSelected: PropTypes.number,
        onChange: PropTypes.func,
        activeClassName: PropTypes.string,
        headerClassName: PropTypes.string,
    }

    static defaultProps = {
        onChange: () => { }
    }

    constructor(props) {
        super(props)
        let selected;
        if ('selected' in props) {
            selected = props.selected
        } else if ('defaultSelected' in props) {
            selected = props.defaultSelected
        } else {
            selected = 0
        }
        this.state = {
            selected
        }
    }

    _getTabHeaders() {
        const { children, headerClassName, activeClassName } = this.props;
        const labels = children.map((child, index) => {
            const active = this.state.selected === index;
            const disabled = child.props.disabled;
            const labelClasses = classNames({
                'active': active,
                'disabled': disabled,
                [activeClassName]: !!activeClassName && active
            });
            const props = {
                key: index,
                className: labelClasses
            };
            if (!disabled) { props.onClick = this.handleLabelClick.bind(this, index); }

            return (
                <div {...props}>
                    {child.props.label}
                </div>
            );
        });
        return (
            <div className={headerClassName}>{labels}</div>
        );
    }

    _getTabContent() {
        return <div>{this.props.children[this.state.selected]}</div>
    }

    handleLabelClick(selected) {
        if (!('selected' in this.props) && this.state.selected !== selected) {
            this.setState({
                selected,
            });
        }
        this.props.onChange(selected);
    }

    componentWillReceiveProps(nextProps) {
        // 一定要判断'selected' in nextProps, 否则会导致更新selected
        if ('selected' in nextProps && nextProps.selected !== this.state.selected) {
            this.setState({ selected: nextProps.selected });
        }
    }

    render() {
        return (<div>
            {this._getTabHeaders()}
            {this._getTabContent()}
        </div>)
    }
}

Tabs.TabPane = TabPane

export default Tabs