import React from "react";

interface DocumentProps {
  title?: string;
  headElements: React.ReactNodeArray;
  children?: string;
}

const Document = ({ title = "CDEA", headElements, children }: DocumentProps): React.ReactElement => (
  <html>
    <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {headElements}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={children ? { __html: children } : undefined} />
    </body>
  </html>
);
export default Document;
