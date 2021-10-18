import { FAQsPage } from 'containers/FAQsPage/FAQsPage';
import { InitializationPage } from 'containers/InitializationPage';
import { pmAjax } from 'containers/InitializationPage/postmessage';
import { initializationSelector, validationSelector } from 'containers/selectors';
import { SettingPage } from 'containers/SettingPage/SettingPage';
import { useTidioChat } from 'hooks/useTidioChat';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/faqs',
    exact: true,
    component: FAQsPage,
  },
  {
    path: '/',
    component: SettingPage,
  },
];

export const Routes = () => {
  const { confirmInitialized, tidioId } = useSelector(initializationSelector);
  const { initTidioChat } = useTidioChat();
  const { hasPassed } = useSelector(validationSelector);

  useEffect(() => {
    if (tidioId) {
      initTidioChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tidioId]);

  useEffect(() => {
    if (hasPassed) {
      pmAjax.emit('@HasPassed', { hasPassed: hasPassed });
    }
  }, [hasPassed]);

  const _renderRoute = () => {
    if (!confirmInitialized) return <InitializationPage />;
    return (
      <>
        <Switch>
          {pages.map(({ component, path, exact }) => {
            return <Route key={path} component={component} exact={exact} path={path} />;
          })}
        </Switch>
      </>
    );
  };

  return <BrowserRouter>{_renderRoute()}</BrowserRouter>;
};
