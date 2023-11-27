import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import authorsPageInitialPaths890c8Resource from '../../resources/authors-page-initial-paths-890c8'
import authorsPageInitialProps6f3d7Resource from '../../resources/authors-page-initial-props-6f3d7'

const Authors = (props) => {
  return (
    <>
      <div className="authors-container">
        <Head>
          <title>Authors - Human Web Assistant</title>
          <meta property="og:title" content="Authors - Human Web Assistant" />
        </Head>
        <DataProvider
          renderSuccess={(AuthorsEntity) => (
            <>
              <div className="authors-container1">
                <h1>{AuthorsEntity?.Name}</h1>
                <span>{AuthorsEntity?.Linkedin}</span>
                <span>{AuthorsEntity?.Twitter}</span>
              </div>
            </>
          )}
          initialData={props.authorsEntity}
          persistDataDuringLoading={true}
          key={props?.authorsEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .authors-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .authors-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Authors.defaultProps = {
  authorsEntity: [],
}

Authors.propTypes = {
  authorsEntity: PropTypes.array,
}

export default Authors

export async function getStaticPaths() {
  try {
    const response = await authorsPageInitialPaths890c8Resource({})
    return {
      paths: (response?.data || []).map((item) => {
        return {
          params: {
            id: (item?.id).toString(),
          },
        }
      }),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await authorsPageInitialProps6f3d7Resource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        authorsEntity: response?.data?.[0],
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
