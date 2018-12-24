workflow "Lint and test on push" {
  on = "push"
  resolves = ["Lint CSS", "Unit testing", "Lint JavaScript"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Lint JavaScript" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run lint:js"
}

action "Lint CSS" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run lint:css"
}

action "Unit testing" {
  uses = "actions/npm@master"
  needs = ["Lint JavaScript", "Lint CSS"]
  args = "run test:unit"
}
