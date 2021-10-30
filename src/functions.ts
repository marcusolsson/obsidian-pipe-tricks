import { FINAL_COMMA, FINAL_PAREN, PUNCTUATION } from 'consts'
import { titleCase, swapCase, upperCaseFirst, capitalCase } from 'text-case'

/**
 * Functions get passed a mutable html anchor element and the current text
 * They must return a new text that can be propagated to the next function
 */
export interface PipeFunction {
  (link: HTMLAnchorElement, text: string): string
}

export const DEFAULT_FUNCTIONS: Array<PipeFunction> = [removeParenthesisComma, blendSuffix]

export const FUNCTION_LOOKUP: Record<string, PipeFunction> = {
  lower: lower,
  _: lower,

  upperFirst: upperFirst,
  upper_first: upperFirst,
  upperfirst: upperFirst,
  '^': upperFirst,

  capital: capital,
  '^^': capital,

  upper: upper,
  '^^^': upper,

  title: title,
  '#': title,

  swap: swap,
}

// Standard pipetrick
export function removeParenthesisComma(link: HTMLAnchorElement, text: string): string {
  const hasFinalParenthesis = FINAL_PAREN.test(text)

  // Suppress final parenthesis if it exists, otherwise suppress final part
  // beginning with a comma.
  return hasFinalParenthesis ? text.replace(FINAL_PAREN, '') : text.replace(FINAL_COMMA, '')
}

// Standard pipetrick
// blendSuffix moves any non-punctuation text that immediately follows the link
// and adds it to the link text.
function blendSuffix(link: HTMLElement, text: string): string {
  const sibling = link.nextSibling

  if (sibling === null || sibling.nodeType !== Node.TEXT_NODE) {
    return text
  }

  const siblingText = sibling.nodeValue

  if (siblingText) {
    let suffix: string

    const idx = siblingText.indexOf(' ')

    if (idx === -1) {
      // No space found - line ends before a space
      suffix = siblingText
    } else if (idx === 0) {
      // First character is a space, so no suffix
      suffix = ''
    } else {
      // Some suffix followed by a space
      suffix = siblingText.slice(0, idx)
    }

    // If we found a non-punctuation suffix, move it from the sibling into the
    // link text.
    if (suffix.length > 0 && !PUNCTUATION.contains(suffix[0])) {
      text += suffix

      sibling.nodeValue = siblingText.slice(suffix.length)
    }
  }

  return text
}

// Hello World -> hello world
export function lower(link: HTMLAnchorElement, text: string): string {
  return text.toLowerCase()
}

// hello world -> HELLO WORLD
export function upper(link: HTMLAnchorElement, text: string): string {
  return text.toUpperCase()
}

// hello of world -> Hello of World
export function title(link: HTMLAnchorElement, text: string): string {
  return titleCase(text)
}

// hello world -> Hello world
export function upperFirst(link: HTMLAnchorElement, text: string): string {
  return upperCaseFirst(text)
}

// Hello World -> hELLO wORLD
export function swap(link: HTMLAnchorElement, text: string): string {
  return swapCase(text)
}

// hello of world -> Hello Of World
export function capital(link: HTMLAnchorElement, text: string): string {
  return capitalCase(text)
}
