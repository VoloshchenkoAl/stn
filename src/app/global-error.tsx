'use client';

import { FC, useEffect } from 'react';
import Error from 'next/error';
import * as Sentry from '@sentry/nextjs';

type Props = {
  error: Error & { digest?: string };
};

const GlobalError: FC<Props> = ({ error }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  );
};

export default GlobalError;
