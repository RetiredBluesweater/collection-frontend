import React, { PureComponent } from 'react';

import vkBridge, { VKBridgeSubscribeHandler } from '@vkontakte/vk-bridge';

import { Store } from 'redux';
import { Provider as StoreProvider, ReactReduxContext } from 'react-redux';
import { createReduxStore, ReduxState } from '../../redux';

import { VKStorageProvider } from '../VKStorageProvider';
import ConfigProvider from '../tools/ConfigProvider';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '../ThemeProvider';
import { RouterProvider } from '../../RouterProvider';
import { GlobalStyleSheet } from '../tools/GlobalStyleSheet';
import { StatusBar } from '../tools/StatusBar';

import { AppLoadingView } from '../views/AppLoadingView';
import AppCrashView from '../views/AppCrashView';
import App from '../App';
import { ServicePanel } from '../tools/ServicePanel';

import { Config } from '../../config';
import { getStorageKeys, getLaunchParams } from '../../utils';
import { AppRootState } from './types';
import { StorageFieldEnum, StorageValuesMap, OS, Insets, RegisterMutation, registerMutation } from '../../types';

import { appConfigActions } from '../../redux/reducers/appConfig';
import { deviceActions } from '../../redux/reducers/device';
import { OverlayProvider } from '../overridedVkUi';
import ApolloClient from 'apollo-client';
import { createApolloClient } from '../ApolloProvider';
import {
  CollectionsWithUncollectedBookmarksQuery,
  collectionsWithUncollectedBookmarksQuery,
} from 'src/types/gql/collectionsWithUncollectedBookmarksQuery';

// Assign human-readable store provider name for debugging purposes
ReactReduxContext.displayName = 'AppRoot';

interface Props {
  /**
   * Environments-based config
   */
  config: Config;
  /**
   * Device operating system
   */
  os: OS;
  /**
   * Application launch parameters
   */
  launchParams: string;
  /**
   * Device insets
   */
  insets: Insets;
}

/**
 * Root application component. Everything application requires for showing
 * first screen is being loaded here
 */
export class AppRoot extends PureComponent<Props, AppRootState> {
  /**
   * ApolloClient used to send requests and create WebSocket connections
   * @type {ApolloClient<any>}
   */
  private readonly apolloClient: ApolloClient<any>;

  /**
   * Application root context
   * @type {{init: () => Promise<void>}}
   */
  /*   private appRootContext: AppRootContext = { init: this.init.bind(this) }; */

  /**
   * Redux store
   * @type {Store<ReduxState>}
   */
  private store: Store<ReduxState>;

  private readonly vkGroupId: number | null;

  public constructor(props: Readonly<Props>) {
    super(props);

    const { os, launchParams, insets, config } = props;

    const lauchParamsObject = getLaunchParams(launchParams);

    this.vkGroupId = lauchParamsObject.groupId;

    // Create initial redux store
    this.store = createReduxStore({
      config,
      device: {
        insets,
        currentInsets: insets,
        os,
        currentStatusBarMode: 'default',
        customStatusBarStyle: { color: '#fff', style: 'dark' },
      },
      launchParams: lauchParamsObject,
    });
    // Create Apollo client
    this.apolloClient = createApolloClient({ httpURI: config.gqlHttpUrl, launchParams });

    // Binding
    this.init = this.init.bind(this);
  }
  /* private client = createApolloClient(config.gqlHttpUrl, this.launchParamsStr); */

  public state: AppRootState = {
    loading: true,
  };

  public async componentDidMount() {
    // When component did mount, we are waiting for application
    // config from bridge and add event listener

    vkBridge.subscribe(this.onVKBridgeEvent);

    vkBridge.send('VKWebAppInit');
    // Init application
    await this.init();
  }

  public componentDidCatch(error: Error) {
    // Catch error if it did not happen before
    this.setState({ error: error.message });
  }

  public componentWillUnmount() {
    // When component unloads, remove all event listeners
    vkBridge.unsubscribe(this.onVKBridgeEvent);
  }

  public render() {
    const { loading, error, storage } = this.state;
    const { store } = this;

    if (loading || !storage || error) {
      return (
        <StoreProvider store={store}>
          <VKStorageProvider storage={storage}>
            <ConfigProvider>
              <ThemeProvider>
                <GlobalStyleSheet />
                {error ? <AppCrashView onRestartClick={this.init} error={error} /> : <AppLoadingView />}
              </ThemeProvider>
            </ConfigProvider>
          </VKStorageProvider>
        </StoreProvider>
      );
    }

    return (
      <StoreProvider store={store}>
        <VKStorageProvider storage={storage}>
          <ConfigProvider>
            <OverlayProvider>
              <ApolloProvider client={this.apolloClient}>
                <ThemeProvider>
                  <StatusBar />
                  <GlobalStyleSheet />
                  <RouterProvider>
                    <App />
                  </RouterProvider>
                  <ServicePanel onRestart={this.init} />
                </ThemeProvider>
              </ApolloProvider>
            </OverlayProvider>
          </ConfigProvider>
        </VKStorageProvider>
      </StoreProvider>
    );
  }

  /**
   * Checks if event is VKWebAppUpdateConfig to know
   * application config sent from bridge
   */
  private onVKBridgeEvent: VKBridgeSubscribeHandler = (event) => {
    if (event.detail && event.detail.type === 'VKWebAppUpdateConfig') {
      const config = event.detail.data;

      this.store.dispatch(appConfigActions.updateConfig(config));

      // Update current insets
      if ('insets' in config) {
        this.store.dispatch(deviceActions.setCurrentInsets(config.insets));
      }
    }
  };

  /**
   * Initializes application
   */
  private async init() {
    this.setState({ loading: true, error: null });

    try {
      // Performing all async operations and getting data to launch application
      const [storage, vkUser, register, collections] = await Promise.all([
        getStorageKeys<StorageValuesMap>(...Object.values(StorageFieldEnum)),
        vkBridge.send('VKWebAppGetUserInfo'),
        this.apolloClient.mutate<RegisterMutation, RegisterMutation.Arguments>({ mutation: registerMutation }),
        this.apolloClient.query<
          CollectionsWithUncollectedBookmarksQuery,
          CollectionsWithUncollectedBookmarksQuery.Arguments
        >({ query: collectionsWithUncollectedBookmarksQuery }),
      ]);

      // Create history depending on initial data
      this.store = createReduxStore({
        ...this.store.getState(),
        vkUser,
        collections: { collections: collections.data.collections, uncollected: collections.data.uncollectedBookmarks },
      });

      // this.setState({loading: false, storage: {}, history});
      this.setState({ loading: false, storage });
    } catch (e) {
      // In case error appears, catch it and display
      this.setState({ error: e.message, loading: false });
    }
  }
}
