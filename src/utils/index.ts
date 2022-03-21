export function dateFormat(time = Date.parse((new Date() as any))) { // !! 这个函数还需要在修改一下.让他可以返回不同的值.
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
  const hour = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
  const minute = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
  const second = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
