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

export {
  getIPAddress,
  getBrowserInfo
};
