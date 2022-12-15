import { LANGUAGES } from '@/helpers/constants';
import welshData from '@/assets/welsh.json';

const updateLangToTextNode = (node, lang = LANGUAGES.ENGLISH) => {
  const textNodes = [];
  const pushTextNode = (node) => {
    if (node.nodeName === '#text') {
      const nodeVal = node.nodeValue.trim();
      if (!nodeVal) return;

      if (lang === LANGUAGES.ENGLISH) {
        for (const [key, value] of Object.entries(welshData)) {
          if (value === nodeVal) {
            node.nodeValue = key;
            textNodes.push(nodeVal);
          }
        }
      } else if (lang === LANGUAGES.WELSH) {
        if (welshData[nodeVal]) {
          node.nodeValue = welshData[nodeVal];
          textNodes.push(nodeVal);
        }
      }
      return;
    }

    node.childNodes.forEach((childNode) => {
      pushTextNode(childNode);
    });
  };
  
  pushTextNode(node);
  return textNodes;
};

export {
  updateLangToTextNode
};
