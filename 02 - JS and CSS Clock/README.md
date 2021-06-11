# JS & CSS Clock

In this, the second project of the JavaScript 30 Day Challenge, we use
plain vanilla javascript and CSS to implement a surprisingly nice analog
wall-style clock, complete with realistically-ticking second hand.

The main elements of this exercise are the CSS classes that create the clock
hands, and the javascript timer and function that, once every second, rotates
the hands to their proper positions for the current time, and makes our clock
behave like a real wall clock.

One particularly nice bit of polish that Wes Bos applies here is the use of a
CSS transition with a custom transition-timing-function to make the second hand
appear to "snap" forward with a little bounce-back at the end at each tick of
clock, just like a real physical hand would do.

## Lessons Learned

With a bit of creativity, the simple block of a lowly `<div>` can be made to appear like
the hand of a clock!

## Improvements

### Eliminating the need for a 90 degree rotational adjustment to the clock hands.

In his solution to this exercise, Wes Bos in his CSS styles the clock hands in such 
a way that they appear in a horizontal position, at the nine o'clock position of 
the clock face.

(diagram)

This necessitates adding a rotation of 90 degrees to the hands, so that they appear 
at the twelve o'clock position, before we apply the rotational transformation 
corresponding to the hours or minutes or seconds of the current time.

This necessity of a corrective factor of 90 degrees seemed a little odd to me.

After working on this project for a while, I realized that this 90 degree corrective 
factor is completely unnecessary, with a slight modification to the CSS styles
of the clock hands! Wes Bos's version of the clock hands results from making the 
<div> boxes very short and wide. Could we, I wondered, instead make them very
tall and wide, and thereby make them look like the vertical hands of a clock
pointing to the twelve o'clock position? As it turns out, yes we can!

Wes Bos's CSS styles:

```css
.hand {
  width: 50%;
  height: 6px;
  top: 50%;
  transform-origin: 100%;
  transform: rotate(90deg);
}
```

My CSS styles:

```css
.hand {
  left: 50%;
  background: black;
  position: absolute;
  transform-origin: bottom;    /* move rotation origin to bottom end of hands */
  transition: transform 0.05s ease;
}

.hour-hand {
  width: 8px;
  height: 33.3%;
  top: 16.7%;
}

.minute-hand {
  width: 6px;
  height: 48%;
  top: 2%;
}

.second-hand {
  width: 2px;
  height: 50%;
  transition-timing-function: cubic-bezier(0.0, 2.2, 0.06, 0.66);
}
```

With these changes, the hands now appear like so, before any javascript
transformation:

(diagram)

## Notes

The background photo of sand slipping through the fingers of a hand is by
[Kunj Parekh](https://unsplash.com/@kunjparekh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on [Unsplash](https://unsplash.com/@kunjparekh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
