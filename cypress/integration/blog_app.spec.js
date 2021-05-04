describe('Blog App', function(){

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name : 'Conor Ladrigan',
      username : 'conor47',
      password : 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function(){
    cy.contains('Blogs')
  })

  it('login form is displayed by default', function(){
    cy.contains('username')
    cy.contains('password')
    cy.contains('cancel')
  })
})