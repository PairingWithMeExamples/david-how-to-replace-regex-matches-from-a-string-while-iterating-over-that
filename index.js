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
    const hashtag = match[2];
    const start = match.index;
    const end = start + textMatch.length;
    hashtags.push({ text: textMatch, hashtag, start, end });
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
    const replacement = `[${match.text}](https://twitter.com/hashtag/${match.hashtag})`;
    finalText = finalText.substring(0, match.start + offset) + replacement + finalText.substring(match.end + offset);
    offset += replacement.length - match.text.length;
  });

  return finalText;
}

module.exports = { replaceHashtagsToMarkdownLinks };
