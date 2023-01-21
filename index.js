const HASHTAG_REGEX = /(#(\w+))/g;

function replaceHashtagsToMarkdownLinks(text) {
  const hashtags = findHashtagsToReplace(text);
  return replaceHashtags(text, hashtags);
}

function findHashtagsToReplace(text) {
  const hashtags = [];

  const expr = new RegExp(HASHTAG_REGEX);
  let match;
  while ((match = expr.exec(text)) != null) {
    const textMatch = match[0];
    const start = match.index;
    const end = start + textMatch.length;
    const replacement = `[${textMatch}](https://twitter.com/hashtag/${match[2]})`;
    hashtags.push({ text: textMatch, start, end, replacement });
  }

  return hashtags;
}

function replaceHashtags(text, hashtags) {
  let finalText = text;
  let offset = 0;

  const matches = [...hashtags];

  matches.sort((a, b) => {
    return a.start - b.start;
  });

  matches.forEach(match => {
    finalText =
      finalText.substring(0, match.start + offset) + match.replacement + finalText.substring(match.end + offset);

    offset += match.replacement.length - match.text.length;
  });

  return finalText;
}

module.exports = { replaceHashtagsToMarkdownLinks };
