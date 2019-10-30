import React from "react";

const TitleContext = React.createContext((title: string) => {
  if (document) {
    document.title = title;
  }
});

const useTitle = (title: string): void => {
  return React.useContext(TitleContext)(title);
};

type TitleProps = {
  title: string;
  children?: React.ReactNodeArray;
};

const Title = ({ title, children }: TitleProps): React.ReactElement => {
  useTitle(title);
  return <>{children}</>;
};

export default Title;
export { Title, TitleContext, useTitle };
