const PageHeader: React.FC<{
  title: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ title, description, children = null }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            {title}
          </h1>
          <p className="text-slate-600">{description}</p>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
