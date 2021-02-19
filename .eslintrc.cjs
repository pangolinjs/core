module.exports = {
  root: true,
  extends: [
    '@pangolinjs'
  ],
  rules: {
    'no-console': 'off'
  },
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
