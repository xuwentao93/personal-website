/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import {
  message,
  Select,
  Modal,
  Input
} from 'antd';
import Types from 'prop-types';
import { writeArticle, getArticleSubType } from '@/api/article';
import { dateFormat } from '@/utils';
import { identifyCheck } from '@/api/user';
import { TYPE_LIST } from './constant';
import './index.less';

export default function Title(props) {
  const { Option } = Select;
  const { text } = props;
  const [title, setTitle] = useState('');
  const [type, setType] = useState();
  const [subtypeList, setSubtypeList] = useState([]);
  const [subtype, setSubtype] = useState();
  const [subtypeListShow, setSubtypeListShow] = useState('none');
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const subtypeListNode = useRef();
  const subtypeInput = useRef();
  const methods = {
    async upload() {
      if (title === '') {
        message.warn('标题不能为空!');
        return;
      }
      if (title.length < 4 || title.length > 30) {
        message.warn('标题的长度必须在 4 - 30 之间!');
        return;
      }
      if (text.length < 20) {
        message.warn('文章必须大于 20 个字!');
        return;
      }
      if (!type) {
        message.warn('文章类型不能为空!');
        return;
      }
      if (type !== 'other' && !subtype) {
        message.warn('除其它类型外, 文章子类型不能为空!');
      }
      setShowModal(true);
    },
    async changeTypeValue(value) {
      setType(value);
      getArticleSubType({
        type: value
      }).then((res) => {
        setSubtypeList(JSON.parse(res.data.subtypeList));
      });
    },
    setConfirmSubtype(confirmSubtype) {
      setSubtype(confirmSubtype);
      setSubtypeListShow('none');
    },
    async ifHideSubTypeList() {
      await new Promise((resolve) => { // 调用异步方法让其他地方的 focus 先与此 focus 先执行.
        setTimeout(() => resolve(), 0);
      });
      const { children } = subtypeListNode.current;
      if (document.activeElement === subtypeInput.current) return;
      for (let i = 0; i < children.length; i++) {
        if (document.activeElement === children[i]) return;
      }
      setSubtypeListShow('none');
    },
    focusSubtypeList(event) {
      if (!type || event.key !== 'ArrowDown') return;
      subtypeListNode.current.children[0].focus();
    },
    focusOtherSubtype(event, i) {
      if (event.key === 'ArrowDown') {
        if (i === subtypeListNode.current.children.length - 1) return;
        subtypeListNode.current.children[i + 1].focus();
      }
      if (event.key === 'ArrowUp') {
        if (i === 0) return;
        subtypeListNode.current.children[i - 1].focus();
      }
    },
    identifyCheck() {
      identifyCheck({
        username,
        password
      })
        .then((res) => {
          if (res.data.success) {
            return true;
          }
          message.warn('账号或密码错误!');
          return false;
        })
        .then((data) => {
          if (data) {
            writeArticle({
              text,
              title,
              type,
              subtype,
              time: dateFormat()
            })
              .then((res) => {
                if (res.data.success) {
                  message.success('文件上传成功');
                  setShowModal(false);
                }
              })
              .catch((err) => console.log('err comes from writeArticle api:' + err));
          }
        })
        .catch((err) => console.log('err comes from identifycheck api:' + err));
    }
  };
  return (
    <div className="editor-title">
      <input
        type="text"
        className="editor-title-title"
        placeholder="输入文章标题..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="editor-title-tools">
        <Select
          placeholder="请选择文章类型"
          className="editor-title-type-list"
          value={type}
          onChange={methods.changeTypeValue}
        >
          {
            TYPE_LIST.map((item) => (
              <Option className="editor-title-type-select" value={item.value} key={item.value}>{ item.label }</Option>
            ))
          }
        </Select>
        <div className="editor-title-subtype-container">
          <input
            className="editor-title-subtype"
            placeholder="根据类型选择子类型"
            value={subtype}
            ref={subtypeInput}
            onChange={(e) => setSubtype(e.target.value)}
            onFocus={() => setSubtypeListShow('block')}
            onBlur={() => methods.ifHideSubTypeList()}
            onKeyDown={(e) => methods.focusSubtypeList(e)}
          />
          <i className="fa fa-search"></i>
          <div className="editor-title-subtype-list" style={{ display: subtypeListShow }} ref={subtypeListNode}>
            {
              subtypeList.map((_subtype, i) => (
                <div
                  key={_subtype.subtype}
                  onClick={() => methods.setConfirmSubtype(_subtype.subtype)}
                  tabIndex={i + 100}
                  onFocus={() => setSubtypeListShow('block')}
                  onBlur={() => methods.ifHideSubTypeList()}
                  onKeyDown={(e) => methods.focusOtherSubtype(e, i)}
                >
                  { _subtype.subtype }
                </div>
              ))
            }
          </div>
        </div>
        <div className="editor-title-onload" onClick={methods.upload}>上传</div>
        <Modal
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onOk={methods.identifyCheck}
        >
          <div className="username">
            <span>用户名: </span>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="password">
            <span>密码: </span>
            <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </Modal>
      </div>
    </div>
  );
}

Title.propTypes = {
  text: Types.any.isRequired
};
