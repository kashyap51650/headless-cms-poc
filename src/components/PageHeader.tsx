const PageHeader: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
      {description && <p className="text-slate-600">{description}</p>}
    </div>
  );
};

export default PageHeader;
