#!/usr/bin/env node

import inquirer from 'inquirer'

// Ref: https://github.com/ikatyang/emoji-cheat-sheet
const EMOJIS = [
  { key: 'check', icon: '📝', icon_value: ':memo:' },
  { key: 'init', icon: '🎉', icon_value: ':tada:' },
  { key: 'feat', icon: '✨', icon_value: ':sparkles:' },
  { key: 'fix', icon: '🐛', icon_value: ':bug:' },
  { key: 'chore', icon: '🔧', icon_value: ':wrench:' },
  { key: 'style', icon: '💄', icon_value: ':lipstick:' },
  { key: 'refactor', icon: '🔨', icon_value: ':hammer:' },
  { key: 'docs', icon: '📝', icon_value: ':memo:' },
  { key: 'revert', icon: '⏪️', icon_value: ':rewind:' },
  { key: 'perf', icon: '🐎', icon_value: ':racehorse:' },
  { key: 'test', icon: '🧪', icon_value: ':test_tube:' }
]


const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Type of commit:',
    choices: EMOJIS.map(emoji => `${emoji.key} ${emoji.icon}`)
  },
  {
    tyoe: 'input',
    name: 'scope',
    message: 'Scope of commit:'
  },
  {
    type: 'input',
    name: 'message',
    message: 'Commit message:',
    validate: (value) => !!value.trim() || 'Message is required'
  },
]


inquirer.prompt(questions).then(async (answers) => {
  const { type, message, scope } = answers

  // 'docs 📝'
  const [key, icon] = type.split(' ')
  const emoji = EMOJIS.find(e => e.key === key)

  const gitType = `${emoji.icon_value} ${key}`

  const formattedScope = scope ? `(${scope})` : ''
  const commitMessage = `${gitType}${formattedScope}: ${message}`

  try {
    echo(commitMessage)
    await $`git commit -m ${commitMessage}`
  } catch(e) {
    echo(e)
    echo('Commit failed. Please add changes to stage and try again.')
  }
})


