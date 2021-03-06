import '../assets/index.less';
import React from 'react';
import Dialog from 'rc-dialog';
import moment from 'moment';

import Calendar from '../src';
import DatePicker from '../src/Picker';
import 'rc-dialog/assets/index.css';

import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

class Demo extends React.Component {
  state = {
    open: false,
    destroy: false,
  };

  getCalendarContainer() {
    return this.d || document.getElementById('d');
  }

  setVisible(open) {
    this.setState({
      open,
    });
  }

  open = () => {
    this.setVisible(true);
  };

  close = () => {
    this.setVisible(false);
  };

  destroy = () => {
    this.setState({
      destroy: true,
    });
  };

  render() {
    if (this.state.destroy) {
      return null;
    }
    return (
      <div>
        <button type="button" onClick={this.open}>
          open
        </button>
        &nbsp;
        <button type="button" onClick={this.destroy}>
          destroy
        </button>
        <Dialog visible={this.state.open} onClose={this.close}>
          <div
            id="d"
            ref={n => {
              this.d = n;
            }}
          />
          <div style={{ marginTop: 20 }}>
            <DatePicker
              getCalendarContainer={this.getCalendarContainer}
              calendar={<Calendar locale={cn ? zhCN : enUS} />}
            >
              {({ value }) => (
                <span>
                  <input
                    style={{ width: 250 }}
                    readOnly
                    value={(value && value.format(format)) || ''}
                  />
                </span>
              )}
            </DatePicker>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Demo;
