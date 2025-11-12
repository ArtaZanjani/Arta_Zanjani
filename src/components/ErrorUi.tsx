type ErrorUiPropsType = {
  title: string;
  error: string;
};

const ErrorUi = ({ title, error }: ErrorUiPropsType) => {
  return (
    <div className="mt-7">
      <h2 className="text-2xl">{title}</h2>
      <p className="max-w-xs mt-1 text-gray-500 dark:text-gray-400">{error}</p>
    </div>
  );
};

export default ErrorUi;
