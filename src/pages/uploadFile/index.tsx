import * as React from 'react';
import {
  useState, useEffect, useRef, useTransition
} from 'react';
import {
  Button, Progress, Table, message
} from 'antd';
import Scheduler from '@/utils/schedule';
import SparkMD5 from 'spark-md5';
import './index.less';

// 切片大小为 5 MB.
const SIZE = 5 * 1024 * 1024;

interface TypeChunk {
  chunk: Blob,
  hash: string,
  progress: number,
  status?: 'fail' | 'success' | 'pending'
}

interface RequestParams {
  url: string,
  method: 'get' | 'post',
  data: XMLHttpRequestBodyInit | undefined,
  headers?: any,
  onprogress?: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any
}

const schedule = new Scheduler();
export default function UploadFile() {
  const [file, setFile] = useState<File>();
  const [isPending, startTransition] = useTransition();
  const [totalProgress, setTotalProgress] = useState('0');
  const [hashProgress, setHashProgress] = useState(0);
  const [fileChunkList, setfileChunkList] = useState<TypeChunk[]>([]);

  const fileDOM = useRef<HTMLInputElement>(null);

  const columns: any[] = [
    {
      title: '文件名',
      dataIndex: 'hash'
    },
    {
      title: '进度',
      dataIndex: 'progress',
      render(value: number) {
        return <Progress percent={value} />;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(value: string) {
        if (value === 'success') {
          return <div>成功</div>;
        }
        if (value === 'pending') {
          return <div>上传中...</div>;
        }
        return <div>重传</div>;
      }
    }
  ];

  // 自定义 ajax 请求.
  const request = (params: RequestParams) => {
    const {
      url, method, data, headers, onprogress
    } = params;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (onprogress) {
        xhr.upload.onprogress = onprogress;
      }
      xhr.open(method, url);
      if (headers) {
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
      }
      xhr.send(data);
      xhr.onload = e => {
        resolve({
          data: e?.target
        });
      };

      xhr.onerror = e => {
        reject(e);
      }
    });
  };

  // 获取单个文件的进度.
  const getChunkProgress = (index: number) => {
    return (e: ProgressEvent<EventTarget>) => {
      fileChunkList[index].progress = Math.floor(e.loaded / e.total * 100);
      if (e.loaded === e.total) {
        fileChunkList[index].status = 'success';
      } else {
        fileChunkList[index].status = 'pending';
      }
      setfileChunkList(([] as TypeChunk[]).concat(fileChunkList));
    };
  }

  // 使用 md5 加密.
  const calculateHash = (prevFileChunkList: TypeChunk[]) => {
    return new Promise(resolve => {
      const spark = new SparkMD5.ArrayBuffer();
      let count = 0;
      const appendToSpark = async (file: Blob) => {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = e => {
            spark.append(e?.target?.result as ArrayBuffer);
            resolve(true);
          };
        });
      }

      const workLoop = async () => {
        while (count < prevFileChunkList.length) {
          // eslint-disable-next-line no-await-in-loop
          await appendToSpark(prevFileChunkList[count++].chunk);
          if (count < prevFileChunkList.length) {
            startTransition(() => {
              setHashProgress(Math.floor(100 * count / prevFileChunkList.length));
            });
          } else {
            setHashProgress(100);
            resolve(spark.end());
          }
        }
        requestIdleCallback(workLoop);
      }
      requestIdleCallback(workLoop);
    });
  }

  const chooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setFile(file);
  };

  // 生成文件切片, 生成文件 hash.
  const createFileChunk = async () => {
    if (!file) {
      return;
    }
    const prevFileChunkList = [];
    let cur = 0;
    let i = 0;
    // 生成切片.
    while (cur < file.size) {
      prevFileChunkList.push({
        chunk: file.slice(cur, cur + SIZE),
        hash: '',
        progress: 0,
        key: cur
      });
      cur += SIZE;
      i++;
    }

    const result = await calculateHash(prevFileChunkList);
    prevFileChunkList.forEach(item => item.hash = (result as string));
    setfileChunkList(prevFileChunkList);
  };

  // 上传, 调用上传碎片文件接口, 最终调用合并接口.
  const upload = async () => {
    if (hashProgress > 0 && hashProgress < 100) {
      message.error('当前文件正在识别中, 请稍等...');
      return;
    }

    if (fileChunkList.length === 0 || !file) {
      return;
    }

    const requestList = fileChunkList.map(({ chunk, hash }) => {
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('hash', hash);
      formData.append('name', file.name);
      return formData;
    }).map((formData, index) => () => request({
      url: 'http://www.wentaowulue.com:3456/file/upload',
      method: 'post',
      data: formData,
      onprogress: getChunkProgress(index)
    }));

    // Promise.all(requestList);
    // 异步并发器控制请求数量.
    const result: any = await schedule.add(requestList);

    // 碎片传送完成, 通知服务器合并.
    for (let i = 0; i < result.length; i++) {
      if (result[i].status === 'fail') {
        return;
      }
    }
    await request({
      url: 'http://www.wentaowulue.com:3456/file/merge',
      method: 'post',
      data: JSON.stringify({
        name: file.name,
        size: file.size
      }),
      headers: { 'content-type': 'application/json' }
    });
  };

  useEffect(() => {
    if (file) {
      // 文件上传后, 可以对其立即形成切片.
      createFileChunk();
    }
  }, [file]);

  useEffect(() => {
    if (fileChunkList.length !== 0) {
      let percent = 0;
      for (let i = 0; i < fileChunkList.length; i++) {
        percent += fileChunkList[i].progress;
      }
      setTotalProgress((percent / fileChunkList.length).toFixed(2));
    }
  }, [fileChunkList]);

  return (
    <div className="uploadFile">
      <div className="operate">
        <div className="file">
          <Button type="primary" onClick={() => fileDOM.current?.click()}>
            选择要上传的文件
          </Button>
        </div>
        <Button className="button" type="primary" onClick={upload}>
          开始上传
        </Button>
        <Button className="button" type="primary" onClick={() => schedule.continue()}>
          继续上传
        </Button>
        <Button className="button" type="primary" danger onClick={() => schedule.pause()}>
          停止上传
        </Button>
      </div>
      <div className="progress-container">
        <div className="progress-title">文件分析进度:</div>
        <Progress percent={hashProgress} />
      </div>
      <div className="progress-container">
        <div className="progress-title">上传总进度:</div>
        <Progress percent={Number(totalProgress)} />
      </div>
      {fileChunkList.length !== 0 && (
        <Table columns={columns} dataSource={fileChunkList} pagination={false} />
      )}

    <input type="file" ref={fileDOM} onChange={chooseFile} className="hide" />
    </div>
  );
}
