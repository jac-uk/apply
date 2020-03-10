import PersonalDetails from '@/views/Apply/AccountProfile/PersonalDetails';
import { shallowMount } from '@vue/test-utils';
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';

const candidate = {};

const mockStore = {
  dispatch: jest.fn(),
  state: {
    candidate: {
      record: {},
    },
    application: {
      record: {},
    },
  },
  getters: {
    'candidate/data': () => candidate,
    'application/data': () => {},
  },
};

const mockRouter = {
  push: jest.fn(),
};

const createTestSubject = () => {
  return shallowMount(PersonalDetails, {
    mocks: {
      $store: mockStore,
      $router: mockRouter,
    },
  });
};

xdescribe('@/views/Apply/AccountProfile/PersonalDetails', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
  });

  xdescribe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });

    it('contains a <form>', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('the <form> contains a "Save and continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Save and continue');
    });

    it('renders the TextField components', () => {
      expect(wrapper.find(TextField).exists()).toBe(true);
    });

    it('renders the DateInput components', () => {
      expect(wrapper.find(DateInput).exists()).toBe(true);
    });
  });
});
