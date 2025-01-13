/*eslint func-style: ["error", "declaration"]*/

export {
  filteredPreferences,
  isAllRequiredFilled,
  tidyData,
  isVersion1,
  extractAnswers
};

import _map from 'lodash/map.js';
import _keys from 'lodash/keys.js';
import _difference from 'lodash/difference.js';

function filteredPreferences(vacancy, formData, formId) {
  if (!vacancy) return [];
  const preferences = vacancy[formId];  // all relevant preferences
  const allPreferences = [];
  if (vacancy.locationPreferences) allPreferences.push(...vacancy.locationPreferences);
  if (vacancy.jurisdictionPreferences) allPreferences.push(...vacancy.jurisdictionPreferences);
  if (vacancy.additionalWorkingPreferences) allPreferences.push(...vacancy.additionalWorkingPreferences);
  const allData = {};
  if (formData.locationPreferences) Object.assign(allData, formData.locationPreferences);
  if (formData.jurisdictionPreferences) Object.assign(allData, formData.jurisdictionPreferences);
  if (formData.additionalWorkingPreferences) Object.assign(allData, formData.additionalWorkingPreferences);
  const mainQuestions = [];
  const linkedQuestions = [];
  if (Array.isArray(preferences)) {
    preferences.forEach(item => {
      if (item.linkedQuestion && item.linkedAnswer) {
        if (!allData[item.linkedQuestion]) return;
        const linkedQuestion = allPreferences.find(question => question.id === item.linkedQuestion);
        if (linkedQuestion) {
          switch (linkedQuestion.questionType) {
          case 'single-choice':
            if (allData[item.linkedQuestion] === item.linkedAnswer) {
              linkedQuestions.push(item);
            }
            break;
          case 'multiple-choice':
            if (allData[item.linkedQuestion].indexOf(item.linkedAnswer) >= 0) {
              linkedQuestions.push(item);
            }
            break;
          case 'ranked-choice':
            if (Object.keys(allData[item.linkedQuestion]).includes(item.linkedAnswer)) {
              linkedQuestions.push(item);
            }
            break;
          }
        }
      } else {
        mainQuestions.push(item);
      }
    });
  }
  return mainQuestions.concat(linkedQuestions);
}

function isAllRequiredFilled(filteredPreferences, formData, formId) {
  const requiredPreferences = filteredPreferences.filter((p) => p.questionRequired);
  if (filteredPreferences.length) {
    const requiredPreferenceIds = _map(requiredPreferences, 'id');
    const filledPreferenceIds = _keys(formData[formId]);
    const unfilledRequiredPreferenceIds = _difference(requiredPreferenceIds, filledPreferenceIds);
    const isAllRequiredFilled = unfilledRequiredPreferenceIds.length === 0;
    return isAllRequiredFilled;
  } else {
    return formData[formId] ? true : false;
  }
}

function tidyData(preferences, data, preference) {
  // check whether we can remove preference that was just updated
  if (preference) {
    const ident = preference.id;
    const type = preference.questionType;
    switch (type) {
    case 'single-choice':
      if (!data[ident]) {
        delete data[ident];
      }
      break;
    case 'multiple-choice':
      if (data[ident].length === 0) {
        delete data[ident];
      }
      break;
    case 'ranked-choice':
      if (Object.keys(data[ident]).length === 0) {
        delete data[ident];
      }
      break;
    }
  }
  // remove unused answers
  Object.keys(data).filter(key => key !== 'progress').forEach(key => {
    if (!preferences.find(item => item.id === key)) {
      delete data[key];
    }
  });

}

function isVersion1(preferences) {
  if (
    preferences
    && preferences.length
    && Object.keys(preferences[0]).indexOf('allowLinkedQuestions') < 0
  ) {
    return true;
  }
  return false;
}

/**
 * Extract answers
 * @param {Object} config working preferences config
 * @param {Object} data raw answers contain ids
 * @param {Object} answerSources answer sources
 * @param {Object} filters lookup names
 * @returns [ { answer: String, group: String, rank: Number } ]
*/
function extractAnswers(config, data, answerSources, filters) {
        const sortedAnswers = [];
        if (config.groupAnswers) {
          config.answers.forEach(group => {
            group.answers.forEach(answer => {
              switch (config.questionType) {
              case 'single-choice':
                if (answer.id === data) {
                  sortedAnswers.push({ answer: answer.answer, group: group.group });
                }
                break;
              case 'multiple-choice':
                if (data.indexOf(answer.id) >= 0) {
                  sortedAnswers.push({ answer: answer.answer, group: group.group });
                }
                break;
              case 'ranked-choice':
                if (Object.keys(data).indexOf(answer.id) >= 0) {
                  sortedAnswers.push({ answer: answer.answer, group: group.group, rank: data[answer.id] });
                }
                break;
              }
            });
          });
        } else {
          if (config.answerSource) {
            if (!answerSources) return sortedAnswers;
            const answerSource = answerSources[config.answerSource];
            if (!answerSource) return sortedAnswers;
            switch (config.questionType) {
            case 'single-choice':
              if (data === 'other') {  // make this generic
                sortedAnswers.push({ answer: answerSource.otherJurisdiction });
              } else {
                sortedAnswers.push({ answer: filters.lookup(data) });
              }
              break;
            case 'multiple-choice':
              answerSource.forEach(answer => {
                if (data.indexOf(answer) >= 0) {
                  if (answer === 'other') {  // make this generic
                    sortedAnswers.push({ answer: answerSources.otherJurisdiction });
                  } else {
                    sortedAnswers.push({ answer: filters.lookup(answer) });
                  }
                }
              });
              break;
            case 'ranked-choice':
              answerSource.forEach(answer => {
                if (Object.keys(data).indexOf(answer) >= 0) {
                  if (answer === 'other') {  // make this generic
                    sortedAnswers.push({ answer: answerSource.otherJurisdiction, rank: data[answer] });
                  } else {
                    sortedAnswers.push({ answer: filters.lookup(answer), rank: data[answer] });
                  }
                }
              });
              break;
            }
          } else {
            config.answers.forEach(answer => {
              switch (config.questionType) {
              case 'single-choice':
                if (answer.id === data) {
                  sortedAnswers.push({ answer: answer.answer });
                }
                break;
              case 'multiple-choice':
                if (data.indexOf(answer.id) >= 0) {
                  sortedAnswers.push({ answer: answer.answer });
                }
                break;
              case 'ranked-choice':
                if (Object.keys(data).indexOf(answer.id) >= 0) {
                  sortedAnswers.push({ answer: answer.answer, rank: data[answer.id] });
                }
                break;
              }
            });
          }
        }
        return config.questionType === 'ranked-choice' ? sortedAnswers.sort((a, b) => a.rank - b.rank) : sortedAnswers;
}
