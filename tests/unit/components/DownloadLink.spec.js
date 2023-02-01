import { createTestSubject } from '../helpers';
import { storage } from '@/firebase';
import DownloadLink from '@/components/DownloadLink';

jest.mock('@/firebase', () => {
  return {
    storage: {
      ref: jest.fn()
      .mockName('ref')
      .mockReturnValue({
        getDownloadURL: jest.fn()
        .mockName('getDownloadURL'),
      }),
    },
  };
});

describe('components/DownloadLink', () => {
  let wrapper;
  const mockProps = {
    exerciseId: 'mock_id',
    title: 'mock title',
    fileName: 'mock_name',
  };

  beforeEach(() => {
    wrapper = createTestSubject(DownloadLink, {
      mocks: {
        getDownloadURL: storage.ref().getDownloadURL,
      },
      stubs: [],
      propsData: mockProps,
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('lifecycle hooks', () => {
    describe('mounted', () => {

      const mockHref = 'mock href';

      it('should call .getDownloadURL()', () => {
        expect(storage.ref().getDownloadURL).toHaveBeenCalled();
      });

      it('should set linkHref if .getDownloadURL() returned download url', async () => {
        expect.assertions(1);

        const wrapper = createTestSubject(DownloadLink, {
          mocks: {
            getDownloadURL: storage.ref().getDownloadURL.mockReturnValue(mockHref),
          },
          stubs: [],
          propsData: mockProps,
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.linkHref).toEqual(mockHref);
      });

      it('should not set linkHref if .getDownloadURL() failed', async () => {
        expect.assertions(1);

        const wrapper = createTestSubject(DownloadLink, {
          mocks: {
            getDownloadURL: storage.ref().getDownloadURL.mockReturnValue(false),
          },
          stubs: [],
          propsData: mockProps,
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

        beforeEach(async () => {
          await wrapper.setProps({
            fileName: mockFileName,
          });
        });

        it('calls storage().ref()', async () => {
          expect.assertions(1);

          await wrapper.vm.getDownloadURL();

          expect(storage.ref).toHaveBeenCalled();
        });

        it('calls fileRef.getDownloadURL()', async () => {
          expect.assertions(1);

          await wrapper.vm.getDownloadURL();

          expect(storage.ref().getDownloadURL).toHaveBeenCalled();
        });

        it('returns download url if fileRef.getDownloadURL() returned a valid response', async () => {
          expect.assertions(1);

          storage.ref().getDownloadURL.mockReturnValue(mockHref);

          const result = await wrapper.vm.getDownloadURL();

          expect(result).toBe(mockHref);
        });

        it('returns false if fileRef.getDownloadURL() returned invalid response', async () => {
          expect.assertions(1);

          storage.ref().getDownloadURL.mockReturnValue(null);

          const result = await wrapper.vm.getDownloadURL();

          expect(result).toBe(false);
        });

        it('returns false if fileRef.getDownloadURL() threw', async () => {
          expect.assertions(1);

          storage.ref().getDownloadURL.mockImplementation(() => {
            throw new Error('Error');
          });

          const result = await wrapper.vm.getDownloadURL();

          expect(result).toBe(false);
        });
      });

    });
  });
});
