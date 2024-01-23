/*eslint func-style: ["error", "declaration"]*/

export {
  filteredPreferences
};

function filteredPreferences(preferences, data) {
  if (!preferences) return [];
  const mainQuestions = [];
  const linkedQuestions = [];
  preferences.forEach(item => {
    if (item.linkedQuestion && item.linkedAnswer) {
      if (!data.jurisdictionPreferences[item.linkedQuestion]) return;
      const linkedQuestion = preferences.find(question => question.question === item.linkedQuestion);
      if (linkedQuestion) {
        switch (linkedQuestion.questionType) {
        case 'single-choice':
          if (data.jurisdictionPreferences[item.linkedQuestion] === item.linkedAnswer) {
            linkedQuestions.push(item);
          }
          break;
        case 'multiple-choice':
          if (data.jurisdictionPreferences[item.linkedQuestion].indexOf(item.linkedAnswer) >= 0) {
            linkedQuestions.push(item);
          }
          break;
        case 'ranked-choice':
          if (Object.keys(data.jurisdictionPreferences[item.linkedQuestion]).includes(item.linkedAnswer)) {
            linkedQuestions.push(item);
          }
          break;
        }
      }
    } else {
      mainQuestions.push(item);
    }
  });
  return mainQuestions.concat(linkedQuestions);
}
