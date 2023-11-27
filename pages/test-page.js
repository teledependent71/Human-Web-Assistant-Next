import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Human Web Assistant</title>
          <meta property="og:title" content="test-page - Human Web Assistant" />
        </Head>
        <DataProvider
          renderSuccess={(context_etcnr) => (
            <>
              <h1>{context_etcnr?.Name}</h1>
            </>
          )}
          initialData={props.contextEtcnrProp}
          persistDataDuringLoading={true}
          key={props?.contextEtcnrProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextEtcnrProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextEtcnrProp: contextEtcnrProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
