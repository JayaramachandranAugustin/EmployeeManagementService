import { test, expect } from '@playwright/test';

let employee_list =new Array();

test.describe("Persist employee detail",()=>{
    test('Check the employee save API',async ({request}) => {
        await test.step("Save the employee details", async ()=>{
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
              employee_list.push(data);
        })

        await test.step("Check if the employee is persisted correctly", async ()=>{
            for(let index=0;index<employee_list.length;index++){
                const response = await request.get(`/employee/${employee_list[index].id}`)
                expect(response.ok()).toBeTruthy();
                const data = await response.json();
                expect(data.id).toEqual(employee_list[index].id);
            }
        })
    })

})

test.afterAll(async({request})=>{
    for(let index=0;index<employee_list.length;index++){
        const response = await request.delete(`/employee/${employee_list[index].id}`);
    }
})