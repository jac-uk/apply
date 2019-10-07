import TaskList from '@/views/TaskList';
import { shallowMount } from '@vue/test-utils';

describe('views/TaskList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TaskList);
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });

    it('contains a link', () => {
      expect(wrapper.contains('.govuk-link')).toBe(true);
    });
  });

});
