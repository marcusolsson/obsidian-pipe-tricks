import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((element) => {
      getInternalLinks(element).forEach(updateLinkText);
    });
  }
}

// getInternalLinks returns all links generated from the [[double bracket syntax]].
function getInternalLinks(element: HTMLElement) {
  const links = element.querySelectorAll("a");

  const internalLinks = [];
  for (let index = 0; index < links.length; index++) {
    const link = links.item(index);

    if (link.hasClass("internal-link")) {
      internalLinks.push(link);
    }
  }

  return internalLinks;
}

// updateLinkText automatically generates an alias for any empty internal links,
// i.e. there's no text on the right side of the vertical bar, e.g. [[apple|]].
function updateLinkText(link: HTMLAnchorElement) {
  const text = link.innerText;
  const href = link.getAttr("href");

  // Check for missing alias.
  if (!text) {
    const finalParen = /\s\(.*\)$/;
    const finalComma = /,.*$/;

    const hasFinalParenthesis = new RegExp(finalParen).test(href);

    // Suppress final parenthesis if it exists, otherwise suppress final part
    // beginning with a comma.
    link.innerText = hasFinalParenthesis
      ? href.replace(finalParen, "")
      : href.replace(finalComma, "");

    blendSuffix(link);
  }
}

// blendSuffix moves any non-punctuation text that immediately follows the link
// and adds it to the link text.
function blendSuffix(link: HTMLElement) {
  const sibling = link.nextSibling;

  if (sibling.nodeType !== Node.TEXT_NODE) {
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
