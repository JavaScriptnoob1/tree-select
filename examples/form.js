// use jsx to render html, do not modify simple.html

import 'rc-tree-select/assets/index.less';
import 'rc-tree-select/assets/demo.less';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TreeSelect, { TreeNode } from 'rc-tree-select';
import {createForm} from 'rc-form';
import {regionStyle, errorStyle} from './styles';
import { gData } from './util';

@createForm()
class Form extends Component {
  static propTypes = {
    form: PropTypes.object,
    value: PropTypes.array,
  };

  onSubmit = (e) => {
    console.log('submit');
    e.preventDefault();
    this.props.form.validateFields((error, values)=> {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  };

  reset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  render() {
    const {form} = this.props;
    const {getFieldProps, getFieldError} = form;
    const tProps = {
      value: this.props.value,
      onSelect: this.onSelect,
      multiple: true,
      treeCheckable: true,
      treeDefaultExpandAll: true,
    };
    const loop = data => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode key={item.key} value={item.key} title={item.key + ' label'}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} value={item.key} title={item.key + ' label'}/>;
      });
    };
    return (<div style={{margin: 20}}>
      <h2>validity</h2>
      <form onSubmit={this.onSubmit}>
        <div style={regionStyle}>
          <div>
            <p style={{color: 'blue'}}>work rightly</p>
            <TreeSelect style={{width: 200}} {...tProps}
              {...getFieldProps('tree-select', {
                initialValue: ['0-0-0'],
                rules: [
                  {required: true, type: 'array', message: 'tree-select 需要必填'},
                ],
              })}>
              {loop(gData)}
            </TreeSelect>
          </div>
          <p style={errorStyle}>
            {(getFieldError('tree-select')) ? getFieldError('tree-select').join(',') : null}
          </p>
        </div>

        <div style={regionStyle}>
          <button onClick={this.reset}>reset</button>
          &nbsp;
          <input type="submit" value="submit"/>
        </div>
      </form>
    </div>);
  }
}

ReactDOM.render(<Form />, document.getElementById('__react-content'));
