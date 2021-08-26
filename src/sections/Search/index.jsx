/**
 *
 * MIT License
 *
 * Copyright 2021 Shogun, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import * as React from 'react'
import { useRouter } from 'frontend-router'
import { useSearch } from 'frontend-ui'
import Flex from 'Components/Flex'
import ProductGrid from 'Components/ProductGrid'
import SearchQueryInput from 'Components/SearchQueryInput'
import Divider from 'Components/Divider'
import Container from 'Components/Container'
import Button from 'Components/Button'
import Text from 'Components/Text'

const HITS_PER_PAGE = process.env.NODE_ENV === 'development' ? 3 : 10

/**
 * @typedef { import("lib/types").ShopifyProduct } ShopifyProduct
 */
const Search = () => {
  const router = useRouter()
  /** @type { { q?: string } } */
  const { q: searchQuery } = router.query

  const {
    status,
    statuses: { ERRORED, LOADING, PRISTINE, FETCHING_MORE },
    errorMessage,
    hits,
    search,
    fetchMore,
    pagination: { page, totalPages },
  } = useSearch({
    hitsPerPage: HITS_PER_PAGE,
  })

  React.useEffect(() => {
    if (!searchQuery) return

    search(searchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  return (
    <Container p={{ base: 2, md: 8 }}>
      <Flex align="center" justify="center" my={10}>
        <Container flexBasis={{ base: '90vw', md: 'md' }}>
          <SearchQueryInput
            initialValue={searchQuery}
            disabled={status === LOADING || status === FETCHING_MORE}
            onSearchSubmit={q => router.push(`/search?q=${q}`)}
          />
        </Container>
      </Flex>

      <Divider />

      <Container my={10}>
        {hits.length === 0 && status === PRISTINE && <Text>Start searching to see results</Text>}

        {hits.length === 0 && status !== PRISTINE && status !== LOADING && (
          <Text>No results found for {searchQuery}</Text>
        )}

        {hits.length === 0 && status === LOADING && <Text>Loading</Text>}

        {status === ERRORED && <Text>Error {errorMessage}</Text>}

        {hits.length > 0 && (
          <React.Fragment>
            <ProductGrid
              collection={{
                name: 'Search results',
                slug: 'search-results',
                description: '',
                image: undefined,
                products: /** @type { ShopifyProduct[] } */ (/** @type {unknown} */ (hits)),
              }}
            />

            {totalPages > page + 1 && (
              <Container textAlign="center" my={10}>
                <Button onClick={() => fetchMore()}>
                  {status === FETCHING_MORE ? '...' : 'Load more'}
                </Button>
              </Container>
            )}
          </React.Fragment>
        )}
      </Container>
    </Container>
  )
}

export default Search
