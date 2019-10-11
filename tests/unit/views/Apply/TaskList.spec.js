import TaskList from '@/views/Apply/TaskList';
import { shallowMount } from '@vue/test-utils';

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
  return shallowMount(TaskList, {
    mocks: {
      $route: mockRoute,
      $router: mockRouter,
    },
    stubs: {
      'RouterLink': true,
    },
  });
};

describe('views/TaskList', () => {
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
