import { Helmet } from 'react-helmet-async';
import { useNavigate, useRouteError } from 'react-router-dom';

import { Button } from '@/components/CustomButton';

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  const renderNotFound = () => {
    return (
      <>
        <Helmet>
          <title>404 - Page Not Found</title>
        </Helmet>
        <div className="space-y-2">
          <h2>404</h2>
          <p>Page Not Found</p>
        </div>
        <Button
          className="mx-auto"
          onClick={() => navigate('/', { replace: true })}
        >
          Go back home
        </Button>
      </>
    );
  };

  const renderError = () => {
    return (
      <>
        <Helmet>
          <title>Something went wrong</title>
        </Helmet>
        <div className="space-y-2">
          <h2>Something went wrong!</h2>
          <p>Please try again later or refresh the page.</p>
        </div>
        <Button className="mx-auto" onClick={() => navigate(0)}>
          Refresh
        </Button>
      </>
    );
  };

  return (
    <div className="container grid min-h-dvh place-content-center gap-6 py-12 text-center">
      {error && error.status === 404 ? renderNotFound() : renderError()}
    </div>
  );
}
