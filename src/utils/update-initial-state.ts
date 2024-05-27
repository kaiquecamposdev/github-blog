export function updateInitialState(
  path: string,
  emptyState?: object[] | object,
) {
  const initialStateInJSON = localStorage?.getItem(path)

  if (!initialStateInJSON) {
    return emptyState
  }

  const initialState = JSON.parse(initialStateInJSON)

  return initialState
}
