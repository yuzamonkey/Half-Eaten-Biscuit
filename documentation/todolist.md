# Todolist/bugs

## Do ⏺
- REMEMBER TO UPDATE ROUTES!
- Read from sessionStorage
  - Validation with userId and sessionId
  - Messages
  - Profile editing
  - REMEMBER! Closing tab removes session token. Check EVERYTIME that session token is there

## Fix ❌
- Handling too large images
- Testing in deployment pipeline on GitHub
- 'Cache data may be lost when replacing the me field of a Query object' -warning
- Remove hover-effects in mobile view
- Cache problems in messaging after page refresh
- (fixed?) Refreshing profiles-page and messages gives error. Might be express issue

## Fixed ✅
- Figure out a way for routes to be active when refreshing on published site. Now refresh makes navlinks not active and clicking them messes up the relative url path
  - **Solution:** Go with '/' for relative paths to domain instead of './'
- Sideways scroll on jobmarket options on mobile


Artist -> Career -> Skills

          Visual arts
            Photography
            Painting
            Drawing
            Sculpturing

          Performing arts
            Dancer
              Ballet
              Modern
            Actor
              Movie
              Theatre
          
          Music
            Musician
              String
              Woodwinds
              Brass
              Percussion
              Voice
              Keyboard
              Pluck
              Electric
            Composer