# Sorting without Articles

The main point of this project is to get some practice sorting a list of names
in JavaScript. What makes this a little more interesting is that the list
contains names of music bands, and we want to respect the convention that, just
as with titles of books, if a name begins with an article (’a’, ’an’ or ’the’ in
English), we disregard the article when sorting the item. For example, a band
named ’The Grateful Dead’ should be filed under ’G’ for ’Grateful’ and not ’T’
for ’The’.

The key doing to this kind of special sort is providing our own custom compare
function when we call the Array.prototype.sort() function.

```javascript
const sortedBands = bands.sort(ourCompareFn);
```

Basically, we want a compare function that compares names, disregarding the first 
word if it is an article. We can do this quite simply by using a helper function 
sortName(name) that transforms a given name to the string under which it should be 
sorted—in this case, by stripping off the leading word if it is an article, and 
converting the entire string to upper case so that we do not run 

```javascript
const sortedBands = [...bands].sort((a, b) => sortName(a) > sortName(b) ? 1 : -1);
```

Note that this expression does not mutate the `bands` variable,. The sort() method 
of the Array in JavaScript sorts the array in place.

rather we use the spread operator to make a copy of `bands` and then call sort on 
the copy, which will modify the copy but not the original.

## Stripping off a Leading Article

When I wrote my first version of this function, before watching Wes’s video to see 
how he had done it, I decided to split the band name into its list of words, and 
then drop any initial words from this list if they were members of a special list 
of articles which I had created.

I have been doing a fair amount of functional programming in Haskell over the past 
year, and this no doubt influenced my thinking here. This is certainly how someone 
writing this solution in Haskell would proceed. I was actually fairly pleased with 
the solution I came up with, that is until I saw Wes Bos’s solution using regular 
expressions, which turned sortName(name) into a one-liner!

```javascript
function sortName(name) {
  return name.replace(/^(a\b|an\b|the\b)/i, '').trim().toUpperCase();
};
```

  document.querySelector('#bands').innerHTML =
    sortedBands.map(band => `<li>${band}</li>`)
               .join('');


## Notes

* An element on the page can be made editable by the viewer within the browser by
