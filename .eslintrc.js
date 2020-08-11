module.exports = {
  root: true,
  extends: [
    '@pangolinjs'
  ],
  overrides: [
    {
      files: [
        'test/unit/**/*.spec.?(m)js'
      ],
      extends: [
        'plugin:ava/recommended'
      ]
    }
  ]
}
