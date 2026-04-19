describe("login page test",()=>{
    it("input test",()=>{
        cy.visit("http://localhost:5173/")
         cy.get("input[type=email]").type("a@gmail.com")
         cy.get("input[type=password]").type("test123")
          cy.get("button").click() 
    })
    // it("login sv  uccess test",()=>{
 
    // })
    // it("show error message",()=>{})
})