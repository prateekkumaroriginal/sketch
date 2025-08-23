const PublicLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full w-full dark:bg-[#1F1F1F]">
      <div className="flex-1 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default PublicLayout;