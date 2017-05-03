import React, { Component, PropTypes } from 'react';
import { toHumanFileSize } from '../utils/numberUtils';

import GridPad, { GridHead, GridBody, GridBar, GridCell } from '../components/GridPad';
import Button from '../components/Button';
import Dropzone from 'react-dropzone';

const styles = {
  default: {
    margin: '30px 0 10px 0',
    padding: 15,
    borderRadius: '5px',
    border: '2px dashed #444',
    color: '#444',
  },
  active: {
    border: '2px solid #f5843c',
    color: '#f5843c',
  }
};

class UploadBackup extends Component {
  state = {
    file: null
  }

  getFileInfo() {
    const { file } = this.state;

    if(file) {
      return (
        <GridPad>
          <GridHead>
            <GridBar>
              <GridCell colSpan={2}><h3>فایل انتخاب شده</h3></GridCell>
            </GridBar>
          </GridHead>
          <GridBody>
            <GridBar>
              <GridCell width="20%">نام فایل</GridCell>
              <GridCell style={{ fontFamily: 'IRANSansWeb', direction: 'ltr' }}>
                {file.name}
              </GridCell>
            </GridBar>

            <GridBar>
              <GridCell>حجم</GridCell>
              <GridCell style={{ fontFamily: 'IRANSansWeb', direction: 'ltr' }}>
                {toHumanFileSize(file.size)}
              </GridCell>
            </GridBar>
          </GridBody>
        </GridPad>
      );
    }

    return null;
  }

  render() {
    return (
      <div>

        {/*<Dropzone
          style={styles.default}
          activeStyle={styles.active}
          disablePreview={true}
          accept="application/gzip,application/tar,application/tar+gzip,application/x-gzip,application/zip"
          onDrop={files => this.setState({ file: files[0] })}>
          <div>
            فایل پشتیبان خود را با فرمت فشرده اینجا بکشید یا اینجا کلیک کنید
          </div>
        </Dropzone>

        {this.getFileInfo()}*/}

        <Button
          >

        </Button>

      </div>
    );
  }
}

export default UploadBackup;
