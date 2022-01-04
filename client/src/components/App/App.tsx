import * as React from 'react';
import logo from '../../assets/images/logo.svg';
import useGetUrlList from '../../hooks/useGetUrlList';
import Form from '../url/UrlForm';
import List from '../url/UrlList';
import type { HookResponse } from '../../hooks/useGetUrlList';

function App() {
  const {
    data,
    addData,
    isLoading,
    error,
  }: HookResponse = useGetUrlList();

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="h1 text-headline">URL Shortener</h1>
      </header>
      <main className="main">
        <Form addData={addData} />
        <List data={data} error={error} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
