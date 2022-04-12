import * as React from 'react';
import { useState } from 'react';
import { getSearchList } from '@/api';
import './index.less';

interface SearchList {
  id: string,
  title: string
}

export default function NewNavigation() {

  const [focus, setFocus] = useState(false);
  const [searchList, setSearchList] = useState<SearchList[]>([]);
  const [showSearchList, setShowSearchList] = useState(false);

  const methods = {
    getSearchList(content: string) {
      getSearchList({ content })
        .then((res: any) => {
          if (res.success) {
            setSearchList(res?.data || []);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    showSearchList(e: React.MouseEvent) {
      setShowSearchList(true);
      e.stopPropagation();
    },
    toArticlePage(e: React.MouseEvent, id: string) {
      window.open(`./article/${id}`);
      e.stopPropagation();
    }
  };

  return (
    <div className="personal-new-navigation-component" onClick={() => setShowSearchList(false)}>
      <img
        src="https://img.alicdn.com/imgextra/i3/O1CN01tCQx6r1vGuwZuW4jd_!!6000000006146-2-tps-936-844.png"
        className="avatar"
        alt=""
      />
      <div className="name">Wentao Xu</div>
      <div
        className="input-container"
        style={focus ? {
          backgroundColor: '#fff',
          borderColor: '#1e80ff'
        } : {}}
      >
        <input
          type="text"
          className="input"
          placeholder="搜索"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onClick={methods.showSearchList}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => methods.getSearchList(e.target.value)}
        />
        <img
          src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6401156ae5d55b2253b3d2351231f02c.svg"
          alt=""
        />
        {showSearchList && (
          <div className="search-list">
            {searchList.map(item => (
              <div
                className="search"
                key={item.id}
                onClick={(e: React.MouseEvent) => methods.toArticlePage(e, item.id)}
              >
                {item.title}
              </div>
            ))}
            {searchList.length === 0 && <div className="no-data">暂无数据</div>}
          </div>
        )}
      </div>
    </div>
  );
}
