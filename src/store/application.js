import {firestore} from "@/firebase";
import clone from "clone";
import sanitizeFirestore from "@/utils/sanitizeFirestore";

const module = {
  state: {
    data: {},
    id: null,
  },
  mutations: {
    setApplication(state, {id, data}) {
      state.id = id;
      state.data = data;
    },
  },
  actions: {
    async loadApplication({commit, getters}) {
      if (!getters.applicantDoc || !getters.vacancyDoc) {
        throw new Error('Applicant and Vacancy docs must exist to load an Application');
      }

      const collection = firestore.collection('applications');

      const results = await collection
        .where('applicant', '==', getters.applicantDoc)
        .where('vacancy', '==', getters.vacancyDoc)
        .get();

      if (results.empty) {
        commit('setApplication', {id: null, data: { state: 'draft', createdAt: new Date, updatedAt: new Date}});
      } else {
        const doc = results.docs[0];

        let data = doc.data();
        delete data.applicant;
        delete data.vacancy;
        data = sanitizeFirestore(data);
        data.updatedAt = new Date;

        commit('setApplication', {id: doc.id, data});
      }
    },
    async saveApplication({commit, getters}, data) {
      if (!getters.applicantDoc || !getters.vacancyDoc) {
        throw new Error('Applicant and Vacancy docs must exist to save an Application');
      }
      const saveData = clone(data);
      saveData.applicant = getters.applicantDoc;
      saveData.vacancy = getters.vacancyDoc;
      await getters.applicationDoc.set(saveData);
      commit('setApplication', {id: getters.applicationDoc.id, data: clone(data)});
    },
  },
  getters: {
    application: (state) => () => {
      return clone(state.data);
    },
    applicationDoc: (state) => {
      const collection = firestore.collection('applications');
      if (state.id) {
        return collection.doc(state.id);
      }
      return collection.doc();
    },
  },
};

export default module;
