import { LANGUAGES } from '@/helpers/constants';
import welshData from '@/assets/welsh.json';

const updateLangToTextNode = (node, lang = LANGUAGES.ENGLISH) => {
  const textNodes = [];
  const pushTextNode = (node) => {
    if (node.nodeName === '#text') {
      const nodeVal = node.nodeValue.trim().replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, ' '); // remove line breaks and replace multiple spaces with a single space
      if (!nodeVal) return;

      if (lang === LANGUAGES.ENGLISH) {
        for (const [key, value] of Object.entries(welshData)) {
          if (value === nodeVal) {
            node.nodeValue = ` ${key} `; // add white space back to deal with the text concatenation
            textNodes.push(nodeVal);
          }
        }
      } else if (lang === LANGUAGES.WELSH) {
        if (welshData[nodeVal]) {
          node.nodeValue = ` ${welshData[nodeVal]} `; // add white space back to deal with the text concatenation
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
