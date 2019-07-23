import {firestore} from '@/firebase';
import sanitizeFirestore from '@/utils/sanitizeFirestore';

const module = {
  state: {
    data: {},
    id: null,
  },
  mutations: {
    setVacancy(state, data) {
      state.data = data;
    },
    setVacancyId(state, vacancyId) {
      state.id = vacancyId;
    },
  },
  actions: {
    async loadVacancy({commit, state, getters}) {
      if (!state.id) {
        throw new Error('You must set the Vacancy ID first using the setVacancyId mutation');
      }

      const snapshot = await getters.vacancyDoc.get();
      const data = sanitizeFirestore(snapshot.data());
      commit('setVacancy', data);
    },
  },
  getters: {
    vacancy: (state) => {
      return state.data;
    },
    vacancyDoc: (state) => {
      if (state.id) {
        return firestore.collection('vacancies').doc(state.id);
      }
      return null;
    },
  },
};

export default module;
