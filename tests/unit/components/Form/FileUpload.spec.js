// import { createTestSubject } from '../../helpers';
// import { storage } from '@/firebase';
// import FileUpload from '@/components/Form/FileUpload.vue';
// import { vi } from 'vitest';

// vi.mock('@/firebase', () => {
//   return {
//     storage: {
//       ref: vi.fn().mockName('ref').mockReturnValue({
//         getDownloadURL: vi.fn().mockName('getDownloadURL'),
//         put: vi.fn().mockName('put'),
//       }),
//     },
//   };
// });

// describe('components/Form/FileUpload', () => {

//   describe('props', () => {
//     let prop;

//     describe('path', () => {
//       beforeEach(() => {
//         prop = FileUpload.props.path;
//       });

//     it('is required', () => {
//       expect(prop.required).toBe(true);
//       });

//       it('has type String', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });

//       it('has default value of \'\'', () => {
//         expect(prop.default).toBe('');
//       });
//     });

//     describe('value', () => {
//       beforeEach(() => {
//         prop = FileUpload.props.value;
//       });

//       it('is not required', () => {
//         expect(prop.required).toBeFalsy();
//       });

//       it('has type String', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });

//       it('has default value of \'\'', () => {
//         expect(prop.default).toBe('');
//       });

//     });

//     describe('name', () => {
//       beforeEach(() => {
//         prop = FileUpload.props.name;
//       });

//       it('is required', () => {
//         expect(prop.required).toBe(true);
//       });

//       it('has type String', () => {
//         expect(prop.type()).toBeTypeOf('string');
//       });

//       it('has default value of \'\'', () => {
//         expect(prop.default).toBe('');
//       });

//     });

//     describe('messages', () => {
//       beforeEach(() => {
//         prop = FileUpload.props.messages;
//       });

//       it('has type Object', () => {
//         expect(prop.type()).toBeTypeOf('object');
//       });

//       it('default required message is \'Please choose a file to upload\'', () => {
//         expect(prop.default().required).toBe('Please choose a file to upload');
//       });

//     });

//   });

//   describe('component instance', () => {
//     let wrapper;
//     const mockProps = {
//       id: 'my_unique_id',
//       path: 'my_path',
//       name: 'name',
//     };

//     beforeEach(() => {
//       wrapper = createTestSubject(FileUpload, {
//         mocks: {},
//         stubs: [],
//         propsData: mockProps,
//       });
//     });

//   it('renders the component', () => {
//     expect(wrapper.exists()).toBe(true);
//   });

//   describe('template', () => {
//     describe('label', () => {
//       it('sets the label to the value of the `label` prop', async () => {
//         await wrapper.setProps({ label: 'My Form Label' });
//         expect(wrapper.find('label').text()).toBe('My Form Label');
//       });
//     });

//     describe('hint', () => {
//       let hint;
//       describe('when the prop is set', () => {
//         beforeEach( async () => {
//           await wrapper.setProps({ hint: 'my_hint' });
//           hint = wrapper.find('.govuk-hint');
//         });

//         it('shows a hint', () => {
//           expect(hint.exists()).toBe(true);
//         });
//         it('sets the hint to the value of the `hint` prop', () => {
//           expect(hint.text()).toBe('my_hint');
//         });
//       });

//       describe('when the prop is not set', () => {
//         beforeEach(() => {
//           hint = wrapper.find('.govuk-hint');
//         });

//         it('does not show hint', () => {
//           expect(hint.exists()).toBe(false);
//         });
//       });
//     });

//     describe('id', () => {
//       it('sets <input> `id` attribute', async () => {
//         await wrapper.setProps({ id: 'my_unique_key' });
//         expect(wrapper.find('input').attributes().id).toBe('my_unique_key');
//       });
//     });
//   });

//   describe('properties', () => {
//     describe('path', () => {
//       it('sets `path` property', () => {
//         expect(wrapper.vm.path).toBe(mockProps.path);
//       });
//     });

//     describe('`v-model` interface', () => {
//       describe('when text changes', () => {
//         it('emits an input event with the new value', () => {
//           wrapper.setData({ fileName: 'new-value' });
//           expect(wrapper.emitted().input).toEqual([['new-value']]);
//         });
//       });

//       describe('when `value` prop changes', () => {
//         it('updates the `fileName` computed property', async () => {
//           await wrapper.setProps({ value: 'my_value' });
//           expect(wrapper.vm.fileName).toEqual('my_value');
//         });
//       });
//     });

//     describe('computed properties', () => {
//       describe('haveFile', () => {
//         it('is false if no value or empty', () => {
//           wrapper.setProps({ value: '' });
//           expect(wrapper.vm.haveFile).toBe(false);
//         });
//         it('is true if value set', async () => {
//           await wrapper.setProps({ value: 'my_value' });
//           expect(wrapper.vm.haveFile).toBe(true);
//         });

//       });
//     });

//   });

//   describe('lifecycle hooks', () => {
//     describe('mounted', () => {
//       const mockLocalProps = {
//         value: '',
//         id: 'mock_id',
//         path: 'mock_path',
//         name: 'mock_name',
//       };
//       const mockVerifyFile = vi.fn()
//       .mockName('verifyFile');

//       it('should not call .verifyFile() if fileName doesn\'t exist', () => {
//           createTestSubject(FileUpload, {
//             propsData: mockLocalProps,
//             mocks: {
//               verifyFile: mockVerifyFile,
//           },
//           stubs: [],
//         });

//         expect(mockVerifyFile).not.toHaveBeenCalled();
//       });

//       it('should call .verifyFile() if fileName exists', () => {
//           createTestSubject(FileUpload, {
//             propsData: {
//               ...mockLocalProps,
//               value: 'mock_value',
//             },
//             methods: {
//               verifyFile: mockVerifyFile,
//             },
//             mocks: {},
//             stubs: [],
//           });

//           expect(mockVerifyFile).toHaveBeenCalled();
//       });

//       it('should reset fileName if .verifyFile failed', async () => {
//         const wrapper = createTestSubject(FileUpload, {
//           stubs: [],
//           propsData: {
//             ...mockLocalProps,
//             value: 'mock_value',
//           },
//           mocks: {
//             verifyFile: mockVerifyFile
//             .mockReturnValue(false),
//           },
//         });

//         await wrapper.vm.$nextTick();
//         expect(wrapper.emitted().input).toEqual([['']]);
//       });
//     });
//   });

//   describe('methods', () => {
//     const mockFileExtension = 'doc';
//     const mockFile = {
//       name: `mock file.${  mockFileExtension}`,
//     };
//     const errorMessage = 'File upload failed, please try again';

//     describe('replaceFile()', () => {
//       it('sets `isReplacing` property', () => {
//         wrapper.vm.replaceFile();
//         expect(wrapper.vm.isReplacing).toBe(true);
//       });
//     });

//     describe('fileSelected()', () => {
//     it('resets errors', () => {
//       wrapper.vm.setError = vi.fn();

//         wrapper.vm.fileSelected();
//         expect(wrapper.vm.setError).toHaveBeenCalledWith('');
//       });
//       it('calls .upload()', () => {
//         wrapper.vm.upload = vi.fn();

//         wrapper.vm.fileSelected();
//         expect(wrapper.vm.upload).toHaveBeenCalled();
//       });
//     });

//     describe('generateFileName()', () => {
//       it('returns set name with original extension', async () => {
//         const setName = 'filename';
//         await wrapper.setProps({ name: setName });

//         const newName = wrapper.vm.generateFileName('original name.doc');
//         const parts = newName.split('.');
//         expect(parts.length).toEqual(2);
//         expect(parts[0]).toBe(setName);
//         expect(parts[1]).toBe('doc');
//       });

//       it('returns set name with no extension if original file didn\'t have one', async () => {
//         const setName = 'filename';
//         await wrapper.setProps({ name: setName });

//         const newName = wrapper.vm.generateFileName('original name');
//         expect(newName).toEqual(setName);
//       });

//       it('returns set name with original extension even if original name contains .', async () => {
//         const setName = 'filename';
//         await wrapper.setProps({ name: setName });

//         const newName = wrapper.vm.generateFileName('original name.final.version.doc');
//         const parts = newName.split('.');
//         expect(parts.length).toEqual(2);
//         expect(parts[0]).toBe(setName);
//         expect(parts[1]).toBe('doc');
//       });
//     });

//     describe('resetFile()', () => {
//       it('clears reference to file', () => {
//         wrapper.vm.resetFile();

//         expect(wrapper.vm.$refs.file).toBeNull();
//       });

//       it('resets `isUploading` property', () => {
//         wrapper.vm.resetFile();
//         expect(wrapper.vm.isUploading).toBeFalse();
//       });
//     });

//     describe('upload()', () => {
//       beforeEach(() => {
//           wrapper.vm.setError = vi.fn();
//           storage.ref().put.mockReset();
//         });

//           it('sets error and returns false if called without file', async () => {
//             expect.assertions(2);

//           const result = await wrapper.vm.upload(mockFile);
//           expect(wrapper.vm.setError).toHaveBeenCalledWith(errorMessage);
//           expect(result).toBeFalsy();
//         });

//         describe('with file', () => {
//           it('sets `isUploading` property', async () => {
//             wrapper.vm.resetFile = vi.fn();
//             expect.assertions(1);
//             await wrapper.vm.upload(mockFile);

//             expect(wrapper.vm.isUploading).toBeTruthy();
//           });

//           it('calls storage().ref()', async () => {
//             expect.assertions(1);

//             await wrapper.vm.upload(mockFile);

//             expect(storage.ref).toHaveBeenCalled();
//           });

//           it('calls uploadRef.put() with file', async() => {
//             expect.assertions(1);

//             await wrapper.vm.upload(mockFile);

//             expect(storage.ref().put).toHaveBeenCalledWith(mockFile);
//           });

//           describe('put() failed', () => {
//             it('sets error and returns false if received response but not successful', async () => {
//               expect.assertions(2);

//               wrapper.vm.setError = vi.fn();
//               storage.ref().put.mockReturnValue(false);

//               const result = await wrapper.vm.upload(mockFile);

//               expect(result).toBe(false);
//               expect(wrapper.vm.setError).toHaveBeenCalledWith(errorMessage);
//             });

//             it('sets error and returns false if error thrown', async () => {
//               expect.assertions(2);

//               wrapper.vm.setError = vi.fn();
//               storage.ref().put.mockImplementation(() => {
//                 throw new Error('Error');
//               });

//               const result = await wrapper.vm.upload(mockFile);

//           expect(result).toBe(false);
//           expect(wrapper.vm.setError).toHaveBeenCalledWith(errorMessage);
//         });
//       });

//           describe('put() returned a valid response', () => {
//             beforeEach(() => {
//               storage.ref().put.mockReturnValue({
//                 state: 'success',
//               });
//             });

//             it('resets `isReplacing`', async () => {
//               expect.assertions(1);

//               await wrapper.vm.upload(mockFile);

//               expect(wrapper.vm.isReplacing).toBe(false);
//             });

//             it('sets `fileName` to one generated by generateFileName()', async () => {
//               const mockName = 'mock file name';
//               const mockGenerateFileName = vi.fn().mockReturnValue(mockName);

//               wrapper.setMethods({
//                 generateFileName: mockGenerateFileName,
//               });
//               expect.assertions(2);

//               await wrapper.vm.upload(mockFile);

//               expect(mockGenerateFileName).toHaveBeenCalled();
//               expect(wrapper.emitted().input).toEqual([[mockName]]);
//             });

//             it('doesn\'t set an error and returns true', async () => {
//           expect.assertions(2);
//           wrapper.vm.setError = vi.fn();

//           const result = await wrapper.vm.upload(mockFile);

//           expect(wrapper.vm.setError).not.toHaveBeenCalled();
//           expect(result).toBe(true);
//         });
//       });
//     });
//           });

//           describe('verifyFile()', () => {
//             it('returns false if called without file', async () => {
//               expect.assertions(1);

//               const result = await wrapper.vm.verifyFile(mockFile.name);

//               expect(result).toBe(false);
//             });

//             it('calls storage().ref()', async () => {
//               expect.assertions(1);

//               await wrapper.vm.verifyFile(mockFile.name);

//               expect(storage.ref).toHaveBeenCalled();
//             });

//             it('calls fileRef.getDownloadURL()', async () => {
//               expect.assertions(1);

//               await wrapper.vm.verifyFile(mockFile.name);

//               expect(storage.ref().getDownloadURL).toHaveBeenCalled();
//             });

//             it('returns true if fileRef.getDownloadURL() returned a valid response', async () => {
//               expect.assertions(1);

//               storage.ref().getDownloadURL.mockReturnValue('link_to_file');

//               const result = await wrapper.vm.verifyFile(mockFile.name);

//               expect(result).toBe(true);
//             });

//             it('returns false if fileRef.getDownloadURL() returned invalid response', async () => {
//               expect.assertions(1);

//               storage.ref().getDownloadURL.mockReturnValue(null);

//               const result = await wrapper.vm.verifyFile(mockFile.name);

//               expect(result).toBe(false);
//             });

//       it('returns false if fileRef.getDownloadURL() threw', async () => {
//         expect.assertions(1);

//         storage.ref().getDownloadURL.mockImplementation(() => {
//                 throw new Error('Error');
//               });

//               const result = await wrapper.vm.verifyFile(mockFile.name);
//               expect(result).toBe(false);
//             });
//           });
//         });
//       });
//   });

it('empty suite', () => {

});
