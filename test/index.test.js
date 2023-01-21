const { replaceHashtagsToMarkdownLinks } = require("..");

describe("replace hashtags from text to markdown links", function () {
  describe("given a text with hashtags", () => {
    let replacedText;

    beforeEach(() => {
      const text =
        "How to #replace #regex matches from a #string while #iterating over that. #regexlife, #replacestring, #example";
      replacedText = replaceHashtagsToMarkdownLinks(text);
    });

    test("should replace hashtags to markdown links", function () {
      expect(replacedText).toBe(
        "How to [#replace](https://twitter.com/hashtag/replace) [#regex](https://twitter.com/hashtag/regex) matches from a [#string](https://twitter.com/hashtag/string) while [#iterating](https://twitter.com/hashtag/iterating) over that. [#regexlife](https://twitter.com/hashtag/regexlife), [#replacestring](https://twitter.com/hashtag/replacestring), [#example](https://twitter.com/hashtag/example)"
      );
    });
  });
});
