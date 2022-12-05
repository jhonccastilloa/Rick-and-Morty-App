import "./styles/errorFetch.css";

interface ErrorFetchProps {
  errorReload: () => void;
}
const ErrorFetch = ({ errorReload }: ErrorFetchProps) => {
  return (
    <div className="error container">
      <h2 className="error__title">! Error when querying the location ¡</h2>
      <h3 className="error__subtitle">
        Make sure you have spelled the location correctly
      </h3>
      <button onClick={errorReload} className="error__button">
        RELOAD
      </button>
    </div>
  );
};

export default ErrorFetch;
