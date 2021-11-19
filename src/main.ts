import { FUNCTION_LOOKUP, DEFAULT_FUNCTIONS } from 'functions'
import { Plugin } from 'obsidian'

export default class PipeTricksPlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((element) => {
      element.querySelectorAll('a.internal-link').forEach(updateLinkText)
    })
  }
}

/**
 * Determines whether a link with text attribute should be 'pipe tricked'
 */
function shouldTrick(text: string): boolean {
  return !text || text.endsWith('|')
}

// Use cases:
// [[apple|pear]]  - no tricks
// [[apple|]]  - standard pipetrick
// [[apple|lower|]]  - lower trick plus standard pipetrick

// updateLinkText automatically generates an alias for any empty internal links,
// i.e. there's no text on the right side of the vertical bar, e.g. [[apple|]].
function updateLinkText(link: HTMLAnchorElement) {
  const alias = link.innerText
  const href = link.getAttr('href')

  // Text will be empty if the only pipe is at the end of the link i.e. [[apple|]]
  if (shouldTrick(alias)) {
    // Find pipe tricks to use
    const functionNames = alias.split('|').filter(Boolean)

    const functions = DEFAULT_FUNCTIONS
    for (const name of functionNames) {
      const func = FUNCTION_LOOKUP[name]

      if (func) {
        functions.push(func)
      }
    }

    let text = href
    for (const func of functions) {
      text = func(link, text)
    }

    link.innerText = text
  }
}
