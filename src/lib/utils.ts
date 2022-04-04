/* eslint-disable prefer-rest-params */
export function ColorPrint(): void {
  const findProp = (propName) => {
    for (const div of eval("document").querySelectorAll("div")) {
      const propKey = Object.keys(div)[1];
      if (!propKey) continue;
      const props = div[propKey];
      if (props.children?.props && props.children.props[propName])
        return props.children.props[propName];
      if (props.children instanceof Array)
        for (const child of props.children)
          if (child?.props && child.props[propName])
            return child.props[propName];
    }
  };
  const term = findProp("terminal");
  const out = [];
  for (let i = 0; i < arguments.length; i += 2) {
    out.push(
      React.createElement(
        "span",
        { style: { color: `${arguments[i]}` } },
        arguments[i + 1]
      )
    );
  }
  try {
    term.printRaw(out);
  } catch {
      null
  }
}
