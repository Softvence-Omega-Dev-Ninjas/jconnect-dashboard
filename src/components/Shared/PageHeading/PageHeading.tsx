interface PageHeadingProps {
  title: string;
  subtitle?: string;
}

const PageHeading = ({ title, subtitle }: PageHeadingProps) => {
  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-gray-500 text-xs md:text-sm mt-1">{subtitle}</p>
      )}
    </>
  );
};

export default PageHeading;
