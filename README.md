# Pipe tricks for Obsidian

[![Build Obsidian plugin](https://github.com/marcusolsson/obsidian-pipe-tricks/actions/workflows/release.yml/badge.svg)](https://github.com/marcusolsson/obsidian-pipe-tricks/actions/workflows/release.yml)
[![Buy me a coffee](https://img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/marcusolsson)

An Obsidian plugin that adds [pipe tricks](https://en.wikipedia.org/wiki/Help:Pipe_trick) to the Wikilink format used by Obsidian.

From Wikipedia:

> The **pipe trick** uses the [pipe character](https://en.wikipedia.org/wiki/Pipe_character "Pipe character") ("`|`") to save typing the label of a [piped link](https://en.wikipedia.org/wiki/Help:Piped_link "Help:Piped link") for several kinds of [wiki links](https://en.wikipedia.org/wiki/Wikilink "Wikilink"). This can avoid potentially making an error while typing the label.
>
> When the last character of a link is the pipe character, the pipe trick will automatically generate the text that displays for that link. Its processing removes the parenthesized part of the link title, handles commas in the title, and removes namespace prefixes. The described processing happens at the point of saving the page data, and the generated text is saved with the rest of the page's wiki markup – thus, it is merely an aid to editing.
>
> An even better way to save keystrokes that doesn't need any additional characters is by simply attaching text to the link, as in `[[train]]s`.

## Known limitations

- The plugin doesn't remove namespace prefixes. Mostly because I haven't seen the need for it yet. Let me know if you'd find it useful.

## Examples from Wikipedia

These examples are also used as test cases:

- [[Pipe (computing)|]] -> [[Pipe (computing)|Pipe]]
- [[Phoenix, Arizona|]] -> [[Phoenix, Arizona|Phoenix]]
- [[pipe (computing)|]]s -> [[pipe (computing)|pipes]]
- [[pipe (computing)|]]mill -> [[pipe (computing)|pipemill]]
- [[Yours, Mine and Ours (1968 film)|]] -> [[Yours, Mine and Ours (1968 film)|Yours, Mine and Ours]]
- [[Il Buono, il Brutto, il Cattivo|]] -> [[Il Buono, il Brutto, il Cattivo|Il Buono]]
- [[pipe (computing)|]]! -> [[pipe (computing)|pipe]]!

## Pipe functions

You can also transform link text using __pipe functions__.


Your links must still end in `|`, but an additional `|` before that transforms your text using built-in pipe functions.


For example: `[[Brewster Angle|_|]]s` ⟶ `[[brewster angles]]`

These can also be chained (current this is not very useful...): `[[Brewster Angle|_|^|swap|]]s`

The symbols and strings in between the pipes are the pipe function names.

List of built-in pipe functions:

- `lower`: _Hello World_ ⟶ _hello world_
- `_`: alias for `lower`
- `upperFirst`: _hello world_ ⟶ _Hello world_
- `upper_first`: alias for `upperFirst`
- `upperfirst`: alias for `upperFirst`
- `^`: alias for `upperFirst`
- `capital`: _hello of world_ ⟶ _Hello Of World_
- `^^`: alias for `capital`
- `upper`: _hello world_ ⟶ _HELLO WORLD_
- `^^^`: alias for `upper`
- `title`: _hello of world_ ⟶ _Hello of World_
- `#`: alias for `title`
