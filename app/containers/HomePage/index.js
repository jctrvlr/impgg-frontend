/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import { Helmet } from 'react-helmet';

import Header from '../../components/Header/index';

export default function HomePage() {
  return (
    <div>
      <Helmet>
        <title>ImpGG - Mischievously Short</title>
        <meta name="description" content="Description of PricingPage" />
      </Helmet>
      <Header />
    </div>
  );
}
