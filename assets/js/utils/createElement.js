function createElement(tagName, options, ...children) {
  const { classNames = [], attributes = {}, listeners = {} } = options;
  const elem = document.createElement(tagName);

  for (let i = 0; i < classNames.length; i++) {
    elem.classList.add(classNames[i]);
  }

  for (const attributePair of Object.entries(attributes)) {
    const [attributeKey, attributeValue] = attributePair;
    elem.setAttribute(attributeKey, attributeValue);
  }

  for (const listener of Object.entries(listeners)) {
    const [event, handler] = listener;
    elem.addEventListener(event, handler);
  }

  elem.append(...children);

  return elem;
}
// examples

// input: createElement('img', {classNames: ['class-1', 'new-class']});
// output: <img class="class-1 new-class">

// input:
//createElement('img', {classNames: ['class-1', 'new-class'], attributes: {src: 'http://test.com', alt: 'test img'}});
// output: <img class="class-1 new-class" src="http://test.com" alt="test img">