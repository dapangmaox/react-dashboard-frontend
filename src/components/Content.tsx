type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return <div className="p-4">{children}</div>;
};

export default Content;
