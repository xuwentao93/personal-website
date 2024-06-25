// 全自动首屏时间采集方案, 非常核心的技术点.

const scoureWithTime: { time: number, score: number }[] = []; // 假设 scoureWithTime 是一个存储首屏加载时间相关信息的数组
const CHECK_INTERVAL = 1000; // 假设 CHECK_INTERVAL 是一个表示检查间隔的时间值

export function CScor(el: Element, tiers: number, parentScore = 0): number {
  let score = parentScore;
  const { tagName } = el;
  // 判断当前的标签元素是否为指定的标签元素
  if (!filterTagNameInTagNames(tagName)) {
    const childrenLen = el.children ? el.children.length : 0;
    // 判读子元素的长度是否大于0
    if (childrenLen > 0) {
      for (let len = childrenLen - 1; len >= 0; len--) {
        const child = el.children[len];
        score += CScor(child, tiers + 1, parentScore); // 递归计算子元素的分数
      }
    }
    // getBoundingClientRect 会引起回流和重绘, 导致计算不准确.
    const rect = el.getBoundingClientRect();
    // 元素超过可视范围, 计为 0 分.
    if (rect.top > window.innerHeight) return 0;
    score += 0.5 * tiers;
  }
  return score;
}

function filterTagNameInTagNames(tagName: string): boolean {
  return ['SCRIPT', 'STYLE', 'META', 'HEAD'].some(tag => tag === tagName);
}

function calFinalScore() {
  let stop = false;
  const time = performance.now();
  // 结束判断, 达到一下任意条件结束:
  // 1. 超过 8s. 2. 计算了 4 轮且分数 1s 内没有变化. 3. 计算 9 次分数没有变化.
  const { length } = scoureWithTime;
  let isCheckFMP = time > 8000
  || (length > 4 && time - (scoureWithTime[length - 1]?.time || 0) > 2 * CHECK_INTERVAL)
  || (length > 10 && window.performance.timing.loadEventEnd !== 0 &&
      scoureWithTime[length - 1]?.score === scoureWithTime[length - 2]?.score);

  if (isCheckFMP) {
    stop = true;
    // 取 FMP 时间，默认是 30001 大于 30s 会自动被过滤
    const imgElements = document.querySelectorAll('img');

    // 遍历所有的 img 标签元素
    imgElements.forEach(imgElement => {
      // 获取图片的 URL
      const imgUrl = imgElement.src;
      // 创建一个 Image 对象
      const img = new Image();

      // 记录请求开始时间
      const startTime = performance.now();

      // 设置图片加载完成的事件处理程序
      img.onload = () => {
        // 记录请求结束时间
        const endTime = performance.now();

        // 计算请求持续时间
        const duration = endTime - startTime;

        // 输出图片请求信息
        console.log('图片 URL：', imgUrl);
        console.log('请求开始时间：', startTime);
        console.log('请求结束时间：', endTime);
        console.log('持续时间：', duration + ' 毫秒');
      };

      // 设置图片加载失败的事件处理程序
      img.onerror = () => {
        // 输出加载失败信息
        console.log('图片加载失败：', imgUrl);
      };

      // 设置图片的 URL
      img.src = imgUrl;
    });
  }
  return stop;
}

export function analyzeDOM(dom: Node) {
  const observer = new MutationObserver(mutations => {
    const time = performance.now();
    let baseScore = 0;
    let fatherNode: Node| null = mutations[0].target;
    while (fatherNode) {
      if ((fatherNode as (Node & { id: string })).id === 'root') {
        break;
      }
      fatherNode = fatherNode.parentNode;
      baseScore += 0.5;
    }
    // console.log(mutations);
    const score = CScor(mutations[0].target as Element, 0, baseScore);
    scoureWithTime.push({
      score,
      time
    });
    let stop = calFinalScore();

    if (stop) {
      observer.disconnect();
    }
  });

  const config = {
    attributes: true, // 监听属性变化
    childList: true, // 监听子节点变化
    // characterData: true, // 监听文本内容变化
    subtree: true // 监听后代节点变化
  };

  observer.observe(dom, config);

  window.onload = () => {
    // console.log('window.onload', performance.now());
  };
}
