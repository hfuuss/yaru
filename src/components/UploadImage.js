import React, { Component } from 'react'
import { Upload, Icon, message, Row, Card, Tooltip, Progress } from 'antd'
import { connect } from 'dva'
import * as qiniujs from 'qiniu-js'
import moment from 'moment'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import genUpToken from '../util/getToken'

const { Dragger } = Upload;
const { Meta } = Card

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      draggerProps: {
        directory: false,//目录上传
        multiple: true,//多文件上传
        showUploadList: false,//不展示文件列表
      },
      percent: 0
    }
    this.pastFile = null
    this.accessKey = ''
    this.secretKey = ''
    this.bucket = ''
    this.host = ''
    this.fileName = `${moment().format('YYYY-MM-DD')}-${moment().unix()}.jpg`
    this.putPolicy = {
      scope:`${this.bucket}:${this.fileName}`,
      deadline: moment().add(1,'day').unix()
    }

    this.uploadToken = genUpToken(this.accessKey,this.secretKey,this.putPolicy)
  }

  onClipClick = (text) => {
    message.success(`copy ${text} success!`)
  }

  pasetEvent =  event => {
    var items = event.clipboardData && event.clipboardData.items;
    if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                this.pastFile = items[i].getAsFile();
                this.uploadFile(this.pastFile)
                break;
            }
        }
    }
  }

  componentDidMount() {
    document.addEventListener('paste',this.pasetEvent );
  }
  componentWillUnmount() {
    document.removeEventListener('paste',this.pasetEvent)
  }

  observer = {
    next : (res) => {
     this.setState({
      percent: res.total.percent
     })
    },
    error : (err) => {
      console.log('err',err)
    }, 
    complete: (res) =>{
      message.success('上传成功！')
      this.setState(prestate => ({fileList:prestate.fileList.concat(`${this.host}${res.key}`)}))
    }
  }
  updateToken = () => {
    this.fileName = `${moment().format('YY-MM-DD')}-${moment().format('x').slice(moment().format('x').length - 6,moment().format('x'))}.jpg`
    this.putPolicy = {
      scope:`${this.bucket}:${this.fileName}`,
      deadline: moment().add(1,'day').unix()
    }
    this.uploadToken = genUpToken(this.accessKey,this.secretKey,this.putPolicy)
  }

  uploadFile = file => {
    this.updateToken()
    this.setState({
      percent: 0
    })
    var observable = qiniujs.upload(file,this.fileName, this.uploadToken, {}, {})
    observable.subscribe(this.observer)
  }
  
  render() {
    const { accessKey, secretKey, bucket, host} = this.props
    const { draggerProps, fileList } = this.state
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.bucket = bucket
    this.host = host
    return (
      <React.Fragment>
         <Row type="flex" justify="space-around">
            <Dragger {...draggerProps} customRequest={obj => this.uploadFile(obj.file)} style={{padding: 20}}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">截图后粘贴、单击或拖动文件到此区域进行上传</p>
              <p className="ant-upload-hint">支持单个或批量上传。</p>
            </Dragger>
        </Row>
        <Progress percent={this.state.percent} style={{width: '375px'}}/>
        <Row type="flex" justify="space-around" style={{marginTop: 20, flexWrap: 'wrap',alignContent: 'space-around'}}>
          {fileList.map(i => {
            return (
              <Card
                  key={i}
                  bordered
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={i} src={i}  />}
                  actions={[
                    <CopyToClipboard 
                      text={i}
                      onCopy={() => this.onClipClick('link')}
                    >
                      <Tooltip placement="topRight" title={'copy'}>
                            <Icon type="copy" />
                      </Tooltip>
                    </CopyToClipboard>
                    , 
                    <CopyToClipboard 
                      text={`![](${i})`}
                      onCopy={() => this.onClipClick('markdown')}
                    >
                      <Tooltip placement="topRight" title={'cpoy markdown'}>
                        <Icon type="file-markdown" />
                      </Tooltip>
                    </CopyToClipboard>
                    ,
                    <CopyToClipboard 
                      text={'小小 小公主最漂亮'}
                      onCopy={() => this.onClipClick('小公主')}
                    >
                      <Tooltip placement="rightTop" title={'小小 小公主最漂亮'}>
                        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                      </Tooltip>
                    </CopyToClipboard>
                ]}
                >
                <Meta
                  title="图片链接"
                  description={<a href={i} target="_blank" rel="noopener noreferrer">{i}</a>}
                />
              </Card>
            )
          })}
        </Row>
      </React.Fragment>
      
    );
  }
}

export default connect((state) => ({
  accessKey: state.config.accessKey,
  secretKey: state.config.secretKey,
  bucket: state.config.bucket,
  host: state.config.host
}))(UploadImage)