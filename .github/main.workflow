workflow "Test on push" {
  on = "push"
  resolves = ["Lint CSS", "Lint JavaScript", "Unit testing", "Build UI"]
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

action "Build UI" {
  uses = "actions/npm@master"
  needs = ["Unit testing"]
  args = "run build:ui"
}
