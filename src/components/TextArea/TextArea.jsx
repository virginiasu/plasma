import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Base from '../Base.jsx';
import Autogrow from './autogrow';
import style from './style.scss';

class TextArea extends Component {

  componentDidMount() {

  }

  render() {
    const wrapperStyle = cx(style.wrapper, {
      [style.wrapperDisabled]: this.props.disabled,
      [style.wrapperError]: this.props.error,
      [style.wrapperLarge]: _.toUpper(this.props.size) === 'LARGE',
    });

    const textareaStyle = cx(style.textarea, {
      [style.disabled]: this.props.disabled,
      [style.large]: _.toUpper(this.props.size) === 'LARGE',
    });

    return (
      <div className={wrapperStyle}>
        <textarea
          ref={(el) => el && new Autogrow(el)}
          className={textareaStyle}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
          rows={this.props.rows}
          onFocus={(e) => {
            /* eslint-disable no-param-reassign */
            e.target.parentElement.className += ` ${style.wrapperFocused}`;
            /* eslint-enable no-param-reassign */
            this.props.onFocus && this.props.onFocus();
          }}
          onBlur={(e) => {
            e.target.parentElement.classList.remove(style.wrapperFocused);
            this.props.onBlur && this.props.onBlur();
          }}
          placeholder={this.props.placeholder}
          value={this.props.value}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  rows: PropTypes.string,
  error: PropTypes.bool,
};

TextArea.defaultProps = {
  placeholder: '',
  rows: '3',
};

TextArea.displayName = 'TextArea';

export default Base(TextArea);
