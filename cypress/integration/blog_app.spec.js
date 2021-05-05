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

  it('user can login with correct credentials', function(){
    cy.get('#username').type('conor47')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('conor47 was succesfully logged in')
  })

  it('user cannot login with incorrect credentials', function(){
    cy.get('#username').type('conorr47')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('incorrect username or password')
  })

  describe('when logged in', function() {
    beforeEach(function(){
      cy.login({ username:'conor47', password:'password' })
    })
    it('a new blog can be created', function(){
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#newBlog-button').click()
      cy.contains('a new blog test title has been added')
    })

    describe('and a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({ title:'test title', author:'test author', url:'test url' })
      })

      it('a blog can be liked', function(){
        cy.get('#viewButton').click()
        cy.get('#likeButton').click()
        cy.reload()
        cy.get('#viewButton').click()
        cy.contains('Likes : 1')
      })

      it('a blog can be deleted', function(){
        cy.get('#viewButton').click()
        cy.get('#deleteButton').click()
        cy.get('html').should('not.contain', 'test title test author')

      })
    })
  })
})