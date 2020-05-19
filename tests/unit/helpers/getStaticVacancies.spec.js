// looking at the function that this file tests there 
// is a hard coded file for the function to run from
// this could be changed so the function can take an arg
// or we could mock the data as we have tried below

//@FIXME@ *error-six*

// import '@/helpers/getStaticVacancies';

xdescribe('/helpers/getStaticVacancies', () => {
    jest.mock('@/assets/vacancies.json', ()=> {
        return [1,2,3];
    }, { virtual: true });
    
    it('?', () => {
        // console.log(getStaticVacancies());
    });

});

