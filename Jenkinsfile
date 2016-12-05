node {
  stage 'Test'
  checkout scm
  sh 'docker build -t citypantry/onfleet.js .'
  sh 'docker run --rm citypantry/onfleet.js'
}
