  import { createTestSubject } from '../../helpers';
  import FormField from '@/components/Form/FormField.vue';
  import { vi } from 'vitest';

  const $root = {
    $emitter: vi.fn(),
  };

  const mockProps = {
    id: 'mockId',
    label: 'mock label',
    required: true,
    requiredMessage: 'messages required',
  };

  describe('components/Form/FormField', () => {

    describe('props', () => {
      let prop;

      describe('id', () => {
        beforeEach(() => {
          prop = FormField.props.id;
        });
        it('is required', () => {
          expect(prop.required).toBeTruthy();
        });
        it('is a string', () => {
          expect(prop.type()).toBeTypeOf('string');
        });
        it('defaults as an empty string', () => {
          expect(prop.default).toBe('');
        });
      });

      describe('type', () => {
        beforeEach(() => {
          prop = FormField.props.type;
        });
        it('is not required', () => {
          expect(prop.required).toBeFalsy();
        });
        it('is a string', () => {
          expect(prop.type()).toBeTypeOf('string');
        });
        it('defaults as an empty string', () => {
          expect(prop.default).toBe('');
        });
      });

      describe('label', () => {
        beforeEach(() => {
          prop = FormField.props.label;
        });
        it('is not required', () => {
          expect(prop.required).toBeFalsy();
        });
        it('is a string', () => {
          expect(prop.type()).toBeTypeOf('string');
        });
        it('defaults as an empty string', () => {
          expect(prop.default).toBe('');
        });
      });

      describe('hint', () => {
        beforeEach(() => {
          prop = FormField.props.hint;
        });
        it('is not required', () => {
          expect(prop.required).toBeFalsy();
        });
        it('is a string', () => {
          expect(prop.type()).toBeTypeOf('string');
        });
        it('defaults as an empty string', () => {
          expect(prop.default).toBe('');
        });
      });

      describe('messages', () => {
        beforeEach(() => {
          prop = FormField.props.messages;
        });
        it('is not required', () => {
          expect(prop.required).toBeFalsy();
        });
        it('is an Object', () => {
          expect(prop.type()).toBeTypeOf('object');
          });
          it('defaults as an empty Object', () => {
              expect(prop.default()).toEqual({});
          });
      });

      describe('required', () => {
        beforeEach(() => {
          prop = FormField.props.required;
        });
          it('is not required', () => {
              expect(prop.required).toBeFalsy();
          });
          it('is a Boolean', () => {
            expect(prop.type).toBe(Boolean);
          });
          it('defaults as undefined', () => {
              expect(prop.default).toBe(undefined);
          });
      });

      describe('minLength', () => {
        beforeEach(() => {
          prop = FormField.props.minLength;
        });
          it('is required', () => {
              expect(prop.required).toBeFalsy();
          });
          it('is a Number', () => {
              expect(prop.type).toBe(Number);
          });
          it('defaults as undefined', () => {
              expect(prop.default).toBe(0);
          });
        });

      describe('maxLength', () => {
        beforeEach(() => {
          prop = FormField.props.maxLength;
        });
        it('is required', () => {
          expect(prop.required).toBeFalsy();
        });
        it('is a Number', () => {
          expect(prop.type).toBe(Number);
        });
        it('defaults as undefined', () => {
            expect(prop.default).toBe(0);
          });
      });

      describe('pattern', () => {
        beforeEach(() => {
          prop = FormField.props.pattern;
        });
        it('is an Object', () => {
          expect(prop).toBeTypeOf('object');
        });
        it('matches regex formatting', () => {
          expect(prop.default()).toEqual({ 'match': /^/, 'message': '' });
        });
      });

    });

    describe.skip('component instance', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = createTestSubject(FormField, {
          mocks: {},
          stubs: [],
          propsData: mockProps,
        });
        wrapper.vm.$root = $root;
      });

      it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
      });

      describe('data', () => {
        let data;

        beforeEach(() => {
          data = wrapper.vm.$data;
        });

        it('has errorMessage', () => {
          expect(data).toContainKeys(['errorMessage']);
        });

        it('has checksErrors', () => {
          expect(data).toContainKeys(['checkErrors']);
        });

        it('has regex', () => {
          expect(data).toContainKeys(['checkErrors']);
        });

        describe('errorMessage', () => {
          it('is a String', () => {
            expect(data.errorMessage).toBeTypeOf('string');
          });
          it('empty by default', () => {
            expect(data.errorMessage).toBeFalsy();
          });
        });

        describe('checksErrors', () => {
            it('is a Boolean', () => {
              expect(data.checkErrors).toBeBoolean();
            });
            it('false by default', () => {
              expect(data.checkErrors).toBe(false);
            });
        });

        describe('regex', () => {
            it('has email and telephone patterns', () => {
              expect(data.regex).toContainKeys(['email', 'tel']);
            });
            it('email matches pattern', () => {
              expect('test@test.com').toMatch(data.regex.email);
              expect("test'test@test.com").toMatch(data.regex.email);

              // test cases from https://en.wikipedia.org/wiki/Email_address
              const validEmails = [
                'simple@example.com',
                'very.common@example.com',
                'disposable.style.email.with+symbol@example.com',
                'other.email-with-hyphen@example.com',
                'fully-qualified-domain@example.com',
                'user.name+tag+sorting@example.com',
                'x@example.com',
                'example-indeed@strange-example.com',
                'test/test@test.com',
                // 'admin@mailserver1',
                'example@s.example',
                '" "@example.org',
                '"john..doe"@example.org',
                'mailhost!username@example.org',
                // eslint-disable-next-line no-useless-escape
                '"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com',
                'user%example.com@example.org',
                'user-@example.org',
                'postmaster@[123.123.123.123]',
                // 'postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
              ];
              const invalidEmails = [
                'Abc.example.com',
                'A@b@c@example.com',
                // eslint-disable-next-line no-useless-escape
                'a"b(c)d,e:f;g<h>i[j\k]l@example.com',
                'just"not"right@example.com',
                // eslint-disable-next-line no-useless-escape
                'this is"not\allowed@example.com',
                // eslint-disable-next-line no-useless-escape
                'this\ still\"not\\allowed@example.com',
                // '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
                'i_like_underscore@but_its_not_allowed_in_this_part.example.com',
                'QA[icon]CHOCOLATE[icon]@test.com',
              ];
              validEmails.forEach(email => {
                expect(email).toMatch(data.regex.email);
              });
              invalidEmails.forEach(email => {
                expect(email).not.toMatch(data.regex.email);
              });
            });
            it('tel matches pattern', () => {
              // UK landline numbers
              const landlineNumbers = [
                '(020)00000000', '02000000000', '020 0000 0000',
                '(0131)0000000', '01310000000', '013 1000 0000',
                '(01865)000000', '01865000000', '018 6500 0000',
              ];
              // UK phone numbers
              const mobileNumbers = [
                '07123456789', '7123456789',
              ];
              // E.164 format with or without plus
              const e164Numbers = [
                '447123456789', '+447123456789', '+44 7123456789',
              ];
              [...mobileNumbers, ...landlineNumbers, ...e164Numbers].forEach(number =>  {
                expect(number).toMatch(data.regex.tel);
              });

              // invalid format
              expect('020 000 00000').not.toMatch(data.regex.tel);
              expect('abc02000000000').not.toMatch(data.regex.tel);
              expect('02000abc000000').not.toMatch(data.regex.tel);
              expect('02000000000abc').not.toMatch(data.regex.tel);
            });
            it('has postcode pattern', () => {
              expect(data.regex).toContainKeys(['postcode']);
            });
            it('postcode matches pattern', () => {
              expect('181RJ').not.toMatch(data.regex.postcode);
              expect('MK181RJ').toMatch(data.regex.postcode);
              expect('MK18 1RJ').toMatch(data.regex.postcode);
            });
            it('has nino pattern', () => {
              expect(data.regex).toContainKeys(['nino']);
            });
            it('nino matches pattern', () => {
              expect('AB123456E').not.toMatch(data.regex.nino);
              expect('AB123456D').toMatch(data.regex.nino);
              expect('AB 12 34 56 D').toMatch(data.regex.nino);
            });
        });
      });

      describe('computed', () => {
        describe('hasError', () => {
          it('returns true when there\'s an error', () => {
            wrapper.setData({ errorMessage: 'there is an error' });
            expect(wrapper.vm.hasError).toBeTrue();
          });
          it('returns false when there\'s no error', () => {
            wrapper.setData({ errorMessage: null });
            expect(wrapper.vm.hasError).toBeFalse();
          });
        });
      });

      describe('methods', () => {

        describe('setError', () => {
          beforeEach(() => {
            wrapper.vm.setError('testError');
          });
          it('sets errorMessage', () => {
            expect(wrapper.vm.$data.errorMessage).toBe('testError');
          });

          it('emits $root event', () => {
            wrapper.vm.setError('testError');
            expect($root.$emit).toHaveBeenCalled();
          });
        });

        describe('handleValidate', () => {
          it('sets checkErrors to true', () => {
            wrapper.vm.validate = vi.fn();
            expect(wrapper.vm.checkErrors).toBe(false);
            wrapper.vm.handleValidate();
            expect(wrapper.vm.checkErrors).toBe(true);
            expect(wrapper.vm.validate).toHaveBeenCalled();
            wrapper.vm.validate.mockRestore();
          });
        });

        describe('validate', () => {
          describe('when checkErrors is true', () => {
            beforeEach( async () => {
              await wrapper.setData({ checkErrors: true });
            });

            describe('field required errors', () => {
              beforeEach(async () => {
                await wrapper.setProps({ required: true });
              });
              describe('when given required messages, but no value', () => {
                it('returns message required value', async () => {
                  await wrapper.setProps({ messages: { required: mockProps.requiredMessage } });
                  wrapper.vm.validate();
                  expect(wrapper.vm.$data.errorMessage).toBe(mockProps.requiredMessage);
                });
              });

              describe('when given no value', () => {
                it('asks for value for empty field', () => {
                  wrapper.vm.validate();
                  expect(wrapper.vm.$data.errorMessage).toBe(`Please enter a value for ${mockProps.label}`);
                });
              });
            });

            describe('email errors', () =>{
              beforeEach(()=>{
                wrapper.setProps({
                  type: 'email',
                });
              });
              it('when given invalid email', () => {
                wrapper.vm.validate({
                  target: {
                    value: 'invalidmailatwebaddress.com',
                  },
                });
                expect(wrapper.vm.$data.errorMessage).toBe(`Enter a valid email address for ${mockProps.label}`);
              });
            });

            describe('tel errors', () =>{
              beforeEach(()=>{
                wrapper.setProps({
                  type: 'tel',
                });
              });
              it('when given invalid tel', () => {
                wrapper.vm.validate({
                  target: {
                    value: 'onetwothree',
                  },
                });
                expect(wrapper.vm.$data.errorMessage).toBe(`Enter a valid phone number for ${mockProps.label}`);
              });
            });

            describe('minLength errors', () => {
              beforeEach(() => {
                wrapper.setProps({ minLength: 10 });
              });
              it('errors if value is less than minLength', () => {
                wrapper.vm.validate({
                  target: {
                    value: '123456789',
                  },
                  });
                expect(wrapper.vm.$data.errorMessage).toBe(`${mockProps.label} should have 10 or more characters`);
              });
            });

            describe('maxLength errors', () =>{
              beforeEach(() => {
                wrapper.setProps({ maxLength: 10 });
              });
              it('errors if value is more than MaxLength', () => {
                const errormessage = `${mockProps.label} should have 10 or fewer characters`;
                wrapper.vm.validate({
                  target: {
                    value: errormessage,
                  },
                });
                expect(wrapper.vm.$data.errorMessage).toBe(errormessage);
              });
            });

            // describe('pattern errors', () =>{

            // });

            });
          });

          describe('when checkErrors is false', () => {
            beforeEach(() => {
              wrapper.setData({ checkErrors: false });
            });
            it('clears setError', () => {
              wrapper.setData({ errorMessage: 'remove this' });
              wrapper.vm.validate();
              expect(wrapper.vm.$data.errorMessage).toBe('');
            });
          });
    });

      /*
      * @TODO check responds to 'validate' event
      * @TODO check cleans up after itself (i.e. removes event listener for 'validate')
      */

    });

  });
