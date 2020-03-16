import { shallowMount, createLocalVue } from '@vue/test-utils';

const mockGetDownloadURL = jest.fn()
  .mockName('getDownloadURL');
const mockRef = jest.fn()
  .mockName('ref')
  .mockReturnValue({
    getDownloadURL: mockGetDownloadURL,
  });

jest.mock('@firebase/app', () => ({
    __esModule: true,
    default: {
      apps: [],
      initializeApp: () => {},
      auth: jest.fn(),
      storage: jest.fn()
        .mockImplementation(() => ({
          ref: mockRef,
        })),
    },
  })
);

jest.mock('@firebase/storage', () => ({
  __esModule: true,
  default: {
    registerService: jest.fn(), // required by firebase/app
  },
}));

import '@firebase/app';
import '@firebase/storage';

import DownloadLink from '@/components/DownloadLink';

describe('components/DownloadLink', () => {
  let wrapper;
  const mockProps = {
    exerciseId: 'mock_id',
    title: 'mock title',
    fileName: 'mock_name',
  };

  beforeEach(() => {
    wrapper = shallowMount(DownloadLink, {
      propsData: mockProps,
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('lifecycle hooks', () => {
    describe('mounted', () => {

      const localVue = createLocalVue();
      const mockGetDownloadURL = jest.fn()
        .mockName('getDownloadURL');

      const mockHref = 'mock href';

      it('should call .getDownloadURL()', () => {
        shallowMount(DownloadLink, {
          localVue,
          propsData: mockProps,
          methods: {
            getDownloadURL: mockGetDownloadURL,
          },
        });

        expect(mockGetDownloadURL).toHaveBeenCalled();
      });

      it('should set linkHref if .getDownloadURL() returned download url', async () => {
        expect.assertions(1);

        const wrapper = shallowMount(DownloadLink, {
          localVue,
          propsData: mockProps,
          methods: {
            getDownloadURL: mockGetDownloadURL
              .mockReturnValue(mockHref),
          },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.linkHref).toEqual(mockHref);
      });

      it('should not set linkHref if .getDownloadURL() failed', async () => {
        expect.assertions(1);

        const wrapper = shallowMount(DownloadLink, {
          localVue,
          propsData: mockProps,
          methods: {
            getDownloadURL: mockGetDownloadURL
              .mockReturnValue(false),
          },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.linkHref).toBeEmpty();
      });
    });
  });

  describe('methods', () => {

    describe('getDownloadURL()', () => {
      it('returns false if filename not set', async () => {
        expect.assertions(1);

        const result = await wrapper.vm.getDownloadURL();

        expect(result).toBe(false);
      });

      describe('with filename', () => {
        const mockFileName = 'mock file name';
        const mockHref = 'mock href';

        beforeEach(() => {
          wrapper.setProps({
            fileName: mockFileName,
          });
        });

        it('calls storage().ref()', async () => {
          expect.assertions(1);

          await wrapper.vm.getDownloadURL();

          expect(mockRef).toHaveBeenCalled();
        });

        it('calls fileRef.getDownloadURL()', async () => {
          expect.assertions(1);

          await wrapper.vm.getDownloadURL();

          expect(mockGetDownloadURL).toHaveBeenCalled();
        });

        it('returns download url if fileRef.getDownloadURL() returned a valid response', async () => {
          expect.assertions(1);

          mockGetDownloadURL.mockReturnValue(mockHref);

          const result = await wrapper.vm.getDownloadURL();

          expect(result).toBe(mockHref);
        });

        it('returns false if fileRef.getDownloadURL() returned invalid response', async () => {
          expect.assertions(1);

          mockGetDownloadURL.mockReturnValue(null);

          const result = await wrapper.vm.getDownloadURL();

          expect(result).toBe(false);
        });

        it('returns false if fileRef.getDownloadURL() threw', async () => {
          expect.assertions(1);

          mockGetDownloadURL.mockImplementation(() => {
            throw new Error('Error');
          });

          const result = await wrapper.vm.getDownloadURL();

          expect(result).toBe(false);
        });
      });

    });
  });
});
