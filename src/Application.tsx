import ApplicationBasic from './core/applicationBasic';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';
import { AutoWired } from '@/core/decorator/autoWired';
import { RepositoryService } from '@/service/repositoryService';

export default class Application extends ApplicationBasic {
  @AutoWired(RepositoryService)
  repositoryService!: RepositoryService;

  /**
   * 底层能力全部显示处理
   */

  init() {
    this.mountView();
  }

  mountView() {
    ReactDOM.render(<App />, document.getElementById('app'));
  }

  dispose() {}
}
