const Title = ({
  size,
  children,
}: {
  size: number;
  children: React.ReactNode;
}) => {
  const size_classes = [
    `text-${size + 0}xl`,
    ` sm:text-${size + 1}xl`,
    ` md:text-${size + 2}xl`,
    ` lg:text-${size + 3}xl`,
  ];
  return (
    <h1 className={`font-semibold text-primary-300 ${size_classes.join(" ")}`}>
      {children}
    </h1>
  );
};

export default Title;
