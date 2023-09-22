import { test, expect } from '@playwright/test';

let apiContext;
test.beforeAll(async({playwright})=>{
    apiContext= await playwright.request.newContext({
        baseURL:'https://nominatim.openstreetmap.org/'
    })
})

test.describe("Check the geolocation public api",()=>{
    test('Validate geolocation api',async () => {
        await test.step(`Validate the latitude and logitude api`, async ()=>{
                const response = await apiContext.get(`/reverse?format=jsonv2&lat=-34.44076&lon=-58.70521`)
                expect(response.ok()).toBeTruthy();
                const data = await response.json();
                expect(data.address.country).toEqual("Argentina");
        })
    })

})



test.afterAll(async()=>{
    await apiContext.dispose();
})