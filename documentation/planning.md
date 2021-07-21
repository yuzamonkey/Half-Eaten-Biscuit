_Harjoitustyö FullStack2021_

## Kulttuurisome

**Kenelle tarkoitettu:** 
- Freelancer taiteentuottajille, ammattilaisille, nuorille, opiskelijoille, harrastelijoille
- Muusikot, kuvataiteilijat, taiteen tuottajat, näyttelijät, kulttuuriväki 
- Kuorot, bändit, yhtyeet

**Sovelluksen tarkoitus:**
- Yhdistää kulttuurintekijöitä suomessa
- Mahdollistaa poikkitaiteellinen tuotanto
- Löytää tarvittavat henkilöt projekteihin

**Mistä mallia:**
GitHub, Facebook, LinkedIn

**Kielet:**
Suomi, Englanti

## Ominaisuudet
- Profiili (yksityishenkilö, yhtye...)
  - muusikko, kuvataiteilija, näyttelijä,
  - instrumentti, genre...
  - portfolio
    - kuvagalleria, videoita...
  - seinä (kuin facebookissa, yleisiä postauksia ym)
  - Yhtyeen jäsenet yhdistetty profiileihin
  - Yhtyeiden jäsenet voivat kirjautua yhtyeen profiiliin

- Tapahtumat, kurssit

- Job market: Hae toteuttajaa (muusikkoa, kuvaajaa, maalaria...)

- Messaging

- Notifications

- Search (events, people, groups)

- ?? Explore ??

## Tietokantaskeema
- Users
  - email
  - username
  - name
  - fields of expertise
  - boolean admin
  - boolean suspended
- Events
- Courses
- Messages

## Tools
- React and many JS libraries
- TypeScript, JavaScript
- Eslint
- MongoDB
- GraphQL
- Jest, Cypress
- CSS
- GitHub Actions

## Execution plan/steps
- Plan features well
- Build the bigger picture first
  - Propably front and back at the same time (sandboxing)
- Use branches (CI/CD)
  - Code can be deployed from main
  - Pull requests and merge to main
- Fake backend -> frontend -> finish backend and tests

## Keep in mind
- Browser support
- Security, vulnerabilities
- Validations
- JSDoc
- Smaller screens

#### Tools/libraries to consider
- React google analytics
- Date fns for date handling
- aos