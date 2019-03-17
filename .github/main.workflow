workflow "Lint and test on push" {
  on = "push"
  resolves = ["Lint CSS", "Lint JavaScript", "Unit testing"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Lint CSS" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run lint:css"
}

action "Lint JavaScript" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run lint:js"
}

action "Unit testing" {
  uses = "actions/npm@master"
  needs = ["Lint JavaScript", "Lint CSS"]
  args = "run test:unit"
}
