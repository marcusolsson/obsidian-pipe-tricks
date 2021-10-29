import { Plugin } from "obsidian";

const FINAL_PAREN = /\s\(.*\)$/;
const FINAL_COMMA = /,.*$/;

export default class PipeTricksPlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((element) => {
      element.querySelectorAll("a.internal-link").forEach(updateLinkText);
    });
  }
}

// updateLinkText automatically generates an alias for any empty internal links,
// i.e. there's no text on the right side of the vertical bar, e.g. [[apple|]].
function updateLinkText(link: HTMLAnchorElement) {
  const text = link.innerText;
  const href = link.getAttr("href");

  // Check for missing alias.
  if (!text) {
    const hasFinalParenthesis = FINAL_PAREN.test(href);

    // Suppress final parenthesis if it exists, otherwise suppress final part
    // beginning with a comma.
    link.innerText = hasFinalParenthesis
      ? href.replace(FINAL_PAREN, "")
      : href.replace(FINAL_COMMA, "");

    blendSuffix(link);
  }
}

// blendSuffix moves any non-punctuation text that immediately follows the link
// and adds it to the link text.
function blendSuffix(link: HTMLElement) {
  const sibling = link.nextSibling;

  if (sibling === null || sibling.nodeType !== Node.TEXT_NODE) {
    return;
  }

  const siblingText = sibling.nodeValue;

  const idx = siblingText.indexOf(" ");

  const suffix = idx > 0 ? siblingText.slice(0, idx) : "";

  // If we found a non-punctuation suffix, move it from the sibling into the
  // link text.
  if (suffix.length > 0 && !punctuation.contains(suffix[0])) {
    link.innerText += suffix;

    sibling.nodeValue = siblingText.slice(suffix.length);
  }
}

const punctuation = [
  ".",
  "?",
  "!",
  ",",
  ";",
  ":",
  "-",
  "–",
  "—",
  "[",
  "]",
  "(",
  ")",
  "{",
  "}",
  "'",
  '"',
  "…",
];
