import ApplyTaskList from '@/views/Apply/ApplyTaskList';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

const mockRoute = {
  name: 'name-of-current-route',
  params: {
    id: 'abc123',
  },
};

const mockRouter = {
  replace: jest.fn(),
};

const createTestSubject = () => {
  return shallowMount(ApplyTaskList, {
    localVue,
    mocks: {
      $route: mockRoute,
      $router: mockRouter,
    },
    stubs: {
      'RouterLink': true,
    },
  });
};

describe('views/ApplyTaskList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });

    it('contains a router-link tag', () => {
      expect(wrapper.find('RouterLink-stub').exists()).toBe(true);
    });
  });

});
