// 时间格式.
export function dateFormat(time = Date.parse((new Date() as any))) { // !! 这个函数还需要在修改一下.让他可以返回不同的值.
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
  const hour = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
  const minute = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
  return `${year}年${month}月${day}日 ${hour}:${minute}`;
}

export function getQueryString(name: string) {
  // 获取url上的参数（使用decodeURIComponent对url参数进行解码）
  let search = decodeURIComponent(window.location.search).replace('?', '');
  const tempArr = search !== '' ? search.split('&') : [];

  // 将参数名转小写，参数值保留原大小写
  tempArr.forEach(item => {
    if (item) {
      const itemArr = item.split('=');
      search = search.replace(itemArr[0], itemArr[0].toLowerCase());
    }
  });

  // 正则匹配指定的参数
  const reg = new RegExp(`(^|&)${name.toLowerCase()}=([^&]*)(&|$)`);
  const result = search.match(reg);

  return result != null ? result[2] : '';
}

// 图片 file 对象转 string 逃避 ts 校验.
export function toggleImgToString(img: File): string {
  return URL.createObjectURL(img);
}
