#!/usr/bin/env node

import inquirer from 'inquirer'


// "🔥  chore" "📦️ chore" "🚚 chore" "🙈 chore"

const EMOJIS = {
  init: '🎉',
  feat: '✨',
  fix: '🐛',
  chore: '🔧',
  style: '💄',
  refactor: '🔨',
  docs: '📝',
  revert: '⏪️',
  perf: '🐎',
  test: '🧪',
}

const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Type of commit:',
    choices: Object.keys(EMOJIS).map((key) => `${EMOJIS[key]} ${key}`)
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

  const formattedScope = scope ? `(${scope})` : ''
  const commitMessage = `${type}${formattedScope}: ${message}`

  try {
    await $`git commit -m ${commitMessage}`
  } catch {
    echo('Commit failed. Please add changes to stage and try again.')
  }
})


