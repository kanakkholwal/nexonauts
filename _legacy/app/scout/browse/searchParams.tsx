import { createLoader, parseAsIndex, parseAsString } from 'nuqs/server'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  query: parseAsString.withDefault(""),
  page: parseAsIndex.withDefault(1),
  pricing_type: parseAsString.withDefault("all"),
  category: parseAsString.withDefault("all"),
  offset: parseAsIndex.withDefault(0),
  view: parseAsString.withDefault("grid"),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)