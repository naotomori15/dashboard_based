import React from 'react';

import { Refine, AuthProvider } from '@pankod/refine-core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-mui';
import {
  AccountCircleOutlined,
  PeopleAltOutlined,
  Description,
  ShoppingCartCheckout,
  BurstMode,
  Gamepad,
} from '@mui/icons-material';
import dataProvider from '@pankod/refine-simple-rest';
import { MuiInferencer } from '@pankod/refine-inferencer/mui';
import routerProvider from '@pankod/refine-react-router-v6';
import axios, { AxiosRequestConfig } from 'axios';
import { ColorModeContextProvider } from 'contexts';
import { Title, Sider, Layout, Header } from 'components/layout';
import { CredentialResponse } from 'interfaces/google';
import { parseJwt } from 'utils/parse-jwt';
import {
  Login,
  Home,
  Agents,
  editProducts,
  productDetails,
  allProducts,
  createProducts,
  agentProfile,
  myProfile,
  allHero,
  createHero,
  editHero,
  allAbout,
  createAbout,
  editAbout,
  AboutDetails,
  HeroDetails,
  EditGambling,
  AllGambling,
  CreateGambling,
} from 'pages';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      // save user to mongoDB

      if (profileObj) {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/users`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }

      localStorage.setItem('token', `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem('token');

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem('token');

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(`${process.env.REACT_APP_API_URL}/api/v1`)}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: 'products',
              list: allProducts,
              show: productDetails,
              create: createProducts,
              edit: editProducts,
              icon: <ShoppingCartCheckout />,
            },
            {
              name: 'hero',
              list: allHero,
              show: HeroDetails,
              create: createHero,
              edit: editHero,
              icon: <BurstMode />,
            },
            {
              name: 'about',
              list: allAbout,
              show: AboutDetails,
              create: createAbout,
              edit: editAbout,
              icon: <Description />,
            },
            {
              name: 'gambling',
              list: AllGambling,
              create: CreateGambling,

              edit: EditGambling,

              icon: <Gamepad />,
            },
            {
              name: 'agents',
              list: Agents,
              show: agentProfile,
              icon: <PeopleAltOutlined />,
            },

            {
              name: 'my-profile',
              options: {
                label: 'My Profile',
              },
              icon: <AccountCircleOutlined />,
              list: myProfile,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
