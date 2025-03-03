import React, { isValidElement, cloneElement } from 'react';
import BaseComponent, { BaseProps } from '../_base/baseComponent';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/button/constants';
import { Type, Size } from './Button';

import '@douyinfe/semi-foundation/button/button.scss';

export type Theme = 'solid' | 'borderless' | 'light';

export interface ButtonGroupProps extends BaseProps {
    disabled?: boolean;
    type?: Type;
    size?: Size;
    theme?: Theme;
    className?: string;
    children?: React.ReactChild;
    'aria-label'?: React.AriaAttributes['aria-label'];
}

const prefixCls = cssClasses.PREFIX;
const btnSizes = strings.sizes;

export default class ButtonGroup extends BaseComponent<ButtonGroupProps> {
    static propTypes = {
        children: PropTypes.node,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        size: PropTypes.oneOf(btnSizes),
        theme: PropTypes.oneOf(strings.themes),
        'aria-label': PropTypes.string,
    };

    static defaultProps = {
        size: 'default',
        type: 'primary',
        theme: 'light',
    };

    render() {
        const { children, disabled, size, type, className, 'aria-label': ariaLabel, ...rest } = this.props;
        let inner;
        const cls = classNames(`${prefixCls}-group`, className);

        if (children) {
            inner = ((Array.isArray(children) ? children : [children])).map((itm: React.ReactChild, index) => (
                isValidElement(itm)
                    ? cloneElement(itm, { disabled, size, type, ...itm.props, ...rest, key: index })
                    : itm
            ));
        }
        return <div className={cls} role="group" aria-label={ariaLabel}>{inner}</div>;
    }
}
