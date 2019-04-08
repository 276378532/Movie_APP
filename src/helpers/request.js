export default async function (path, opt) {
    // const url = 'https://www.easy-mock.com/mock/5a964cffdd997801d1e291fe/movie' + path;
    const url = 'https://www.easy-mock.com/mock/5c9e341b911807280cf3af83/example' + path;
    const options = Object.assign({
      method: 'GET',
    }, opt);
  
    try {
      const response = await fetch(url, options);
      const { data, status } = await response.json();
  
      if (status === 0) {
        return data;
      } else {
        // 错误处理
      }
    } catch (e) {
      // 错误处理
      // 提示/弹窗
    }
  
  }
  