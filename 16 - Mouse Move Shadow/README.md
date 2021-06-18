# Mouse Move Shadow

This day's project focuses on creating an interesting effect in which the shadow
of the text of a header appears to strecth and follow the mouse as it is moved
around the page.

## Handling Mouse Events

In a mouse event handler, `event.target` refers to the element under the mouse when 
the event triggered, which may be a child of the element that is listening for these
events, whereas `this` refers to the object that was listening for the events.

### Quirks of coordinates in mouse events

The offsetX and offsetY properties of the event object display some interesting
behavior. As the mouse is moved over the hero at the top of the page, the
offsetX and offsetY properties of the event object are the x and y coordinates
from the top left of the hero object, which as we have set it up is also the top
left of the browser window. However, as the mouse passes over the <H1> element
within the hero, the offsetX and offsetY coordinates change frame of reference,
so that the 0, 0 origin is now the top left corner of the H1 element, not the
hero. This results in a discontinuous jump in the X coordinate, in which it is
increasing as the mouse moves left to right across the page, but then jumps back
to 0 when it crosses the left edge of the H1 element. A similar effect happens
to the Y coordinate.

In this case, we would prefer a nice continuous increase in the X coordinate
from left to right across the page, with no discontinuous jumps, and the same
for the Y coordinate. In order to achieve this, we need to normalize the
coordinates, by checking whether the current mouse location is within the bounds
of the H1 element, and if they are, then adjust them by adding the X coordinate
of the left edge of the H1 to the X coordinate and the Y offset of the top of
the H1 to the Y coordinate.

    ```javascript
    if (this !== e.target) {
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
    }
    ```

## Notes

* An element on the page can be made editable by the viewer within the browser by
  adding the `contenteditable` attribute to it, right in the HTML tag.

    ```html
    <h1 contenteditable>🔥WOAH!</h1>
    ```
