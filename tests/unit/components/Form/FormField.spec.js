import { shallowMount } from '@vue/test-utils';
import FormField from '@/components/Form/FormField';

describe('components/Form/FormField', () => {
  let wrapper;
  const mockProps = {
    id: 'mockId',
    label: 'mock label',
    // bogus: 'bogus', // is this warren messing with us?
  };

  beforeEach(() => {
    wrapper = shallowMount(FormField, {
      propsData: mockProps,
    });
  });

  describe('props', () => {
    let props;
    beforeEach(() => {
      props = wrapper.vm.$options.props;
    });
    describe('id', () => {
        it('is required', () => {
            expect(props.id.required).toBeTruthy();
        });
        it('is a string', () => {
            expect(props.id.type()).toBeString();
        });
        it('defaults as an empty string', () => {
            expect(props.id.default).toBe('');
        });
    });
    describe('label', () => {
        it('is not required', () => {
            expect(props.label.required).toBeFalsy();
        });
        it('is a string', () => {
            expect(props.label.type()).toBeString();
        });
        it('defaults as an empty string', () => {
            expect(props.label.default).toBe('');
        });
    });
    describe('hint', () => {
        it('is not required', () => {
            expect(props.hint.required).toBeFalsy();
        });
        it('is a string', () => {
            expect(props.hint.type()).toBeString();
        });
        it('defaults as an empty string', () => {
            expect(props.hint.default).toBe('');
        });
    });

    describe('messages', () => {
        it('is not required', () => {
            expect(props.messages.required).toBeFalsy();
        });
        it('is an Object', () => {
            expect(props.messages.type()).toBeObject();
        });
        it('defaults as an empty Object', () => {
            expect(props.messages.default()).toEqual({});
        });
    });

    describe('required', () => {
        it('is not required', () => {
            expect(props.required.required).toBeFalsy();
        });
        it('is a Boolean', () => {
            expect(props.required.type()).toBeBoolean();
        });
        it('defaults as undefined', () => {
            expect(props.required.default).toBe(undefined);
        });
    });

    describe('minLength', () => {
        it('is required', () => {
            expect(props.minLength.required).toBeFalsy();
        });
        it('is a Number', () => {
            expect(props.minLength.type()).toBeNumber();
        });
        it('defaults as undefined', () => {
            expect(props.minLength.default).toBe(0);
        });
      });

    describe('maxLength', () => {
      it('is required', () => {
          expect(props.minLength.required).toBeFalsy();
      });
      it('is a Number', () => {
          expect(props.maxLength.type()).toBeNumber();
      });
      it('defaults as undefined', () => {
          expect(props.minLength.default).toBe(0);
      });
        });

         // @TODO fix these!!
        describe('pattern', () => {
          // it('is an Object', () => {
          //   expect(props.pattern).toBeObject());
          // });
          // it('is a contains match', () => {
          //   expect(props.pattern.match).toBeObject();
          // });
          // it('matches regex formatting', () => {
            //   expect(props.pattern.default()).toEqual({"match": /^/, "message": ""});
            // });
            // //is this good enough? ^^
    });
    
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
        expect(data.errorMessage).toBeString();
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
          expect(data.regex).toContainAllKeys(['email', 'tel']);
        });
        it('email matches pattern', () => {
          expect('test@test.com').toMatch(data.regex.email);
        });
        it('tel matches pattern', () => {
          expect('07123456789').toMatch(data.regex.tel);
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

  describe('lifecycle methods?', () => {
    it('on mount', () => {
    });
    it('before destroy', () => {
    });
  });

  describe('methods', () => {
    describe('handleValidate', () => {
      xit('sets checkErrors to true', () => {
        
      });
      xit('calls validate method', () => {
        
      });
    });

    describe('validate', () => {
      describe('when checkErrors is true', () => {
        beforeEach(() => {
          wrapper.setData({ checkErrors: true });
        });
        describe('field required errors', () => {
          beforeEach(() => {
            wrapper.setProps({ required: true });
          });
          it('when no value given', () => {
            wrapper.vm.validate();
            expect(wrapper.vm.$data.errorMessage).toBe('Please enter a value for mock label');
          });
        });
        xdescribe('email errors', () =>{
          
        });
        xdescribe('tel errors', () =>{
          
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
            expect(wrapper.vm.$data.errorMessage).toBe('mock label should have 10 or more characters');
          });
        });
        describe('maxLength errors', () =>{
          beforeEach(() => {
            wrapper.setProps({ maxLength: 10 });
          });
          it('errors if value is more than MaxLength', () => {
            wrapper.vm.validate({
              target: {
                value: '12345678911',
              },
            });
            expect(wrapper.vm.$data.errorMessage).toBe('mock label should have 10 or fewer characters');
          });
        });
        describe('pattern errors', () =>{
          
        });
      });
      describe('when checkErrors is false', () => {
        beforeEach(() => {
          wrapper.setData({ checkErrors: false });
        });
        xit('does nothing', () => {
          // wrapper.vm.validate();
          // expect(wrapper.vm.$data.errorMessage).toBe('');
        });
      });
    });

    describe('setError', () => {
      beforeEach(() => {
        wrapper.vm.setError('testError');
      });
      it('sets errorMessage', () => {
        expect(wrapper.vm.$data.errorMessage).toBe('testError');
      });

      // stuck here! this test needs fixing
      xit('emits ?? event', () => {
        const mockRoot = {
          $emit: jest.fn(),
        };
        const wrapper = shallowMount(FormField, {
          parentComponent: mockRoot,
        });
        wrapper.vm.setError('testError');
        // for (let [key, value] of Object.entries(wrapper) {
        //   console.log( 1 `${key}: ${value}`);
        // }
        expect(mockRoot.$emit()).toHaveBeenCalled(); //<< cant listen to root level how? why are we so ignorant 
      });

    });
});

  /** 
   * @TODO check responds to 'validate' event
   * @TODO check cleans up after itself (i.e. removes event listener for 'validate')
   * @TODO lots of tests for methods, in particular validate() and setError()
   */
  
});
