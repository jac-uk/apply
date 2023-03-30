import { LANGUAGES } from '@/helpers/constants';
import welshData from '@/assets/welsh.json';

const yesWelshList = [
  {
    class: ['reasonable-adjustments', 'request-to-resign', 'criminal-offenses-cautions', 'disability', 'part-time-working-preferences'],
    welsh: 'OES',
  },
  {
    class: ['first-generation-student'],
    welsh: 'IE',
  },
  {
    class: ['changed-gender'],
    welsh: 'YDY',
  },
  {
    class: ['participated-in-judicial-workshadowing-scheme', 'oxbridge-universities', 'atttended-outreach-events', 'participated-in-judicial-workshadowing-scheme'],
    welsh: 'DO',
  },
  {
    class: ['applying-for-welsh-post', 'speak-welsh', 'applying-under-schedule-2-d'],
    welsh: 'YDWYF',
  },
  {
    class: ['can-give-reasonable-los'],
    welsh: 'GALLAF',
  },
];
const noWelshList = [
  {
    class: ['reasonable-adjustments', 'request-to-resign', 'criminal-offenses-cautions', 'disability', 'part-time-working-preferences'],
    welsh: 'NAC OES',
  },
  {
    class: ['first-generation-student', 'read-and-write-welsh'],
    welsh: 'NA',
  },
  {
    class: ['changed-gender'],
    welsh: 'NAC YDY',
  },
  {
    class: ['participated-in-judicial-workshadowing-scheme', 'oxbridge-universities', 'atttended-outreach-events', 'participated-in-judicial-workshadowing-scheme', 'has-taken-paje'],
    welsh: 'NADDO',
  },
  {
    class: ['applying-for-welsh-post'],
    welsh: 'NAC YF',
  },
  {
    class: ['speak-welsh', 'applying-under-schedule-2-d'],
    welsh: 'NAC YDWYF',
  },
  {
    class: ['can-give-reasonable-los'],
    welsh: 'NA ALLAF',
  },
];

const updateLangToTextNode = (node, lang = LANGUAGES.ENGLISH) => {
  const textNodes = [];
  const pushTextNode = (node) => {
    if (node.nodeName === '#text') {
      const nodeVal = node.nodeValue.trim().replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, ' '); // remove line breaks and replace multiple spaces with a single space
      if (!nodeVal) return;

      if (lang === LANGUAGES.ENGLISH) {
        if (yesWelshList.find(item => item.welsh === nodeVal)) {
          node.nodeValue = 'Yes ';
          textNodes.push(nodeVal);
          return;
        }
        if (noWelshList.find(item => item.welsh === nodeVal)) {
          node.nodeValue = 'No ';
          textNodes.push(nodeVal);
          return;
        }

        let hasMatch = false;
        for (const [key, value] of Object.entries(welshData)) {
          if (value === nodeVal) {
            node.nodeValue = ` ${key} `; // add white space back to deal with the text concatenation
            textNodes.push(nodeVal);
            hasMatch = true;
            break;
          }
        }

        if (!hasMatch) {
          const texts = nodeVal.split(' '); // deal with translated date 
          let hasWelsh = false;
          const res = [];
          texts.forEach(text => {
            let hasMatch = false;
            for (const [key, value] of Object.entries(welshData)) {
              if (value === text) {
                res.push(key);
                hasMatch = true;
                hasWelsh = true;
                break;
              }
            }
            if (!hasMatch) res.push(text);
          });
          if (hasWelsh) {
            node.nodeValue = ` ${res.join(' ')} `;
            textNodes.push(nodeVal);
          }
        }
      } else if (lang === LANGUAGES.WELSH) {
        if (nodeVal === 'Yes') {
          const match = yesWelshList.find(item => {
            const name = node.parentNode.getAttribute('for');
            if (!name) return false;
            return item.class.some(c => name.includes(c));
          });
          if (match) {
            node.nodeValue = ` ${match.welsh} `;
            textNodes.push(nodeVal);
            return;
          }
        }
        if (nodeVal === 'No') {
          const match = noWelshList.find(item => {
            const name = node.parentNode.getAttribute('for');
            if (!name) return false;
            return item.class.some(c => name.includes(c));
          });
          if (match) {
            node.nodeValue = ` ${match.welsh} `;
            textNodes.push(nodeVal);
            return;
          }
        }

        if (welshData[nodeVal]) {
          node.nodeValue = ` ${welshData[nodeVal]} `; // add white space back to deal with the text concatenation
          textNodes.push(nodeVal);
        } else {
          const texts = nodeVal.split(' '); // deal with date (e.g. March 2023)
          let hasMatch = false;
          const res = [];
          texts.forEach(text => {
            if (welshData[text]) {
              res.push(welshData[text]);
              hasMatch = true;
            } else {
              res.push(text);
            }
          });
          if (hasMatch) {
            node.nodeValue = ` ${res.join(' ')} `;
            textNodes.push(nodeVal);
          }
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
