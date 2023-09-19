const getIPAddress = async () => {
  let ip = '';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
  } catch (error) {
    ip = '';
  }
  return ip;
};

const getBrowserInfo = () => {
  const client = {};
  if (navigator) {
    client.userAgent = 'userAgent' in navigator ? navigator.userAgent : '';
    client.platform = 'platform' in navigator ? navigator.platform : '';
  }
  client.timezone = Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : '';
  return client;
};

// implement a function to get the browser meta since vue-browser-detect-plugin does not support Vue 3
// ref: https://github.com/ICJIA/vue-browser-detect-plugin/blob/master/src/main.js
const getBrowserMeta = () => {
  const meta = browserSpecs();
  meta.ua = window.navigator.userAgent;
  return meta;
};
const browserSpecs = () => {
  const ua = window.navigator.userAgent;

  let tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null)
      return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return { name: M[0], version: M[1] };
};

export {
  getIPAddress,
  getBrowserInfo,
  getBrowserMeta
};
