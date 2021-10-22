import { Retry } from 'components/Retry/Retry';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MainTemplate } from 'templates/MainTemplate';
import { Header } from '../Header/Header';
import { settingSelector } from '../selectors';
import { useGetDefaultSetting, useGetMenuWordpress } from './actions/actionSetting';
import { MainContent } from './components/MainContent/MainContent';
import { ModalRating } from './components/ModalRating/ModalRating';
import { ModalSaveComplete } from './components/ModalSaveComplete/ModalSaveComplete';
import { SettingSidebar } from './components/SettingSidebar/SettingSidebar';

const Modals = () => {
  return (
    <>
      <ModalSaveComplete />
      <ModalRating />
    </>
  );
};

export const SettingPage: FC = () => {
  const getDefaultSetting = useGetDefaultSetting();
  const getWordpressMenu = useGetMenuWordpress();

  const { statusRequest, statusMenuWP } = useSelector(settingSelector);

  useEffect(() => {
    if (statusRequest !== 'success') getDefaultSetting.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusMenuWP !== 'success') getWordpressMenu.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (statusRequest === 'failure') {
    return <Retry onClick={() => getDefaultSetting.request(undefined)} />;
  }

  return <MainTemplate Header={Header} Sidebar={SettingSidebar} Content={MainContent} Modals={Modals} />;
};
