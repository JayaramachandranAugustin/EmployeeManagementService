import { test, expect } from '@playwright/test';

let employee_id;
test.beforeAll(async({request})=>{
        const response = await request.post('/employee', {
            data: {
              "name": "Jayaramachandran",
              "date_of_joining": "2020-08-30",
              "email": "jayaramachandran@whizpath.com",
              "gender": "male",
              "bio": "father, software developer",
              "designation": "Software Engineer"
            }
          });
          expect(response.ok()).toBeTruthy();
          const data = await response.json();
          employee_id=data.id;
})

test.describe("Retrieve employee detail",()=>{
    test('Check the employee retrieve API',async ({request}) => {
        await test.step(`Retrieve persisted employee id ${employee_id}`, async ()=>{
                const response = await request.get(`/employee/${employee_id}`)
                expect(response.ok()).toBeTruthy();
                const data = await response.json();
                expect(data.id).toEqual(employee_id);
        })
    })

})



test.afterAll(async({request})=>{
    const response = await request.delete(`/employee/${employee_id}`);
})